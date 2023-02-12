const express = require('express')

const { loginUser, signupUser } = require('../controllers/userContollers')

const router = express.Router()

//login route
router.post('/login' , loginUser)
router.post('/signup', signupUser)

module.exports = router