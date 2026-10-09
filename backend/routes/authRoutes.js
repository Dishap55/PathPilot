const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Auth Routes
 *
 * NOTE: Authentication is handled directly on the client via Supabase Auth.
 * These endpoints provide authenticated session verification and user state checks.
 * No user credentials or passwords are ever stored or processed here.
 */

const { supabaseAdmin } = require('../config/supabaseAdmin');

// Verify session token
router.get('/session', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Session valid',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Generic registration endpoint confirmation
router.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

/**
 * POST /api/auth/signup
 * Securely creates a student account in Supabase Auth.
 * Pre-confirms email so the student is never blocked by the free-tier SMTP rate limit (429)
 * and can immediately sign in and continue to profile setup.
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, fullName, preferredSubject } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName ? String(fullName).trim() : '';

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (!listError && existingUsers?.users) {
      const alreadyExists = existingUsers.users.some(u => u.email?.toLowerCase() === cleanEmail);
      if (alreadyExists) {
        return res.status(409).json({
          success: false,
          code: 'user_already_exists',
          message: 'This email is already registered. Please sign in.'
        });
      }
    }

    // Create user with pre-confirmed email
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: cleanEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: cleanName || undefined,
        preferred_subject: preferredSubject || 'DSA'
      }
    });

    if (createError) {
      console.error('[Auth API] Supabase createUser error:', createError);
      const errMsg = createError.message?.toLowerCase() || '';

      if (errMsg.includes('already exists') || errMsg.includes('already registered')) {
        return res.status(409).json({
          success: false,
          code: 'user_already_exists',
          message: 'This email is already registered. Please sign in.'
        });
      }

      return res.status(400).json({
        success: false,
        message: createError.message || 'Unable to create your account. Please check your email and password.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.user.id,
        email: newUser.user.email
      }
    });
  } catch (err) {
    console.error('[Auth API] Unexpected signup error:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on the server. Please try again.'
    });
  }
});

module.exports = router;
