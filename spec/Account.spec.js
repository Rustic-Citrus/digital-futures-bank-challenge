import Account from "../src/Account.js";

describe("Account Class Tests, ", () => {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  afterEach(() => {
    testAccount = undefined;
  })

  describe("Account.deposit() Tests, ", () => {
    it("should update the balance of the account if an amount is deposited.", () => {
      testAccount.deposit(100);

      expect(testAccount.getBalance()).toBe(100);
    })
  })
})