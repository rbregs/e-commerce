import express from 'express'
import dotenv from 'dotenv'


import { connectDatabase } from './config/dbConnect.js'



dotenv.config({path:'./config/config.env'})
const app = express()
const port = process.env.PORT 

app.use(express.json())

//connecting database
connectDatabase();


//all routes 
import productRoutes from './routes/products.js'
//this will be /api/v1/products
app.use("/api/v1",productRoutes)

app.listen(port,() => {
    console.log(`server is running in port ${port} in ${process.env.NODE_ENV} mode`)
})

