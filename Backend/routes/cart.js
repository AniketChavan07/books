const router = require("express").Router();
const User = require("../models/user");
const authenticate = require("./userAuth");
//put book to cart
router.put("/add-book-cart",authenticate,async(req,res)=>{
    try{
        const {bookid,id}= req.headers; // Get book ID and user ID from headers
        const userData = await User.findById(id);    // Find user by ID
        const isBookInCart = userData.cart.includes(bookid);// Check if the book is already in cart
        if(isBookInCart){
            return res.status(200).json({message:"Book is already in cart"});
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}}); // Add book ID to user's cart
        return res.status(200).json({message:"Book added to cart successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
})
// delete book in a cart
router.put("/delete-book-cart/:bookid",authenticate,async(req,res)=>{
    try{
        const {bookid}= req.params; // Get book ID from request parameters
        const {id}= req.headers; // Get user ID from headers

            
            await User.findByIdAndUpdate(id,{$pull:{cart:bookid}}); 
        
        return res.status(200).json({message:"Book Delete to cart successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
})
// get a cart book of a particular user
router.get("/get-cart-book", authenticate, async (req, res) => {    
    
    try {
        const {id} = req.headers; // Get user ID from headers
        const userData = await User.findById(id).populate("cart"); // Find user by ID and populate cart book details
        // The populate() method is used to replace the specified path in the document with the documents from the referenced collection.
        // In this case, it replaces the "cart" field with the actual book documents from the "books" collection.
        // This allows you to retrieve the full book details instead of just the book IDs stored in the "cart" array.
        // If the user is not found, it returns a 404 status with an error message
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({message:"Cart book fetched successfully", cart:userData.cart});// fetches the user's cart books and returns them in the response cart array and cart books are stored in the cart field of the user document 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});
module.exports=router;