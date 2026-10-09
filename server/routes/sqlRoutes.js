const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');
const validateRequest = require('../middleware/validateRequest');
const { validateExecuteSql } = require('../validators/sqlValidators');

router.post('/execute', validateRequest(validateExecuteSql), sqlController.executeSql);
router.get('/:questionId/schema', sqlController.getSchema);

module.exports = router;
