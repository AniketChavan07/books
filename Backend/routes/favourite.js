const router = require("express").Router();
const User = require("../models/user");
const authenticate  = require("./userAuth");

// Add book to favourite
router.put("/add-book-favourite", authenticate, async (req, res) => {
  try {
    const{bookid,id}= req.headers; // Get book ID and user ID from headers
    const userData = await User.findById(id);    // Find user by ID
    const isBookfavourite = userData.favorites.includes(bookid);// Check if the book is already in favourites
    if(isBookfavourite){//
        return res.status(200).json({message:"Book is already in favourites"});
    }
    await User.findByIdAndUpdate(id,{$push:{favorites:bookid}}); // Add book ID to user's favourites
    // The $push operator adds the specified value to the end of the array.
     return res.status(200).json({message:"Book added in favourites"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});
// Remove book from favourite
router.put("/delete-book-favourite", authenticate, async (req, res) => {
  try {
    const{bookid,id}= req.headers; // Get book ID and user ID from headers
    const userData = await User.findById(id);    // Find user by ID
    const isBookfavourite = userData.favorites.includes(bookid);// Check if the book is already in favourites
    if(isBookfavourite){//
        await User.findByIdAndUpdate(id,{$pull:{favorites:bookid}}); // Add book ID to user's favourites
    }
    // The $push operator adds the specified value to the end of the array.
     return res.status(200).json({message:"Book Remove in favourites"});


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});
//get a favourite book of a particular user
router.get("/get-favourite-book", authenticate, async (req, res) => {
    try {
        const {id} = req.headers; // Get user ID from headers
        const userData = await User.findById(id).populate("favorites"); // Find user by ID and populate favourites book details
        // The populate() method is used to replace the specified path in the document with the documents from the referenced collection.
        // In this case, it replaces the "favorites" field with the actual book documents from the "books" collection.
        // This allows you to retrieve the full book details instead of just the book IDs stored in the "favorites" array.
        // If the user is not found, it returns a 404 status with an error message
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({message:"Favourite book fetched successfully", favourites:userData.favorites});// fetches the user's favourite books and returns them in the response favourites array and favourite books are stored in the favourites field of the user document 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
    });
module.exports = router;
