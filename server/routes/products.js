import express from 'express';
import { getProducts, newProduct, getProductbyId, updateProduct,deleteProduct, createProductReview, getProductReviews, deleteReview, canUserReview, getAdminProduct, uploadProductImage, deleteProductImage } from '../controllers/productcontroller.js';
import { validateObjectId } from '../middlewares/iderrors.js';
import  { isAuthenticatedUser,authorizeRoles }  from '../middlewares/authentication.js'

const router = express.Router();
// isAuthenticatedUser,
router.route('/products').get( getProducts);
router.route('/products/:id').get(validateObjectId,getProductbyId)

router.route('/admin/products/:id').delete(validateObjectId,isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)
router.route('/admin/product/new').post( isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/admin/products/:id').put(validateObjectId,isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
router.route('/admin/products')

.get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProduct)

router.route('/reviews')
.put(isAuthenticatedUser,createProductReview)
.get(isAuthenticatedUser,getProductReviews)


router.route('/admin/reviews')
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview)



router.route('/can_review')
.get(isAuthenticatedUser,canUserReview)


router.route('/admin/products/:id/upload_images').put( isAuthenticatedUser,authorizeRoles('admin'),uploadProductImage);
router.route('/admin/products/:id/delete_images').put( isAuthenticatedUser,authorizeRoles('admin'),deleteProductImage);
export default router;
