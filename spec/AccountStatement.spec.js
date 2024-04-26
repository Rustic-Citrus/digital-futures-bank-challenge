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

  it("should show the statement spread across the correct number of lines", () => {
    spyOn(console, "log");

    testAccountStatement.printStatement();

    expect(console.log.calls.count()).toBe(4);
  });

  it("should show the correct information, formatted correctly, with debits in red and credits in green", () => {
    const expectedLines = [
      "date       || credit  || debit  || balance ",
      "14/01/2012 ||         || \x1b[31m500.00\x1b[0m || 2500.00 ",
      "13/01/2012 || \x1b[32m2000.00\x1b[0m ||        || 3000.00 ",
      "10/01/2012 || \x1b[32m1000.00\x1b[0m ||        || 1000.00 "
    ];

    spyOn(console, "log");

    testAccountStatement.printStatement();

    expectedLines.forEach((string, i) => {
      expect(console.log.calls.argsFor(i)[0]).toEqual(string);
    });
  });
});