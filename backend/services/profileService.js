const { getSupabaseClient } = require('../config/supabaseAdmin');
const { REQUIRED_SUBJECT_CODES } = require('../validators/profileValidator');

/**
 * Profile Service
 * Authoritative data access and business orchestration for student profile setup.
 *
 * Guarantees:
 * - Student ownership is locked to userId (req.user.id).
 * - Exact database fields: preparation_value (numeric) and preparation_unit ("Days" | "Months" | "Years").
 * - Target date is stored explicitly without auto-calculation.
 * - All six subjects saved into public.student_subject_levels.
 * - setup_completed is set to true only after profile and all six subject levels succeed.
 */
const profileService = {
  /**
   * Retrieves profile and resolved subject levels for the authenticated student.
   * @param {string} userId - Authenticated student UUID
   * @param {string} [token] - Authenticated student access token
   */
  async getProfile(userId, token) {
    const client = getSupabaseClient(token);

    // 1. Fetch student profile
    const { data: profile, error: profileError } = await client
      .from('student_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      throw profileError;
    }

    if (!profile) {
      return null;
    }

    // 2. Fetch shared subjects reference
    const { data: subjects, error: subjectsError } = await client
      .from('subjects')
      .select('id, name, code')
      .eq('is_active', true);

    if (subjectsError) {
      throw subjectsError;
    }

    // 3. Fetch student subject levels
    const { data: levels, error: levelsError } = await client
      .from('student_subject_levels')
      .select('subject_id, level')
      .eq('student_id', userId);

    if (levelsError) {
      throw levelsError;
    }

    const subjectMap = {};
    for (const sub of subjects || []) {
      subjectMap[sub.id] = sub;
    }

    const subjectLevels = (levels || []).map(l => {
      const sub = subjectMap[l.subject_id] || {};
      return {
        subject_id: l.subject_id,
        subject_name: sub.name || null,
        subject_code: sub.code || null,
        level: l.level
      };
    });

    return {
      profile,
      subjectLevels
    };
  },

  /**
   * Performs profile setup and records all six independent subject levels.
   * @param {string} userId - Authenticated student UUID
   * @param {Object} payload - Validated profile setup payload
   * @param {string} [token] - Authenticated student access token
   */
  async updateProfile(userId, payload, token) {
    const client = getSupabaseClient(token);

    // 1. Resolve shared subjects from public.subjects
    const { data: subjects, error: subjectsError } = await client
      .from('subjects')
      .select('id, name, code')
      .eq('is_active', true);

    if (subjectsError) {
      throw subjectsError;
    }

    const codeToSubject = {};
    for (const s of subjects || []) {
      codeToSubject[s.code] = s;
    }

    // Verify all 6 required subjects exist in database
    for (const code of REQUIRED_SUBJECT_CODES) {
      if (!codeToSubject[code]) {
        throw new Error(`Required subject with code "${code}" not found in database.`);
      }
    }

    // 2. Prepare profile record (setup_completed initially false until levels are saved)
    const profileData = {
      id: userId,
      full_name: payload.full_name.trim(),
      profile_photo_url: payload.profile_photo_url ? payload.profile_photo_url.trim() : null,
      degree: payload.degree.trim(),
      branch: payload.branch.trim(),
      current_year: Number(payload.current_year),
      current_semester: Number(payload.current_semester),
      graduation_year: Number(payload.graduation_year),
      preparation_value: Number(payload.preparation_value),
      preparation_unit: payload.preparation_unit, // Exact word: "Days" | "Months" | "Years"
      target_date: payload.target_date, // Stored explicitly without auto-inference
      target_company: payload.target_company ? payload.target_company.trim() : null,
      preferred_language: payload.preferred_language ? payload.preferred_language.trim() : null,
      setup_completed: false
    };

    // Upsert student_profiles by primary key id
    const { error: saveProfileError } = await client
      .from('student_profiles')
      .upsert(profileData, { onConflict: 'id' });

    if (saveProfileError) {
      throw saveProfileError;
    }

    // 3. Save six independent subject-level rows in public.student_subject_levels
    const subjectLevelRows = REQUIRED_SUBJECT_CODES.map(code => ({
      student_id: userId,
      subject_id: codeToSubject[code].id,
      level: payload.subjectLevels[code]
    }));

    const { error: levelsError } = await client
      .from('student_subject_levels')
      .upsert(subjectLevelRows, { onConflict: 'student_id,subject_id' });

    if (levelsError) {
      throw levelsError;
    }

    // 4. Mark setup_completed = true only after both profile and all 6 subject levels succeed
    const { error: completeError } = await client
      .from('student_profiles')
      .update({ setup_completed: true, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (completeError) {
      throw completeError;
    }

    // 5. Return complete updated profile and resolved subject levels
    return await this.getProfile(userId, token);
  }
};

module.exports = profileService;
