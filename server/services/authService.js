const { supabase } = require('../config/supabase');

class AuthService {
  async signup(email, password, metadata = {}) {
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists in Supabase Auth
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    if (!listError && existingUsers?.users) {
      const alreadyExists = existingUsers.users.some(u => u.email?.toLowerCase() === cleanEmail);
      if (alreadyExists) {
        const err = new Error('This email is already registered. Please sign in.');
        err.statusCode = 409;
        err.code = 'user_already_exists';
        throw err;
      }
    }

    // Create user in Supabase with pre-confirmed email
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: cleanEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: metadata.fullName || metadata.full_name || cleanEmail.split('@')[0],
        preferred_subject: metadata.preferredSubject || metadata.preferred_subject || 'DSA'
      }
    });

    if (createError) {
      const errMsg = createError.message?.toLowerCase() || '';
      if (errMsg.includes('already exists') || errMsg.includes('already registered')) {
        const err = new Error('This email is already registered. Please sign in.');
        err.statusCode = 409;
        err.code = 'user_already_exists';
        throw err;
      }
      const err = new Error(createError.message || 'Unable to create your account.');
      err.statusCode = 400;
      throw err;
    }

    return {
      user: {
        id: newUser.user.id,
        email: newUser.user.email
      },
      message: 'Account created successfully'
    };
  }

  async login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    });
    if (error) {
      const err = new Error(error.message);
      err.statusCode = error.status || 400;
      throw err;
    }
    return data;
  }

  async logout() {
    return { loggedOut: true };
  }
}

module.exports = new AuthService();
