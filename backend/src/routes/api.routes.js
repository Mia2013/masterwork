import express from 'express';
import cors from 'cors';
import {
  registerController,
  loginController,
  userController,
  ordersController,
  cakesController,
  purchasesController,
  contactController,
} from '../controllers';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/cakes', cakesController.get);

router.post('/register', registerController.post);
router.post('/login', loginController.post);
router.patch('/users', authorization, userController.patch);

router.post('/contact/:email', contactController.post);
router.post('/contact', authorization, contactController.post);

router.get('/orders', authorization, ordersController.get);
router.post('/orders', authorization, ordersController.post);
router.delete('/orders/:orderId', authorization, ordersController.delete);
router.patch('/orders', authorization, ordersController.patch);

router.get('/purchases', authorization, purchasesController.get);

export default router;
