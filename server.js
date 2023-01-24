const express = require('express')
const app = express()

//cors
const cors = require('cors')
app.use(cors())

//dotenv
require('dotenv').config()

//db
const connect = require('./config/db')

//json
app.use(express.json())


//routes
const {registerUser, authUser, addNewJob, getalljob} = require('./controllers/userController')
const { protect } = require('./middleware/auth')


app.get("/" , (req,res)=>{
    res.send({statue:"Welcome to API Ref.."})
})



app.post("/signup" , registerUser)
app.post("/login" , authUser)
app.post('/job' , protect , addNewJob)
app.get('/job' , getalljob)




app.listen(process.env.PORT , async ()=>{
    console.log("App is listning at " , process.env.PORT)

    await connect
    console.log("Connected to DB..")

})