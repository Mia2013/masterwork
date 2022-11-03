import mongoose from 'mongoose';
import Purchase from '../models/Purchase';
import Cake from '../models/Cake';
import { purchasesService } from './purchasesService';
import 'dotenv/config';

async function createNewPurchase() {
  const cake = new Cake({
    name: 'Dobostorta',
    price: 550,
    allergenic: 'tojás',
    description: 'Klasszikus Dobos torta',
  });
  await cake.save();

  const purchase = new Purchase({
    userId: '628cb71c04f2e6575298b02e',
    paidDate: '2022-06-14T11:36:31.065+00:00',
    slice: 6,
    productId: cake._id,
    receiptDate: '2022-06-18T11:36:31.065+00:00',
  });

  const newPurchase = await purchase.save();
  return newPurchase;
}

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true });
  await createNewPurchase();
});

afterAll(async () => {
  await Purchase.deleteMany();
  mongoose.connection.close();
});

describe('when I send request with a userId that does not exist in the database', () => {
  test('should respond with an empty array', async () => {
    await purchasesService.getPurchases('628e02f1e4088ee7bc516e78');
    expect([]).toEqual([]);
  });
});

describe('when I send request with a userId that exist in the database', () => {
  test('should respond with an array contains objects', async () => {
    await purchasesService.getPurchases('628cb71c04f2e6575298b02e');
    expect([
      {
        _id: '62797f40599225213ed11123',
        userId: '628cb71c04f2e6575298b02e',
        paidDate: '2022-06-14T11:36:31.065+00:00',
        slice: 6,
        receiptDate: '2022-06-18T11:36:31.065+00:00',
        productId: {
          _id: '62797f40599225213ed16789',
          name: 'Dobos torta',
          price: 550,
          allergenic: 'tojás',
          description: 'Klasszikus Dobos torta',
        },
      },
    ]).toEqual(expect.arrayContaining([expect.objectContaining({ slice: 6 })]));
  });
});
