const router = require('express').Router();
const multer = require('multer');
const profileController = require('../controller/profileController');
const authenticateUser = require('../middleware/authenticateUser');

const storage = multer.memoryStorage();

router.post('/create', authenticateUser, multer({ storage }).single('profilePic'), profileController.create);

module.exports = router;
