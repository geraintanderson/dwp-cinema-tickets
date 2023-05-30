import InvalidPurchaseException from '../../../src/pairtest/lib/InvalidPurchaseException.js';

describe('InvalidPurchaseException', () => {
  it('creates an InvalidPurchaseException error', () => {
    const error = new InvalidPurchaseException('Invalid purchase message');
    expect(error).toBeInstanceOf(InvalidPurchaseException);
    expect(error.message).toBe('Invalid purchase message');
    expect(error.name).toBe('InvalidPurchaseException');
  });
});
