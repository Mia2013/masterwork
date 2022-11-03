import Purchase from '../models/Purchase';

export const purchasesService = {
  async getPurchases(userId) {
    const purchases = await Purchase.find({ userId }).populate(
      'productId',
    );
    return purchases;
  },
};
