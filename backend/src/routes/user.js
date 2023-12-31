const express =require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = 'codingbecomesdarkwhenNeerajWaliateachesyou';

import User from "../db/schema/userSchema"



router.app.post("/signup", validUserData,handelAuthErrors, async(req, res) =>{
  try{

     const {name, userName, password} = req.body;

     const userExist = await User.findOne({userName: userName});

    if(userExist){
      return res.status(409).json({
        msg: "User already exist. Please do login "
      });
    };

    const newUser = new User({
      name,
      userName,
      password: await bcrypt.hash(password, 10)
    });
    
    await newUser.save();

    const token = jwt.sign({
      userID: newUser._id
    },jwtSecret)

    newUser.jwtToken = token;

    await newUser.save();

    res.status(201).json({
      msg: "User signup successfully ", token
    });

  }catch (err){
    console.log("Error in user signup: ",err);
    res.status(500).json({
      msg: "Error in user signup"
    });
  };
});

router.app.post("/login", validateLoginData,handelAuthErrors, async(req, res) =>{
  try{

    const {userName, password} = req.body;

    const user = await User.findOne({userName})
    // 
    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.status(401).json({
        msg: "User does not exist. Please do SignUP "
      });
    };
    if (!user.jwtToken) {
      return res.status(401).json({
        msg: "User does not have a valid token. Please do SignUP "
      });
    }

    try{
      const decoded = jwt.verify(user.jwtToken, jwtSecret);
    res.json({msg: "User loggedIN successfully",
    user: decoded});
    }catch{
      return res.status(401).json({
        msg: "User does not have a valid token. Please do SignUP ",
      });
    }

  }catch (error){
    console.error('Error in login validation:', error.errors);
    res.status(400).json({ msg: 'Invalid input data' });
  }
})

module.exports = router;