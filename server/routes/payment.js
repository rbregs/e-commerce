import express from 'express'
import {isAuthenticatedUser } from '../middlewares/authentication.js'
import { stripeCheckOutSession } from '../controllers/paymentController.js'



const router = express.Router()

router.route('/payment/checkout_session').post(isAuthenticatedUser,stripeCheckOutSession)


export default router