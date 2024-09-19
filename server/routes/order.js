import express from 'express'
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/authentication.js'
import { allOrders, getOrderDetails, getSales, myOrders, newOrder, updateOrder } from '../controllers/orderController.js'
import { validateObjectId } from '../middlewares/iderrors.js'


const router = express.Router()

router.route('/orders/new').post(isAuthenticatedUser,newOrder)
router.route('/orders/:id').get(isAuthenticatedUser,getOrderDetails)
router.route('/me/orders').get(isAuthenticatedUser,myOrders)
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"),allOrders)
router.route('/admin/orders/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
router.route('/admin/get_sales').get(isAuthenticatedUser,authorizeRoles("admin"),getSales)

export default router