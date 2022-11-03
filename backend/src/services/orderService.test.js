import mongoose from 'mongoose';
import Order from '../models/Order';
import { orderService } from './orderService';
import 'dotenv/config';

let expectError;

async function createNewOrder() {
  const order = new Order({
    status: 'pending',
    orderDate: '2022-06-14T11:36:31.065+00:00',
    slice: 6,
    userId: '628cb71c04f2e6575298b02e',
    productId: '628e02f1e4088ee7bc516e86',
  });

  const newOrder = await order.save();
  return newOrder;
}

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true });
  await createNewOrder();
});

afterAll(async () => {
  await Order.deleteMany();
  mongoose.connection.close();
});

describe('when I with a userId that does not exist in the database', () => {
  test('should respond with an empty array', async () => {
    await orderService.getOrders('628e02f1e4088ee7bc516e86');
    expect([]).toEqual([]);
  });
});

describe('when I send userId that exist in the database', () => {
  test('should respond with an array contains objects', async () => {
    await orderService.getOrders('628cb71c04f2e6575298b02e');
    expect([
      {
        status: 'pending',
        orderDate: '2022-06-14T11:36:31.065+00:00',
        slice: 6,
        userId: '628cb71c04f2e6575298b02e',
        productId: '628e02f1e4088ee7bc516e86',
      },
    ]).toEqual(expect.arrayContaining([expect.objectContaining({ slice: 6 })]));
  });
});

describe('when I send request without orderId', () => {
  test('should respond with error message', async () => {
    try {
      await orderService.deleteOrder();
    } catch (e) {
      expectError = e;
    }
    expect(expectError.message).toEqual('Nem található rendelés azonosító');
  });
});

describe('when I send request without data', () => {
  test('should respond with error message', async () => {
    try {
      await orderService.addOrder();
    } catch (e) {
      expectError = e;
    }
    expect(expectError.message).toEqual('Nem található termék azonosító');
  });
});

describe('when I send request without orderId', () => {
  test('should respond with error message', async () => {
    try {
      await orderService.buyProducts();
    } catch (e) {
      expectError = e;
    }
    expect(expectError.message).toEqual('Nem található rendelés');
  });
});
