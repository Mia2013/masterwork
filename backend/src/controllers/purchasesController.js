import { purchasesService } from '../services';

export const purchasesController = {
  async get(req, res, next) {
    try {
      const userId = req.header('userId');
      const purchases = await purchasesService.getPurchases(userId);
      return res.status(200).json({ purchases });
    } catch (error) {
      return next(error);
    }
  },
};
