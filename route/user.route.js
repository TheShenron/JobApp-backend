const { Router } = require('express')
const { registerUser, authUser } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

const userRoute = Router()


userRoute.post('/signup' , registerUser)
userRoute.post('/login' , authUser)



module.exports = { userRoute }