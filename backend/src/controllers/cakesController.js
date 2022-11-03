import { cakesService } from '../services';

export const cakesController = {
  async get(req, res, next) {
    try {
      const cakes = await cakesService.getCakes();
      return res.status(200).json({ cakes });
    } catch (error) {
      return next(error);
    }
  },
};
