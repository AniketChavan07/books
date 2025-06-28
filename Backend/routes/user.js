const router = require("express").Router();
const User = require("../models/user"); // Import your Mongoose model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");//
const authenticate = require("./userAuth"); // Import the authentication middleware
// Sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (name.length < 4) {
      return res.status(400).json({ message: "Name should be greater than 4 characters" });
    }

    const existingname = await User.findOne({ name: name });
    if (existingname) {
      return res.status(400).json({ message: "Name already exists" });
    }

    const existingemail = await User.findOne({ email: email });
    if (existingemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters long" });
    }
          const hashpass = await bcrypt.hash(password,10)// in it the hash are performed a 10 times to encrypt a passwprd
    const newUser = new User({
      name:name,
      email:email,
      password:hashpass,
      address:address,
    });

    await newUser.save();

    return res.status(200).json({ message: "Signup successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// sign in
router.post("/sign-in", async (req, res) => {
  try {
    const {name,password}=req.body;
    const existingUser = await User.findOne({name });
    if(!existingUser){
      return res.status(400).json({message:"User not found"});
    }// compare the password
    
    await bcrypt.compare(password,existingUser.password,(err,data)=>{// asynchronous function to compare the password
      // if there is an error in comparing the password
      if (data){
        const authClaims = {
          name: existingUser.name,
          role: existingUser.role,
        };
        const token = jwt.sign({authClaims},"bookstore123",{// secret key to sign the token
          expiresIn:"30d"});// token will expire in 30 days
        // if the password is not matched
        return res.status(200).json({id :existingUser.id,role:existingUser.role,token:token});// return the token and user id
      }
      else{
        return res.status(200).json({message:"invalid credentials"});

      }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Get user details
router.get("/get-user-information",authenticate, async (req, res) => {
  try {
    const {id} = req.headers; // Assuming the user ID is passed as a query parameter
    const data= await User.findById(id).select('-password'); // Exclude password from the response
      return res.status(200).json(data); // Return user data without password});
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } 
});
// Update user details
router.put("/update-address", authenticate, async (req, res) => {
  try {
    const { id } = req.headers; // Assuming the user ID is passed as a header
    const { address } = req.body;

    await User.findById(id,{address:address});
    return res.status(200).json({ message: "Address update sucessfully" });

     } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
