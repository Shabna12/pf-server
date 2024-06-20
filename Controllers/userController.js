//server section

const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

//register logic - email password username
exports.registerController = async (req,res) => {
    console.log("Inside register function");
    const {username, email, password} = req.body
    console.log(username, email, password);
    try {
        //email is in mongodb users
        const exisitingUser = await users.findOne({email})
        if (exisitingUser) {
            //already a user
            res.status(406).json("Account already exisit !! Please login..")
        } else {
            // add or register user : create object for your model
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            //update mongodb from model
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }

    // res.status(200).json("Request Recieved")
}


//login section - email password

exports.loginController = async(req,res) => {
    console.log("Inside login function");
    const {email,password} = req.body    //from request body
    console.log(email,password);
    try {
        const exisitingUser = await users.findOne({email,password})
        if (exisitingUser) {
            //token generator
            const token = jwt.sign({userId:exisitingUser._id},process.env.JWT_PASSWORD) //token creating step
            res.status(200).json({
                user:exisitingUser,
                token
            })
        } else {
            res.status(404).json("Invalid Email or Password..")    // 404 - error code
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//edit/update profile

exports.editProfileController = async (req,res) => {
    console.log("Inside editProfileController");
    const {username,email,password,github,linkedin,profilePic} = req.body
    const uploadImg = req.file?req.file.filename:profilePic
    const userId = req.payload       
    try {
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadImg
        }, {new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(401).json(err)
    }
}