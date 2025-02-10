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
        const collection = db.collection('posts');

        const first = await collection.findOne();
        console.log(first);
    } catch (error) {
        console.error('Error finding user by username:', error);    
    } finally {
        await client.close();
    }
}
run().catch(console.error);

async function getAllPosts() {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('posts');
        const posts = await collection.find({}).toArray();
        return posts;
    } catch (error) {
        console.error('Error finding user by username:', error);    
    } finally {
        await client.close();
    }
}

async function createPost(images, title, description, creationDate, updateDate, deletedDate) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('posts');
        const post = await collection.insertOne({images: images, title: title, description: description, creationDate: creationDate, updateDate: updateDate, deletedDate: deletedDate});
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
    } finally {
        await client.close();
    }
}

async function updatePost(id, title, description, images, updateDate) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('posts');
        const post = await collection.updateOne({_id: new ObjectId(id)}, {$set: {title: title, description: description, images: images, updateDate: updateDate}});
        return post;
    } catch (error) {
        console.error('Error updating post:', error);
    } finally {
        await client.close();
    }
}

async function deletePost(id, deletedDate) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('posts');
        const post = await collection.updateOne({_id: new ObjectId(id)}, {$set: {deletedDate: deletedDate}});
        return post;
    } catch (error) {
        console.error('Error deleting post:', error);
    } finally {
        await client.close();
    }
}

async function getPost(id) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('posts');
        const post = await collection.findOne({_id: new ObjectId(id)});
        console.log(id + " ->" + post);
        return post;
    } catch (error) {
        console.error('Error getting post:', error);
    } finally {
        await client.close();
    }
}

async function restorePost(id, updateDate) {
    try {
        await client.connect();
        const db = client.db('budget_tracker_db');
        const collection = db.collection('posts');
        const post = await collection.updateOne({_id: new ObjectId(id)}, {$set: {deletedDate: null, updateDate: updateDate}});
        return post;
    } catch (error) {
        console.error('Error restoring post:', error);
    } finally {
        await client.close();
    }
}

module.exports = { 
    getAllPosts, 
    createPost,
    updatePost,
    deletePost,
    getPost,
    restorePost
};