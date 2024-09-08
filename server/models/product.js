import mongoose from "mongoose";


const productSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true,'Please Enter Product name'],
        maxLength:[200, 'Product name cannot exceed 200 characters'],
    },

    price: {
        type:Number,
        required:[true,'Please enter product price'],
        maxLength:[6,'Product cannot exceeds 6 digits'],
    },
    description:{
        type:String,
        required:[true,'Please Enter Product name'],
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id: {
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        },
    ],

    category:{
        type:String,
        required:[true,'Please Enter Product category'],
       enum: {
        values:[
            "Skincare",
            "Serum",
            "Sunscreen",
            "Cleanser",
            "Moisturizer",
            "Body",
            "Perfume",
            "Lips",
            "Baby Products"
        ],
        message:'Please select category',
       },
    },
    seller:{
        type:String,
        required:[true,'Please Enter Product seller'],
    },

    stock:{
        type:Number,
        required:[true,'Please Enter Product stock'],
    },
    
    numOfReviews: {
        type:Number,
        default:0,
    },

    reviews: [
      {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,

            },  
            
            rating: {
                type:Number,
                required:true,
            },

            comment: {
                type:String,
                required:true
            }

      },
    ],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
    },
    

},{timestamps:true})

export default mongoose.model('Product',productSchema)