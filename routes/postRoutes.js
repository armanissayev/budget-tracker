const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/getAllPosts', (req, res) => postController.getAllPosts(req, res));
router.get('/getPost/:id', (req, res) => postController.getPost(req, res));
router.post('/createPost', (req, res) => postController.createPost(req, res));
router.put('/updatePost', (req, res) => postController.updatePost(req, res));
router.delete('/deletePost/:id', (req, res) => postController.deletePost(req, res));
router.put('/restorePost/:id', (req, res) => postController.restorePost(req, res));

module.exports = router;