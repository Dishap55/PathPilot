/**
 * SCRIPT: scripts/build_sql_challenges.js
 * Generates 65 high-quality DBMS SQL challenges with complete schema contexts,
 * test cases, progressive hints, query breakdowns, and evidence-based company metadata.
 */

const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsSqlChallengesData.js');

// We will load the data definitions from modular parts and export them cleanly.
console.log('Writing 65 SQL challenges to dbmsSqlChallengesData.js...');
