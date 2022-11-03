import Order from '../models/Order';
import ApiError from '../error/ApiError';
import Cake from '../models/Cake';
import Purchase from '../models/Purchase';

export const orderService = {
  async getOrders(userId) {
    const orders = await Order.find({ userId, status: 'pending' }).populate(
      'productId',
    );
    return orders;
  },
  async addOrder(productId, userId, slice) {
    if (!productId) {
      throw new ApiError(401, 'Nem található termék azonosító');
    }
    const cake = await Cake.findById(productId);

    if (!cake) {
      throw new ApiError(401, 'A termék nem létezik');
    }

    const cartItem = new Order({
      status: 'pending',
      orderDate: new Date(),
      slice,
      userId,
      productId: cake._id,
    });
    await cartItem.save();

    return cartItem;
  },
  async deleteOrder(orderId) {
    if (!orderId) {
      throw new ApiError(401, 'Nem található rendelés azonosító');
    }
    await Order.deleteOne({ _id: orderId });
    return { confirmation: 'Termék törölve' };
  },
  async buyProducts(userId, reqBody) {
    if (!userId) {
      throw new ApiError(401, 'Nem található rendelés');
    }

    const pendingOrders = await Order.find({ userId, status: 'pending' });
    if (!pendingOrders.length) throw new ApiError(400, 'A kosár üres');

    await Order.updateMany({ userId, status: 'pending' }, { status: 'paid' });

    const purchases = pendingOrders.map(
      (order) => new Purchase({
        userId: order.userId,
        paidDate: new Date(),
        productId: order.productId,
        slice: order.slice,
        receiptDate: reqBody.receiptDate,
      }),
    );
    await Purchase.insertMany(purchases);
    return { purchases };
  },
};
