const { supabase } = require('../config/supabase');

class ProfileService {
  async getProfile(studentId) {
    if (!studentId || studentId === 'demo-student-id') {
      return null;
    }
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', studentId)
        .maybeSingle();

      if (error || !data) {
        return null;
      }
      return data;
    } catch (err) {
      return null;
    }
  }

  async updateProfile(studentId, data) {
    if (!studentId || studentId === 'demo-student-id') {
      return { id: studentId, ...data, updated_at: new Date().toISOString() };
    }
    try {
      const profileData = {
        id: studentId,
        full_name: data.full_name?.trim() || null,
        profile_photo_url: data.profile_photo_url?.trim() || null,
        degree: data.degree?.trim() || null,
        branch: data.branch?.trim() || null,
        current_year: data.current_year ? Number(data.current_year) : null,
        current_semester: data.current_semester ? Number(data.current_semester) : null,
        graduation_year: data.graduation_year ? Number(data.graduation_year) : null,
        preparation_value: data.preparation_value ? Number(data.preparation_value) : null,
        preparation_unit: data.preparation_unit || null,
        target_date: data.target_date || null,
        target_company: data.target_company?.trim() || null,
        preferred_language: data.preferred_language || null,
        setup_completed: true,
        updated_at: new Date().toISOString()
      };

      const { data: updated, error } = await supabase
        .from('student_profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select()
        .maybeSingle();

      if (error) {
        console.error('[server.profileService] Upsert error:', error.message);
        throw error;
      }
      return updated || profileData;
    } catch (err) {
      console.error('[server.profileService] Unexpected error in updateProfile:', err);
      throw err;
    }
  }

  async getSubjectLevels(studentId) {
    if (!studentId || studentId === 'demo-student-id') {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('student_subject_levels')
        .select('*, subjects(code, name)')
        .eq('student_id', studentId);
      if (error || !data) return [];
      return data.map(sl => ({
        subject: sl.subjects?.code || sl.subject_id,
        level: sl.level
      }));
    } catch (e) {
      return [];
    }
  }

  async updateSubjectLevels(studentId, levels) {
    if (!studentId || studentId === 'demo-student-id') {
      return { studentId, levels: [], updated: true };
    }

    if (!levels || typeof levels !== 'object' || Array.isArray(levels)) {
      throw new Error('Subject levels must be provided as a subject-to-level map.');
    }

    const validLevels = new Set(['Beginner', 'Intermediate', 'Professional']);
    const submittedLevels = Object.entries(levels)
      .filter(([, level]) => level !== null && level !== undefined && String(level).trim() !== '')
      .map(([subject, level]) => {
        const normalizedSubject = subject.trim().toUpperCase();
        const subjectCode = normalizedSubject === 'APTITUDE' ? 'APT' : normalizedSubject;
        const normalizedLevel = String(level).trim();

        if (!validLevels.has(normalizedLevel)) {
          throw new Error(`Invalid starting level for ${subjectCode}.`);
        }

        return { subjectCode, level: normalizedLevel };
      });

    if (submittedLevels.length === 0) return [];

    const subjectCodes = [...new Set(submittedLevels.map(({ subjectCode }) => subjectCode))];
    const { data: subjects, error: subjectsError } = await supabase
      .from('subjects')
      .select('id, code')
      .in('code', subjectCodes);
    if (subjectsError) throw subjectsError;

    const subjectIdsByCode = new Map((subjects || []).map(subject => [subject.code, subject.id]));
    const missingSubject = subjectCodes.find(code => !subjectIdsByCode.has(code));
    if (missingSubject) {
      throw new Error(`Subject ${missingSubject} is not available for profile levels.`);
    }

    const rows = submittedLevels.map(({ subjectCode, level }) => ({
      student_id: studentId,
      subject_id: subjectIdsByCode.get(subjectCode),
      level
    }));

    const { data, error } = await supabase
      .from('student_subject_levels')
      .upsert(rows, { onConflict: 'student_id,subject_id' })
      .select('student_id, subject_id, level, subjects(code, name)');
    if (error) throw error;

    return (data || []).map(row => ({
      studentId: row.student_id,
      subject: row.subjects?.code || subjectCodes.find(code => subjectIdsByCode.get(code) === row.subject_id),
      level: row.level
    }));
  }
}

module.exports = new ProfileService();
