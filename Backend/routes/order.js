const router = require("express").Router(); // Import express router
const Order = require("../models/order");   // Import Order model
const Book = require("../models/book");     // Import Book model
const User = require("../models/user");     // Import User model
const authenticate = require("./userAuth"); // Import authentication middleware

router.put("/place-order", authenticate, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookId, totalAmount } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create a new order
    const newOrder = new Order({
      user: id,
      books: [bookId],
      totalAmount: totalAmount,
    });

    const savedOrder = await newOrder.save();

    // Update user document
    await User.findByIdAndUpdate(id, {
      $push: { orders: savedOrder._id },
      $pull: { cart: bookId },
    });

    return res.status(200).json({ message: "Order placed successfully", order: savedOrder });

  } catch (error) {
    console.error("Order placement error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



// get orders of a particular user
router.get("/get-order-history", authenticate, async (req, res) => {        
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
      .sort({ createdAt: -1 })
      .populate("user")      // populate the user who placed the order
      .populate("books");    // populate the books in the order

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
router.put("/update-order-status/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
