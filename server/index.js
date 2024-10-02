import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import path from 'path'


import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'
import productRoutes from './routes/products.js'
import auth from './routes/auth.js'
import orderRoutes from './routes/order.js'
import payment from './routes/payment.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


//handle uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`ERROR:${err}`)
    console.log('Shutting down due to uncalled exception')
    process.exit(1)
})


if (process.env.NODE_ENV !=="PRODUCTION") {
    dotenv.config({ path: './config/config.env' })
}



const app = express()
const port = process.env.PORT



app.use(express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
        req.rawBody = buf.toString()
    }
}))
app.use(cookieParser())


//connecting database
connectDatabase();

//all routes 

//this will be /api/v1/products
app.use("/api/v1", productRoutes)
app.use("/api/v1", auth)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", payment)

// console.log('Current NODE_ENV outside the if statement:', process.env.NODE_ENV);
if(process.env.NODE_ENV === "PRODUCTION") { 

    app.use(express.static(path.join(__dirname, "../client/dist")))
    // console.log('Current NODE_ENV under if statement:', process.env.NODE_ENV);
    // console.log("working")
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
    })
}


app.use(errorMiddleware)

const server = app.listen(port, () => {
    console.log(`server is running in port ${port} in ${process.env.NODE_ENV} mode`)
})


//handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error ${err}`)
    console.log(`Shutting down server due to Unhandled Promise Rejection`)
    server.close(() => {
        process.exit(1)
    })
})
