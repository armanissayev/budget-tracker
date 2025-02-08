const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/getAllUsers', (req, res) => userController.getAllUsers(req, res));
router.post('/addNewUser', (req, res) => userController.addNewUser(req, res));
router.post('/checkAdmin', (req, res) => userController.checkAdmin(req, res));
router.put('/updateUser', (req, res) => userController.updateUser(req, res));
router.post('/deleteUser', (req, res) => userController.deleteUser(req, res));

module.exports = router;