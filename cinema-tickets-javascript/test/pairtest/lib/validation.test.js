import { validateAccountId } from '../../../src/pairtest/lib/validation.js';

describe('validation', () => {
  describe('validateAccountID', () => {
    it('should throw an error if the account ID is a string', () => {
      expect(() => {
        const accountId = 'XYZ';
        validateAccountId(accountId);
      }).toThrow(new TypeError('accountId must be an integer'));
    });

    it('should throw an error if the account ID is too small', () => {
      expect(() => {
        const accountId = 0;
        validateAccountId(accountId);
      }).toThrow(new TypeError('accountId must be greater than 0'));
    });

    it('should return true if the accountId is valid', () => {
      const accountId = 1;
      const isValid = validateAccountId(accountId);
      expect(isValid).toBe(true);
    });
  });
});
