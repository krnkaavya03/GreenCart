import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)

export default orderRouter;