export const validateAccountId = (accountId) => {
  if (!Number.isInteger(accountId)) {
    throw new TypeError('accountId must be an integer');
  }

  if (accountId <= 0) {
    throw new TypeError('accountId must be greater than 0');
  }

  return true;
};
