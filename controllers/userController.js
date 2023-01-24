const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const userModel = require('../model/user.model')
const jobModel = require('../model/job.model')



const registerUser = asyncHandler( async (req,res)=>{

    console.log(req.body)
    
    const {name , email , password } = req.body

    if(!name  || !email || !password){
        res.status(201)
        throw new Error("Fill All The Fields")
    }


    // const userExist = await 
    const userExists = await userModel.findOne({ email })
    if (userExists) {
        throw new Error('User Already Exist')
    }


    const user = await userModel.create({
        name,
        email,
        password,
    })


    if (user) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Fail to Create User')
    }

})



const addNewJob = asyncHandler( async (req,res)=>{

    
    const {compnayname , position , contract , location } = req.body

    if(!compnayname  || !position || !contract || !location){
        res.status(201)
        throw new Error("Fill All The Fields")
    }


    const addnewjob = await jobModel.create({
        compnayname,
        position,
        contract,
        location
    })


    if (addnewjob) {
        res.status(201).send({
            detail: addnewjob
        })
    } else {
        res.status(400)
        throw new Error('Fail to Add new Job')
    }

})


const getalljob = asyncHandler( async (req,res)=>{


    //finding user in db
    const joblist = await jobModel.find({})

    if (joblist){
        res.status(201).send({
            joblist:joblist
        })
    } else {
        res.status(400)
        throw new Error('job not found ')
    }

})


// const updatejob = asyncHandler( async (req,res)=>{

//     const {id} = req.body
//     //finding user in db
//     const joblist = await jobModel.findByIdAndUpdate({id} , {})

//     if (joblist){
//         res.status(201).send({
//             joblist:joblist
//         })
//     } else {
//         res.status(400)
//         throw new Error('job not found ')
//     }

// })



const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //finding user in db
    const user = await userModel.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found or Password is Incorrect')
    }
})



module.exports = { registerUser, authUser , addNewJob , getalljob}