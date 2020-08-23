const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/v1/user', userRoutes);
router.use('/v1/profile', profileRoutes);
module.exports = router;
