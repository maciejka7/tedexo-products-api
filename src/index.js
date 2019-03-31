const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

const DB_USER = "dbuser";
const DB_PASS = "123456qwerty";

// Connection URL
const url = `mongodb://${DB_USER}:${DB_PASS}@ds121996.mlab.com:21996/tedexo-frameworks`;
mongoose.connect(url);

const schema = new mongoose.Schema({
  name: String,
  img_url: String,
  type: String,
  rent_price: Number
});

let Products = mongoose.model("Product", schema);

function getProducts(cb) {
  Products.find({}).exec(function(err, product) {
    if (err) {
      cb(err);
    } else {
      cb(null, product);
    }
  });
}

app.get("/", (req, res) => {
  res.send("welcome to test api");
});

app.get("/api/products", (req, res) => {
  getProducts(function(err, product) {
    res.json({
      products: err ? [] : product
    });
  });
});

app.listen(port, () => {
  console.log(`App listing on port ${port}`);
});
