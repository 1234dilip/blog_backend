const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const upload = require('../config/config')
const authentication = require('../middleware/auth')

router.post('/user/registration', upload.single('profilePicture'), (req, res, next) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    next();
  }, userController.createNewUser);router.post('/user/login',userController.login)
router.get('/user/getUser/:id',authentication,userController.getAccount)
router.put('/user/updateprofileuser/:id',authentication,userController.updateProfile)
router.put('/user/updateProfilePic/:id',authentication,upload.single('profilePicture'),userController.updateProfilePicture)
router.delete('/user/delete/:id',authentication,userController.deleteAccount)
router.post('/user/logout',authentication,userController.logout)





module.exports = router