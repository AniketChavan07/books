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
app.use("/api/v1", user);
app.use("/api/v1", Books);



// Server
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
