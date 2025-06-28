const mongoose =require("mongoose");
const orderSchema =new mongoose.Schema({// defining schema for order
    user: {
        type: mongoose.Types.ObjectId, // reference to the user
        ref: "users", // reference to the users collection
        required: true
    },
    books: [{
        type: mongoose.Types.ObjectId, // reference to the books
        ref: "books", // reference to the books collection
        required: true
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "shipped", "delivered", "cancelled"] // defining order status with default value pending
    }
}, { timestamps: true }); // defining timestamps for createdAt and updatedAt  to sorting a order with the help of timestamps
module.exports = mongoose.model("orders", orderSchema); // exporting the model to use in other files
// this model is used to create, read, update and delete orders in the database