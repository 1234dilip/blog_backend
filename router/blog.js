const express = require('express')
const router = express.Router()
const blogController = require('../controller/blog')
const authentication = require('../middleware/auth')
const upload = require('../config/config')

router.post('/createBlog',authentication,upload.single('image'),blogController.createBlog)
router.get('/getAllPost',blogController.getAllPost)
router.get('/getPostOfSpecificUser/:id',blogController.specificUserPost)
router.put('/updatePost/:id',blogController.updateBlog)
router.delete('/delete/blog/:id',blogController.deleteBlog)
router.post('/like/:id',authentication,blogController.likeblog)
router.post('/comment/:id',authentication,blogController.commentOnBlog)




module.exports = router