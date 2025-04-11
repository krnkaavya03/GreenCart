import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList, rateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

// Route to add a product (requires authentication for sellers)
productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);

// Route to get the list of products
productRouter.get('/list', productList);

// Route to get a single product by ID (dynamic route parameter)
productRouter.get('/id/:id', productById);

// Route to change the stock status of a product (requires authentication for sellers)
productRouter.post('/stock', authSeller, changeStock);

// Route to rate a product (add reviews with rating and comment)
productRouter.post('/rate', rateProduct);

export default productRouter;