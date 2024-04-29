import AccountStatement from "../src/AccountStatement.js";
import Account from "../src/Account.js";

const getStats = (accountObject) => {
  console.log(`\x1b[33mCurrent Balance\x1b[0m: ${accountObject.getBalance()}`);
  console.log(`\x1b[33mNumber of Transactions\x1b[0m: ${accountObject.getTransactions().length}\n`);
};

console.log("=== \x1b[33mSTART OF DEMO\x1b[0m ===\n")

const account = new Account();

console.log("1) First, a client makes a deposit of 1000 on 10/01/2012.");
account.deposit(1000, "10/01/2012");
getStats(account);

console.log("2) Then, she makes a deposit of 2000 on 13/01/2012.");
account.deposit(2000, "13/01/2012");
getStats(account);

console.log("3) Next, she makes a withdrawal of 500 on 14/01/2012.");
account.withdraw(500, "14/01/2012");
getStats(account);

console.log("4) Finally, she prints her bank statement:\n");
const accountStatement = new AccountStatement(account);
accountStatement.printStatement();

console.log("\n=== \x1b[33mEND OF DEMO\x1b[0m ===");