const userController = require('./userController');
const userDB = require('../databaseHandlers/userDB');
const transactionDB = require('../databaseHandlers/taskDB');

async function getUserTransactions(req, res) {
    const { token } = req.body;
    console.log(req.body);
    const decoded = await userController.retrieveUserFromToken(token);
    if (!decoded) {
        return res.status(401).json({message: 'Invalid token'});
    }
    const transactions = await transactionDB.getUserTransactions(decoded.userID);
    res.json({ transactions: transactions });
}

async function addTransaction(req, res) {
    const { token, transactionType, transactionAmount, transactionCategory, transactionDate } = req.body;
    const decoded = await userController.retrieveUserFromToken(token);
    if (!decoded) {
        return res.status(401).json({message: 'Invalid token'});
    }
    const transaction = await transactionDB.addTransaction(decoded.userID, transactionType, transactionAmount, transactionCategory, transactionDate);
    res.json(transaction);
}

async function getCurrencies(req, res) {
    try {
        const currencies = await fetch('https://v6.exchangerate-api.com/v6/e574baa886db4517daba5e5a/latest/KZT');
        const data = await currencies.json();
        if (data.result != "success") {
            throw new Error('Error fetching currencies');
        }
        res.json({
            USD: data.conversion_rates.USD,
            EUR: data.conversion_rates.EUR
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching currencies'});
    }
}

async function getBitcoinPrice(req, res) {
    try {
        const response = await fetch('https://api.coinpaprika.com/v1/coins/btc-bitcoin');
        const data = await response.json();

        if (data.status === 401) {
            throw new Error('che');
        }
        
        const priceResponse = await fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
        const priceData = await priceResponse.json();
        
        const price = priceData.quotes.USD.price;
        res.json({price: price});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getUserTransactions,
    addTransaction,
    getCurrencies,
    getBitcoinPrice
};