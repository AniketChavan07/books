const express = require("express");
const app = express();
require("dotenv").config();

// Middlewares
app.use(express.json()); //  Parse JSON request body

// DB Connection
require("./conn/conn");

// Routes
const user = require("./routes/user");
const Books = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", order);



// Server
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
