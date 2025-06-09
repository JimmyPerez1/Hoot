const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/hoots');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');


router.use(ensureLoggedIn);
router.get('/', hootsCtrl.index);
router.post('/', hootsCtrl.create);
router.get('/:hootId', hootsCtrl.show);
router.put('/:hootId', hootsCtrl.update);
router.delete('/:hootId', hootsCtrl.deleteHoot);

module.exports = router;