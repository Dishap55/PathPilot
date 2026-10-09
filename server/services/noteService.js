const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { supabase } = require('../config/supabase');
const logger = require('../config/logger');

// Local persistent fallback file path to ensure persistence across restarts even before cloud migrations
const DATA_DIR = path.resolve(__dirname, '../../.data');
const DATA_FILE = path.join(DATA_DIR, 'student_notes_store.json');

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({}), 'utf8');
    }
  } catch (err) {
    logger.warn('[noteService] Could not initialize fallback data file:', err.message);
  }
}

function loadLocalNotes() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}

function saveLocalNotes(store) {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    logger.warn('[noteService] Failed to persist notes to fallback storage:', err.message);
  }
}

function generateId() {
  try {
    const crypto = require('crypto');
    return crypto.randomUUID();
  } catch (e) {
    return 'sn_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }
}

class NoteService {
  /**
   * Retrieve student notes scoped strictly to studentId and optional filters
   */
  async getNotes({ studentId, subject, topicId, questionId }) {
    if (!studentId) {
      return [];
    }

    // 1. Attempt retrieval from Supabase first
    try {
      let query = supabase
        .from('student_notes')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (subject) {
        query = query.ilike('subject', subject);
      }
      if (topicId) {
        query = query.eq('topic_id', topicId);
      }
      if (questionId) {
        query = query.eq('question_id', questionId);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      // Supabase table may not be created in schema cache yet, continue to persistent storage
    }

    // 2. Persistent fallback scoped by studentId
    const store = loadLocalNotes();
    const studentNotes = store[studentId] || [];

    return studentNotes.filter((note) => {
      if (subject && note.subject?.toLowerCase() !== subject.toLowerCase()) {
        return false;
      }
      if (topicId && note.topic_id !== topicId) {
        return false;
      }
      if (questionId && note.question_id !== questionId) {
        return false;
      }
      return true;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  /**
   * Create a new personal student note
   */
  async createNote({
    studentId,
    subject,
    topicId,
    topicName,
    section = 'Practice',
    questionId = null,
    questionTitle = null,
    content
  }) {
    if (!studentId) {
      throw new Error('Authenticated student identity is required to save notes.');
    }

    const trimmed = (content || '').trim();
    if (!trimmed) {
      throw new Error('Note content must contain meaningful text.');
    }

    const now = new Date().toISOString();
    const newNote = {
      id: generateId(),
      student_id: studentId,
      subject: subject || 'DSA',
      topic_id: topicId || 'general',
      topic_name: topicName || topicId || 'General Topic',
      section: section || 'Practice',
      question_id: questionId || null,
      question_title: questionTitle || null,
      content: trimmed,
      created_at: now,
      updated_at: now
    };

    // 1. Try persisting to Supabase
    let supabaseSaved = false;
    try {
      const { data, error } = await supabase
        .from('student_notes')
        .insert(newNote)
        .select()
        .single();

      if (!error && data) {
        supabaseSaved = true;
        newNote.id = data.id;
      }
    } catch (e) {
      // Table might not exist yet
    }

    // 2. Always persist to student-scoped store
    const store = loadLocalNotes();
    if (!store[studentId]) {
      store[studentId] = [];
    }
    store[studentId].unshift(newNote);
    saveLocalNotes(store);

    return newNote;
  }

  /**
   * Update an existing student note with ownership verification
   */
  async updateNote({ noteId, studentId, content }) {
    if (!studentId || !noteId) {
      throw new Error('Student ID and Note ID are required.');
    }

    const trimmed = (content || '').trim();
    if (!trimmed) {
      throw new Error('Updated note content cannot be empty.');
    }

    const now = new Date().toISOString();

    // 1. Attempt Supabase update
    try {
      await supabase
        .from('student_notes')
        .update({ content: trimmed, updated_at: now })
        .eq('id', noteId)
        .eq('student_id', studentId);
    } catch (e) {
      // Table might not exist yet
    }

    // 2. Update persistent local store
    const store = loadLocalNotes();
    const userNotes = store[studentId] || [];
    const targetIdx = userNotes.findIndex((n) => n.id === noteId);

    if (targetIdx === -1) {
      // Note was not found in this student's notes
      const err = new Error('Note not found or you do not have permission to edit this note.');
      err.statusCode = 404;
      throw err;
    }

    userNotes[targetIdx].content = trimmed;
    userNotes[targetIdx].updated_at = now;
    store[studentId] = userNotes;
    saveLocalNotes(store);

    return userNotes[targetIdx];
  }

  /**
   * Delete a student note with ownership verification
   */
  async deleteNote({ noteId, studentId }) {
    if (!studentId || !noteId) {
      const err = new Error('Student ID and Note ID are required.');
      err.statusCode = 400;
      throw err;
    }

    // 1. Attempt Supabase delete
    try {
      await supabase
        .from('student_notes')
        .delete()
        .eq('id', noteId)
        .eq('student_id', studentId);
    } catch (e) {
      // Ignore if table not present
    }

    // 2. Delete from persistent local store
    const store = loadLocalNotes();
    const userNotes = store[studentId] || [];
    const filtered = userNotes.filter((n) => n.id !== noteId);

    if (filtered.length === userNotes.length) {
      const err = new Error('Note not found or you do not have permission to delete this note.');
      err.statusCode = 404;
      throw err;
    }

    store[studentId] = filtered;
    saveLocalNotes(store);

    return { success: true, id: noteId };
  }
}

module.exports = new NoteService();
