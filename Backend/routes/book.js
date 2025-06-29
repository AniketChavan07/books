const router = require("express").Router();
const User = require("../models/user"); // Import your Mongoose model
const Book = require("../models/book");
const jwt = require("jsonwebtoken");//
const authenticate = require("./userAuth"); // Import the authentication middleware

//add book
router.post("/add-book",authenticate,async(req,res)=>{
try{
    const {id}=req.headers;// with the help of this id to check a statement user is a admin or user
    const user = await User.findById(id);
    if(user.role!="admin"){
 return res.status(400).json({message:"you are not access a perform a admin work"})
    }
  const book= new Book({
    url : req.body.url,
    title : req.body.title,
    author : req.body.author,
    price : req.body.price,
    description: req.body.description,
    language:req.body.language,

});
await book.save();
res.status(200).json({message:"Books add Sucessfully"})

}
catch(error){
    console.error(error);
    return res.status(500).json({message:"Internal server error"});
  }
})
// update book
router.put("/update-book",authenticate,async(req,res)=>{
try{
    const {bookid}=req.headers;// with the help of this id to check a statement user is a admin or user
    await Book.findByIdAndUpdate(bookid, {// update the book with the new data
    url : req.body.url,
    title : req.body.title,
    author : req.body.author,
    price : req.body.price,
    description: req.body.description,
    language:req.body.language,

});
 return res.status(200).json({message:"Books add Sucessfully"})

}
catch(error){
    console.error(error);
    return res.status(500).json({message:"Internal server error"});
  }
})
// delete book
router.delete("/delete-book",authenticate,async(req,res)=>{
try{
    const {bookid}=req.headers;// with the help of this id to check a statement user is a admin or user
    await Book.findByIdAndDelete(bookid);// update the book with the new data
   
 return res.status(200).json({message:"Books Delete Sucessfully"})

}
catch(error){
    console.error(error);
    return res.status(500).json({message:"Internal server error"});
  }
})

// get- books 
router.get("/get-book",async(req,res)=>{
try{
    const books= await Book.find().sort({createdAt:-1});// get all books and sort them by createdAt in descending order
    return res.json({status:"success",data:books});// return the books in the response
   

}
catch(error){
    console.error(error);
    return res.status(500).json({message:"Internal server error"});
  }
})
//get recently add books
router.get("/get-recent-book",async(req,res)=>{
try{
    const books= await Book.find().sort({createdAt:-1}).limit(4);// get all books and sort them by createdAt in descending order, limiting to 4 most recent
    return res.json({status:"success",data:books});// return the books in the response
   

}
catch(error){
    console.error(error);
    return res.status(500).json({message:"Internal server error"});
  }
})
//get book by id
router.get("/get-book-id/:id",async(req,res)=>{
try{
  const {id}=req.params;// get the id from the params
    const books= await Book.findById(id);// get the book by id
    return res.json({status:"success",data:books});// return the books in the response
   

}
catch(error){
    console.error(error);
    return res.status(500).json({message:"Internal server error"});
  }
})
module.exports = router;