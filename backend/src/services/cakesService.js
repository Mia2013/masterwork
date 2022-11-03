import Cake from '../models/Cake';
import loadData from '../data/cakes';

export const cakesService = {
  async getCakes() {
    const cakes = await Cake.find({});
    if (cakes.length === 0) {
      await Cake.insertMany(loadData);
      const loadCakes = await Cake.find({});
      return loadCakes;
    }
    return cakes;
  },
};
