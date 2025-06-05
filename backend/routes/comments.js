const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/hoots'

// Protect all defined routes
router.use(ensureLoggedIn);


// POST /api/hoots (CREATE action)
router.post('/comments', commentsCtrl.create);

//GET /api/hoots/:hootId (SHOW action)
router.get('/comments', commentsCtrl.show);

//GET /api/hoots/:hootId (UPDATE action)
router.put('/comments', commentsCtrl.update);

//GET /api/hoots/:hootId (UPDATE action)
router.delete('/comments', commentsCtrl.deleteComment);

module.exports = router;