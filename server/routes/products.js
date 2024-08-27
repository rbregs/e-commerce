import express from 'express';
import { getProducts, newProduct, getProductbyId, updateProduct,deleteProduct } from '../controllers/productcontroller.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/admin/products').post(newProduct);
router.route('/products/:id').get(getProductbyId)
router.route('/products/:id').put(updateProduct)
router.route('/products/:id').delete(deleteProduct)
export default router;
