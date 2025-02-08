const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/login', (req, res) => userController.login(req, res));
router.post('/register', (req, res) => userController.registration(req, res));
router.post('/retrieveUser', (req, res) => userController.retrieveUserFromTokenApi(req, res));

module.exports = router;