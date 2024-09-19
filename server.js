const express = require ("express")
const mongoose = require ("mongoose")
app.set("view engine", "ejs");

// Initialize Express app
const app = express();
app.use(express.static('public'));




const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});