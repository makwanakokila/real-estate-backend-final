const express = require('express');
const router = express.Router();
const blogController = require('../Controller/blogController');

// Routes
router.post('/blog', blogController.uploadBlogImage, blogController.addBlog);
router.get('/blog', blogController.getBlogs);
router.delete('/blog/:id', blogController.deleteBlog);
router.put('/blog/:id', blogController.uploadBlogImage, blogController.updateBlog);

module.exports = router;
