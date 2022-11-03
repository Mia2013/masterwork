import { contactService } from './contactService';

describe('when the data is missing', () => {
  let expectError = '';
  test('should respond with a status code of 400', async () => {
    try {
      await contactService.saveMessage();
    } catch (error) {
      expectError = error;
    }
    expect(expectError.status).toEqual(401);
  });
});
