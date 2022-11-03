import mongoose from 'mongoose';
import Purchase from '../models/Purchase';
import Cake from '../models/Cake';
import { purchasesService } from './purchasesService';
import 'dotenv/config';

async function createNewCake() {
  const cake = new Cake({
    name: 'Dobostorta',
    price: 550,
    allergenic: 'tojás',
    description: 'Klasszikus Dobos torta',
  });
  await cake.save();

  return cake;
}

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true });
  await createNewCake();
});

afterAll(async () => {
  await Purchase.deleteMany();
  mongoose.connection.close();
});

describe('when I send request', () => {
  test('should respond with an array contains objects', async () => {
    await purchasesService.getPurchases('628cb71c04f2e6575298b02e');
    expect([
      {
        name: 'Dobostorta',
        price: 550,
        allergenic: 'tojás',
        description: 'Klasszikus Dobos torta',
      },
    ]).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Dobostorta' })]));
  });
});
