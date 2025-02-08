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
        const collection = db.collection('users');

        const first = await collection.findOne();
        console.log(first);
    } catch (error) {
        console.error('Error finding user by username:', error);    
    } finally {
        await client.close();
    }
}
run().catch(console.error);


async function findUserByUsername(username) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('users');

        const first = await collection.findOne( { username: username} )
        // console.log(first);
        return first;
    } catch (error) {
        console.error('Error finding user by username:', error);    
    } finally {
        await client.close();
    }
}

async function addNewUser(username, password, creationDate, updateDate, deletedDate, admin, balance) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('users');

        const newUser = await collection.insertOne({ username: username, password: password, creationDate: creationDate, updateDate: updateDate, deletedDate: deletedDate, admin: admin, balance: balance });
        // console.log(newUser);
        return newUser;
    } catch (error) {
        console.error('Error finding user by username:', error);    
    } finally {
        await client.close();
    }
}

async function getAllUsers() {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('users');
        const users = await collection.find({}).toArray();
        return users;
    } catch (error) {
        console.error('Error getting all users:', error);
    } finally {
        await client.close();
    }
}

async function updateUser(userID, username, password, makeAdmin, updateDate) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('users');
        console.log(userID);
        const updatedUser = await collection.updateOne({ _id: new ObjectId(userID) }, { $set: { username: username, password: password, admin: makeAdmin, updateDate: updateDate } });
        console.log(updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
    } finally {
        await client.close();
    }
}

async function deleteUser(userID) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('users');
        const deletedUser = await collection.deleteOne({ _id: new ObjectId(userID) });
        console.log(deletedUser);
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        await client.close();
    }
}

module.exports = {
    findUserByUsername,
    addNewUser,
    getAllUsers,
    updateUser,
    deleteUser
}