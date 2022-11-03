import ApiError from '../error/ApiError';
import Contact from '../models/Contact';
import { contactValidation } from '../validation/contactValidation';

export const contactService = {
  async saveMessage(userId, email, message, subject) {
    if (!message || !subject || !email) {
      throw new ApiError(401, 'A mezők kitöltése kötelező');
    }

    const { error } = contactValidation({ email, message, subject });
    if (error) throw new ApiError(400, error.details[0].message);

    const contactItem = new Contact({
      email,
      message,
      subject,
      userId,
      sendDate: new Date(),
    });
    await contactItem.save();

    return { message: 'Üzenet elküldve' };
  },
};
