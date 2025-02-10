const postDB = require('../databaseHandlers/postDB');
const userController = require('./userController');

async function getAllPosts(req, res) {
    try {
        const posts = await postDB.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({message: 'Error fetching posts'});
    }
}

async function createPost(req, res) {
    const {token, images, title, description, creationDate, updateDate, deletedDate} = req.body;

    try {

        const user = await userController.retrieveUserFromToken(token);
        if (!user) {
            return res.status(401).json({message: 'Invalid token'});
        }

        if (!user.userAdmin) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const post = await postDB.createPost(images, title, description, creationDate, updateDate, deletedDate);
        res.json(post);

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function updatePost(req, res) {
    const {postId, token, title, description, images, updateDate} = req.body;

    try {
        const user = await userController.retrieveUserFromToken(token);
        if (!user) {
            return res.status(401).json({message: 'Invalid token'});
        }

        if (!user.userAdmin) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const post = await postDB.updatePost(postId, title, description, images, updateDate);
        res.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function deletePost(req, res) {
    const {id} = req.params;
    const {token, deletedDate} = req.body;

    try {
        const user = await userController.retrieveUserFromToken(token);
        if (!user) {
            return res.status(401).json({message: 'Invalid token'});
        }

        if (!user.userAdmin) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        
        const post = await postDB.deletePost(id, deletedDate);
        res.json(post);

    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getPost(req, res) {
    const {id} = req.params;

    try {
        const post = await postDB.getPost(id);
        res.json(post);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function restorePost(req, res) {
    const {id} = req.params;
    const {token, updateDate} = req.body;

    try {
        const user = await userController.retrieveUserFromToken(token);
        if (!user) {
            return res.status(401).json({message: 'Invalid token'});
        }

        if (!user.userAdmin) {
            return res.status(401).json({message: 'Unauthorized'}); 
        }

        const post = await postDB.restorePost(id, updateDate);
        res.json(post);
    } catch (error) {
        console.error('Error restoring post:', error);
        res.status(500).json({message: 'Internal server error'});
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

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJKKuIhcs_xm0FdulvpxZB56Zw0uk4rXJ8Q&s
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnNJ7Cl8SFFkMAbPvVD1Z3MejiiRb4cz_9Hw&s
// https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/5f4f/live/9364add0-818f-11ef-ad45-893aa022fcbc.jpg