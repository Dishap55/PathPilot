const sqlSandbox = require('../integrations/sqlSandbox');

class SqlExecutionService {
  async executeSql(query, schemaContext = '') {
    return await sqlSandbox.executeQuery(query, schemaContext);
  }
  async getQuestionSchema(questionId) {
    return {
      tableName: 'Employee',
      columns: [
        { name: 'id', type: 'INT PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(50)' },
        { name: 'salary', type: 'DECIMAL(10, 2)' },
        { name: 'manager_id', type: 'INT' }
      ]
    };
  }
}
module.exports = new SqlExecutionService();
