import AccountStatement from "../src/AccountStatement.js";
import Account from "../src/Account.js";

describe("AccountStatement Class Tests,", () => {
  let testAccountStatement;

  beforeEach(() => {
    const testAccount = new Account();
    testAccount.deposit(1000, "10/01/2012");
    testAccount.deposit(2000, "13/01/2012");
    testAccount.withdraw(500, "14/01/2012");
    testAccountStatement = new AccountStatement(testAccount);
  });

  it("should show the statement in the console in the correct format", () => {
    const expectedLines = [
      "date       || credit  || debit  || balance ",
      "14/01/2012 ||         || 500.00 || 2500.00 ",
      "13/01/2012 || 2000.00 ||        || 3000.00 ",
      "10/01/2012 || 1000.00 ||        || 1000.00 "
    ];

    spyOn(console, "log");

    testAccountStatement.printStatement();

    expect(console.log.calls.count()).toBe(4);

    expectedLines.forEach((string, i) => {
      expect(console.log.calls.argsFor(i)[0]).toEqual(string);
    });
  });
});