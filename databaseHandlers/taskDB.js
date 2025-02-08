const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.uri;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('transactions');

        const first = await collection.findOne();
        console.log(first);
    } catch (error) {
        console.error('Error finding user by username:', error);    
    } finally {
        await client.close();
    }
}
run().catch(console.error);

async function addTransaction(userID, transactionType, transactionAmount, transactionCategory, transactionDate) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('transactions');

        const transaction = { userID: userID, transactionType: transactionType, transactionAmount: transactionAmount, transactionCategory: transactionCategory, transactionDate: transactionDate };
        await collection.insertOne(transaction);
        return transaction;
    } catch (error) {
        console.error('Error adding transaction:', error);
    } finally {
        await client.close();
    }
}

async function getUserTransactions(userID) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('transactions');   

        const transactions = await collection.find({ userID: userID }).toArray();
        return transactions;
    } catch (error) {
        console.error('Error getting user transactions:', error);
    } finally {
        await client.close();
    }
}

module.exports = {
    addTransaction,
    getUserTransactions
};