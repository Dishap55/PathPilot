const profileService = require('../services/profileService');
const { validateProfileSetup } = require('../validators/profileValidator');

/**
 * Profile Controller
 *
 * Implements endpoints for retrieving and completing student profile setup.
 *
 * SECURITY INVARIANTS:
 * - req.user.id is the authoritative, immutable source of student identity.
 * - Any client attempts to supply student_id in body or params are strictly rejected.
 * - Internal database errors are caught and sanitized via centralized error middleware.
 */
const profileController = {
  async getProfile(req, res, next) {
    try {
      const studentId = req.user.id;
      const data = await profileService.getProfile(studentId, req.token);

      if (!data || !data.profile) {
        return res.status(404).json({
          success: false,
          message: 'Student profile not found'
        });
      }

      return res.status(200).json({
        success: true,
        profile: data.profile,
        subjectLevels: data.subjectLevels
      });
    } catch (err) {
      next(err);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const studentId = req.user.id;

      // Security check: reject explicit student_id injection attempts
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or modifying student_id is forbidden. Identity is cryptographically derived from authentication.'
        });
      }

      // Validate payload against Technical Master Specification
      const validation = validateProfileSetup(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      const updated = await profileService.updateProfile(studentId, req.body, req.token);

      return res.status(200).json({
        success: true,
        message: 'Profile setup completed successfully',
        profile: updated.profile,
        subjectLevels: updated.subjectLevels
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = profileController;
