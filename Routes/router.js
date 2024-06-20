const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerMiddleware = require('../Middleware/multerMiddleware')

const router = new express.Router()

//register - POST - https://localhost:3000/register
router.post('/register',userController.registerController)

//login - GET aan but body is hard to pass so POST req nnu body undaakum so its easy nd less step -- https://localhost:3000/login
router.post('/login',userController.loginController)

//add project
router.post('/project/add',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)  //bcoz req rsolve aakunnathinumunne so middleware 

//home project - get
router.get('/get-home-projects',projectController.getHomeProjects)

//allprojects - get
router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)

//user Projects - get
router.get('/user-projects',jwtMiddleware,projectController.getuserProjectsController)

//edit/ project
router.put('/project/:pid/edit',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController)

//remove project
router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)


//edit user
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)

module.exports = router