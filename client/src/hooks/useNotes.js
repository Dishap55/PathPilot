import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { notesService } from '../services/notesService';

/**
 * Custom hook to interact with personal student notes for a given context
 */
export function useNotes({ subject, topicId, questionId } = {}) {
  const { user } = useAuth();
  const userId = user?.id || 'guest';

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notesService.getNotes({
        subject,
        topicId,
        questionId,
        userId
      });
      setNotes(data || []);
    } catch (err) {
      console.warn('[useNotes] Error loading notes:', err);
      setError('Failed to load personal notes.');
    } finally {
      setLoading(false);
    }
  }, [subject, topicId, questionId, userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async ({
    content,
    section = 'Practice',
    questionId: qId = questionId,
    questionTitle = null,
    topicName = null
  }) => {
    try {
      const created = await notesService.createNote({
        subject,
        topicId,
        topicName,
        section,
        questionId: qId,
        questionTitle,
        content,
        userId
      });
      setNotes((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      throw err;
    }
  };

  const updateNote = async (noteId, content) => {
    try {
      const updated = await notesService.updateNote(noteId, {
        content,
        userId
      });
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, ...updated } : n))
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await notesService.deleteNote(noteId, { userId });
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      return true;
    } catch (err) {
      throw err;
    }
  };

  return {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    reloadNotes: fetchNotes
  };
}
