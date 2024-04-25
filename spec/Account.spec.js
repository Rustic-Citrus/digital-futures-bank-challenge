import Account from "../src/Account.js";

describe("Account Class Tests, ", () => {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  afterEach(() => {
    testAccount = undefined;
  });

  describe("Account.deposit() Tests, ", () => {
    it("should update the balance of the account if an amount is deposited.", () => {
      testAccount.deposit(100);

      expect(testAccount.getBalance()).toBe(100);
    });

    it("should raise an error if the user tries to deposit a negative amount.", () => {
      testAccount.deposit(-50);

      expect(testAccount.deposit).toThrowError(Error, "Cannot deposit a negative amount.");
    });
  });
});