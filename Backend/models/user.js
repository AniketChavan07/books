const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({// defining schema for user

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
         required: true
    },
    avatar: {
        type: String,
         default: "https://www.w3schools.com/howto/img_avatar.png"
    },
    role: {
        type: String,
        default: "user",
        enum : ["user", "admin"],// defining role with default value user and admin
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,// defining favorites as an array of ObjectId
        ref: "books" // reference to the books collection
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,// defining cart as an array of ObjectId
        ref: "books" // reference to the books collection
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,// defining orders as an array of ObjectId
        ref: "orders" // reference to the orders collection
    }]
}, { timestamps: true });// defining timestamps for createdAt and updatedAt
module.exports = mongoose.model("users",userSchema);// exporting the user model
// this will create a collection named users in the database