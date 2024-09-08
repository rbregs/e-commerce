import mongoose from 'mongoose';
import Product from '../models/product.js'
import ErrorHandler from '../utils/errorHandler.js';
import APIFilters from '../utils/apiFIlter.js';
import catchAssyncErrors from '../middlewares/catchAssyncErrors.js';


//get all products
export const getProducts = catchAssyncErrors (async (req, res, next) => {

        let resPerPage = 4
        const apiFilters = new APIFilters(Product,req.query).search().filters() //serch
        let products =await apiFilters.query
        let filteredProductsCount = products.length


        apiFilters.pagination(resPerPage)
        products = await apiFilters.query.clone()

       
        // const products = await Product.find(); 
        res.status(200).json({
            resPerPage,
            filteredProductsCount,
            products
        })

})

//get single product
export const getProductbyId = catchAssyncErrors (async(req,res,next) =>{

        const product = await Product.findById(req.params.id)

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new ErrorHandler('Invalid ID format', 400));
        }

        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }

        res.status(200).json({product})


})
// Create a new product
export const newProduct = catchAssyncErrors(async (req, res) => {

        req.body.user = req.user._id

        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product created successfully', product });
  
})

//update
export const updateProduct =catchAssyncErrors (async (req, res) => {
   
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json({ product });
   
})

//delete
export const deleteProduct = catchAssyncErrors(async (req, res) => {
   
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });
   
})

//create/update product review  api/v1/reviews
export const createProductReview = catchAssyncErrors(async (req, res, next) => {

    const {rating, comment , productId} = req.body

    const review ={
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    }
   
    const product = await Product.findById(productId);

    if (!product) {
        return next (new ErrorHandler("Product not found", 404))
    }

    const isReviewed = product?.reviews.find(
        (r) => r.user.toString() === req?.user?._id.toString()
    )

    if(isReviewed) {

        product.reviews.forEach((review) => {
            if(review?.user?.toString() === req?.user?._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    }
    else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    // -------
    product.ratings =  product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({success: true });

})
// get product reviews
export const getProductReviews = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next (new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({reviews: product.reviews})
})


//delete product review  api/v1/admin/reviews
export const deleteReview = catchAssyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product?.reviews?.filter(
      (review) => review._id.toString() !== req?.query?.id.toString()
    );
  
    const numOfReviews = reviews.length;
  
    const ratings =
      numOfReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          numOfReviews;
  
    product = await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, numOfReviews, ratings },
      { new: true }
    );
  
    res.status(200).json({
      success: true,
      product,
    });
  });