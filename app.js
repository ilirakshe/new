const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("Running..");
});

const port = process.env.PORT || 5000;
// Server running
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
