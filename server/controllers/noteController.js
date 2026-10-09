const noteService = require('../services/noteService');
const { sendSuccess, sendError } = require('../utils/response');

module.exports = {
  getNotes: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      const { subject, topicId, questionId } = req.query;

      const notes = await noteService.getNotes({
        studentId,
        subject,
        topicId,
        questionId
      });

      return sendSuccess(res, notes);
    } catch (err) {
      next(err);
    }
  },

  createNote: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      const {
        subject,
        topicId,
        topicName,
        section,
        questionId,
        questionTitle,
        content
      } = req.body;

      if (!content || !content.trim()) {
        return sendError(res, 'Note content cannot be empty.', 400);
      }

      const newNote = await noteService.createNote({
        studentId,
        subject,
        topicId,
        topicName,
        section,
        questionId,
        questionTitle,
        content
      });

      return sendSuccess(res, newNote, {}, 201);
    } catch (err) {
      next(err);
    }
  },

  updateNote: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      const { id } = req.params;
      const { content } = req.body;

      if (!content || !content.trim()) {
        return sendError(res, 'Note content cannot be empty.', 400);
      }

      const updated = await noteService.updateNote({
        noteId: id,
        studentId,
        content
      });

      return sendSuccess(res, updated);
    } catch (err) {
      next(err);
    }
  },

  deleteNote: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      const { id } = req.params;

      const result = await noteService.deleteNote({
        noteId: id,
        studentId
      });

      return sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  }
};
