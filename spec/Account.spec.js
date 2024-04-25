import Account from "../src/Account.js";

describe("Account Class Tests,", () => {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  afterEach(() => {
    testAccount = undefined;
  });

  describe("Account.deposit() Tests,", () => {
    it("should update the balance of the account if an amount is deposited", () => {
      testAccount.deposit(100);

      expect(testAccount.getBalance()).toBe(100);
    });

    it("should raise an error if the user tries to deposit a negative amount", () => {
      const testFunc = () => {
        testAccount.deposit(-50);
      }

      expect(testFunc).toThrowError(Error, "Cannot deposit a negative amount.");
    });

  });

  describe("Account.withdraw() Tests,", () => {
    it("should update the balance if an amount is withdrawn", () => {
      testAccount.deposit(100);

      testAccount.withdraw(50);

      expect(testAccount.getBalance()).toBe(50);
    });

    it("should raise an error if an account without an overdraft limit tries to withdraw an amount that is greater than its balance", () => {
      const testFunc = () => {
        testAccount.withdraw(50);
      };

      expect(testFunc).toThrowError(Error, "Account does not have overdraft limit. Cannot withdraw more than current balance.");
    });

    it("should raise an error if an account tries to withdraw a negative amount", () => {
      const testFunc = () => {
        testAccount.withdraw(-50);
      };

      expect(testFunc).toThrowError(Error, "Cannot withdraw a negative amount.");
    });

    it("should withdraw funds from an account if an account with an overdraft attempts to make a withdrawal and the amount is less than or equal to the sum of that account's balance and overdraft limit", () => {
      testAccount = new Account(true);
      testAccount.deposit(50);
      testAccount.setOverdraftLimit(25);

      const testFunc = () => {
        testAccount.withdraw(75);
      };

      expect(testFunc).not.toThrowError();
      expect(testAccount.getBalance() + testAccount.getOverdraftLimit()).toBe(0);
    });
  });

  describe("Account.setOverdraftLimit() Tests,", () => {
    it("should update the account's overdraft limit if the account has the right to an overdraft", () => {
      testAccount = undefined;
      testAccount = new Account(true);

      testAccount.setOverdraftLimit(50);

      expect(testAccount.getOverdraftLimit()).toBe(50);
    });
  });
});