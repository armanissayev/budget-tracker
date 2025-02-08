const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.post('/getUserTransactions', (req, res) => transactionController.getUserTransactions(req, res));
router.post('/addTransaction', (req, res) => transactionController.addTransaction(req, res));
router.get('/getCurrencies', (req, res) => transactionController.getCurrencies(req, res));
router.get('/getBitcoinPrice', (req, res) => transactionController.getBitcoinPrice(req, res));
module.exports = router;