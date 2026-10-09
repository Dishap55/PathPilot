const { sendSuccess } = require('../utils/response');

module.exports = {
  getSubjects: async (req, res, next) => {
    try {
      const subjects = [
        { id: 'sub_1', name: 'Data Structures & Algorithms', code: 'DSA', is_active: true },
        { id: 'sub_2', name: 'Object Oriented Programming', code: 'OOPS', is_active: true },
        { id: 'sub_3', name: 'Quantitative & Logical Aptitude', code: 'APT', is_active: true },
        { id: 'sub_4', name: 'Database Management Systems', code: 'DBMS', is_active: true },
        { id: 'sub_5', name: 'Operating Systems', code: 'OS', is_active: true },
        { id: 'sub_6', name: 'Computer Networks', code: 'CN', is_active: true }
      ];
      return sendSuccess(res, subjects);
    } catch (e) { next(e); }
  }
};
