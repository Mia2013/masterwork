import { orderService } from '../services/orderService';

export const ordersController = {
  async get(req, res, next) {
    try {
      const userId = req.header('userId');
      const orders = await orderService.getOrders(userId);
      return res.status(200).json({ orders });
    } catch (error) {
      return next(error);
    }
  },

  async post(req, res, next) {
    try {
      const { productId, slice } = req.body;
      const userId = req.header('userId');
      const orders = await orderService.addOrder(productId, userId, slice);
      return res.status(200).json({ orders });
    } catch (error) {
      return next(error);
    }
  },
  async delete(req, res, next) {
    const { orderId } = req.params;
    try {
      const confirmation = await orderService.deleteOrder(orderId);
      return res.status(200).json(confirmation);
    } catch (error) {
      return next(error);
    }
  },
  async patch(req, res, next) {
    try {
      const userId = req.header('userId');
      const data = await orderService.buyProducts(userId, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
