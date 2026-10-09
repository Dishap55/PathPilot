import { apiRequest } from './api';
import { supabase } from '../lib/supabaseClient';

const LOCAL_STORAGE_PREFIX = 'pathpilot_student_notes_';

function getStorageKey(userId) {
  return `${LOCAL_STORAGE_PREFIX}${userId || 'guest'}`;
}

function getLocalNotes(userId) {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalNotes(userId, notes) {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(notes));
  } catch (e) {
    console.warn('[notesService] Local storage save failed:', e);
  }
}

export const notesService = {
  /**
   * Fetch notes for current student, optionally filtered by subject, topicId, or questionId
   */
  getNotes: async ({ subject, topicId, questionId, userId } = {}) => {
    // 1. Try API first
    try {
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (topicId) params.append('topicId', topicId);
      if (questionId) params.append('questionId', questionId);

      const headers = userId ? { 'x-student-id': userId } : {};
      const response = await apiRequest(`/notes${qs}`, { headers });

      if (response && response.success && Array.isArray(response.data)) {
        // Sync local cache for resilience
        const currentLocal = getLocalNotes(userId);
        // Merge or replace
        const noteMap = new Map();
        response.data.forEach((n) => noteMap.set(n.id, n));
        currentLocal.forEach((n) => {
          if (!noteMap.has(n.id) && (!topicId || n.topic_id === topicId)) {
            noteMap.set(n.id, n);
          }
        });
        const merged = Array.from(noteMap.values()).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        saveLocalNotes(userId, merged);
        return response.data;
      }
    } catch (err) {
      console.warn('[notesService] API getNotes request failed, falling back to local store:', err.message);
    }

    // 2. Fallback to user-scoped local storage
    const local = getLocalNotes(userId);
    return local.filter((note) => {
      if (subject && note.subject?.toLowerCase() !== subject.toLowerCase()) return false;
      if (topicId && note.topic_id !== topicId) return false;
      if (questionId && note.question_id !== questionId) return false;
      return true;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  /**
   * Create a new student personal note
   */
  createNote: async ({
    subject,
    topicId,
    topicName,
    section = 'Practice',
    questionId = null,
    questionTitle = null,
    content,
    userId
  }) => {
    const trimmed = (content || '').trim();
    if (!trimmed) {
      throw new Error('Note text cannot be empty.');
    }

    const payload = {
      subject,
      topicId,
      topicName,
      section,
      questionId,
      questionTitle,
      content: trimmed
    };

    let createdNote = null;

    // 1. Try API first
    try {
      const response = await apiRequest('/notes', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: userId ? { 'x-student-id': userId } : {}
      });
      if (response && response.success && response.data) {
        createdNote = response.data;
      }
    } catch (err) {
      console.warn('[notesService] API createNote failed, persisting locally:', err.message);
    }

    // 2. If API didn't return (e.g. offline/network), synthesize local note
    if (!createdNote) {
      createdNote = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
        student_id: userId || 'local_user',
        subject: subject || 'DSA',
        topic_id: topicId,
        topic_name: topicName || topicId,
        section: section || 'Practice',
        question_id: questionId || null,
        question_title: questionTitle || null,
        content: trimmed,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    // 3. Update local cache
    const current = getLocalNotes(userId);
    const updated = [createdNote, ...current.filter((n) => n.id !== createdNote.id)];
    saveLocalNotes(userId, updated);

    return createdNote;
  },

  /**
   * Update an existing student note
   */
  updateNote: async (noteId, { content, userId }) => {
    const trimmed = (content || '').trim();
    if (!trimmed) {
      throw new Error('Note text cannot be empty.');
    }

    let updatedNote = null;

    try {
      const response = await apiRequest(`/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({ content: trimmed }),
        headers: userId ? { 'x-student-id': userId } : {}
      });
      if (response && response.success && response.data) {
        updatedNote = response.data;
      }
    } catch (err) {
      console.warn('[notesService] API updateNote failed, updating locally:', err.message);
    }

    // Update local cache
    const current = getLocalNotes(userId);
    const updatedList = current.map((n) => {
      if (n.id === noteId) {
        const u = {
          ...n,
          content: trimmed,
          updated_at: new Date().toISOString()
        };
        if (!updatedNote) updatedNote = u;
        return u;
      }
      return n;
    });
    saveLocalNotes(userId, updatedList);

    return updatedNote;
  },

  /**
   * Delete a student note
   */
  deleteNote: async (noteId, { userId } = {}) => {
    try {
      await apiRequest(`/notes/${noteId}`, {
        method: 'DELETE',
        headers: userId ? { 'x-student-id': userId } : {}
      });
    } catch (err) {
      console.warn('[notesService] API deleteNote failed, removing locally:', err.message);
    }

    // Remove from local cache
    const current = getLocalNotes(userId);
    const updatedList = current.filter((n) => n.id !== noteId);
    saveLocalNotes(userId, updatedList);

    return { success: true, id: noteId };
  }
};
