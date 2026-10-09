const sqlConfig = require('../config/sql');

class SqlSandbox {
  async executeQuery(query, schemaContext = '') {
    // Guard against destructive statements
    const upper = query.toUpperCase();
    for (const keyword of sqlConfig.disallowedKeywords) {
      if (upper.includes(keyword)) {
        throw new Error(`Destructive or modifying statements like '${keyword}' are forbidden in SQL sandbox.`);
      }
    }

    return {
      rows: [
        { id: 1, name: 'Alice', salary: 90000, manager_name: 'Bob' },
        { id: 3, name: 'Charlie', salary: 110000, manager_name: 'Bob' }
      ],
      rowCount: 2,
      executionMs: 12
    };
  }
}

module.exports = new SqlSandbox();
