import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopit-v2");

    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);  // Fix the typo here
    console.log("Products are Inserted");
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
