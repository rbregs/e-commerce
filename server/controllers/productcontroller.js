import mongoose from 'mongoose';
import Product from '../models/product.js'

//get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

//get single product
export const getProductbyId = async(req,res) =>{
        const product = await Product.findById(req.params.id)
    
        if(!product) {
            return res.status(400).json({message:"Invalid ID"})
        }

        res.status(200).json({product})


}
// Create a new product
export const newProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
}

//update
export const updateProduct = async (req, res) => {
    try {
    
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: error.message });
    }
};
