const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.createNewUser = async (req, res) => {
  try {
    const { username, email, password, dateOfBirth, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file ? req.file.path : null;
    console.log("=================11",req.body)
    console.log("===================12",req.file)
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      profilePicture
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const matchUser = await userModel.findOne({ email: email });
    if (!matchUser) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, matchUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Password does not match' });
    }
    const payloads = {
      email: matchUser.email,
      userId: matchUser._id
    };
    const token = jwt.sign(payloads, process.env.JWT_KEY, { expiresIn: '24h' });

    res.status(200).json({ message: 'User logged in successfully', token: token,data:matchUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params._id
    const userDetails = req.body
    const updateUser = await userModel.findByIdAndUpdate(userId, userDetails, { new: true })
    if (!updateUser) {
      return res.status(400).json({ message: 'updated UserNot Found' })
    }
    return res.status(200).json({ updateUser })
  } catch (err) {
    return res.status(500).json(err.message)
  }

}

exports.updateProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id
    const profilePicPath = req.file.path;
    const targetUser = await userModel.findByIdAndUpdate(userId, profilePicPath, { new: true })
    if (!targetUser) {
      return res.status(400).json({ message: 'user not found' })
    }
    return res.status(200).json({ targetUser })

  } catch (err) {
    res.status(500).json(err.message)
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const user = req.params.id
    let updateUser = await userModel.findByIdAndUpdate(user, { status: true }, { new: true })
    if (!updateUser) {
      return res.status(500).json({ message: 'updateed user not found' })
    }
    return res.status(200).json({ message: updateUser })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

exports.logout = async(req,res) => {
  try{
    res.status(200).json({message:"user logout successfully"})
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

exports.getAccount = async (req, res) => {
  try {
    const userid = req.params.id
    const allUser = await userModel.find({_id:userid})
    if (!allUser) {
      return res.status(401).json({ message: "user Not Found" })
    }
    return res.status(200).json({ data: allUser })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}








