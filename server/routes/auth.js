
import express from 'express'
import { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getUserDetails, allUser, updateUser, deleteUser, upload } from '../controllers/authController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/authentication.js';

const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

//user
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/me/update_password').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)
router.route('/me/upload_avatar').put(isAuthenticatedUser,upload)

//admin
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),allUser)
router.route('/admin/users/:id')
.get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
.put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)


export default router

