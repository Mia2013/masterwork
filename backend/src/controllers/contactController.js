import { contactService } from '../services/contactService';

export const contactController = {
  async post(req, res, next) {
    try {
      const { message, subject } = req.body;
      const email = req.header('email') || req.body.email;
      const userId = req.header('userId') || '';
      const contact = await contactService.saveMessage(userId, email, message, subject);
      return res.status(200).send(contact);
    } catch (error) {
      return next(error);
    }
  },
};
