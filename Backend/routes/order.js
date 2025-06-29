const router = require("express").Router(); // Import express router
const Order = require("../models/order");   // Import Order model
const Book = require("../models/book");     // Import Book model
const User = require("../models/user");     // Import User model
const authenticate = require("./userAuth"); // Import authentication middleware

// place an order
router.put("/place-order", authenticate, async (req, res) => {
  try {
    const { id } = req.headers;      // Get user ID from headers
    const { order } = req.body;      // Get order array from request body

    for (const orderData of order) {
      // Optional: You may verify book exists before placing order
      const book = await Book.findById(orderData._id);
      if (!book) {
        return res.status(404).json({ message: `Book with ID ${orderData._id} not found` });
      }

      // Create a new order
      const newOrder = new Order({
        user: id,
        book: orderData._id,
      });

      const savedOrder = await newOrder.save();

      // Add the new order ID to user's orders
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id }
      });

      // Remove the ordered book from user's cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id }
      });
    }

    return res.status(200).json({ message: "Order(s) placed successfully" });

  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: "Internal server error" });
  }
});

// get orders of a particular user
router.get("/get-order", authenticate, async (req, res) => {        
    try {
        const { id } = req.headers; // Get user ID from headers
        const userData = await User.findById(id).populate({
            path: 'orders', // Populate the orders field
            populate: {path: 'book'} // Populate the book field within orders   
        }); // Find user by ID and populate orders
    const orderData = userData.orders.reverse();
    return res.json({
        status: "success",
        data: orderData, // Return the populated orders
     }) ;// Get the orders from user data
    
    
    } 
    catch (error) {
        console.error(error); // Log the error
           return res.status(500).json({ message: "Something went wrong", error });
    }
    });
  // Get all orders
router.get("/get-all-orders", authenticate, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Sort orders by creation date (newest first)
      .populate({
        path: "book",           // Populate book data in each order
        populate: { path: "user" } // If each book has a user (like uploader), populate that too (optional)
      });

    return res.status(200).json({
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

//update order status by admin
router.put("/update-order-status", authenticate, async (req, res) => {
    try{
        const{id}=req.params; // Get order ID from request parameters
        await Order.findByIdAndUpdate(id,req.body); // Update order status with request body
        return res.status(200).json({message:"Order status updated successfully"}); // Return success message   
    }
    catch(error){
        console.error(error); // Log the error
        return res.status(500).json({ message: "Something went wrong", error });
    }
});
module.exports = router;
