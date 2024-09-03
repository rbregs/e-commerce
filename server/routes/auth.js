
import express from 'express'
import { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getUserDetails, allUser, updateUser, deleteUser } from '../controllers/authController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/authentication.js';

const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

//user
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

//admin
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),allUser)
router.route('/admin/users/:id')
.get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
.put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)


export default router

