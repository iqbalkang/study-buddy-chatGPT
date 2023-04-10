const express = require('express')
const { loginUser, registerUser, updateUser, getUser } = require('../controllers/usersController')

const router = express.Router()

// POST
// /api/v1/auth   -for login,
// /api/v1/user    for signup

router.post('/auth', loginUser)
router.post('/user', registerUser)

// PUT
// /api/v1/user   for user update
router.put('/user/:userId', updateUser)

// GET
// /api/v1/user/:id
router.get('/user/:userId', getUser)
// /api/v1/user/quiz

module.exports = router
