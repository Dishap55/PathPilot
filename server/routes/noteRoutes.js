const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const requireAuth = require('../middleware/requireAuth');

// All note operations require student authentication
router.use(requireAuth);

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
