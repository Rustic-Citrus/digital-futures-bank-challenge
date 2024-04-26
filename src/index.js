import AccountStatement from "../src/AccountStatement.js";
import Account from "../src/Account.js";

console.log("=== START OF DEMO ===\n")

const account = new Account();

console.log("1) First, a client makes a deposit of 1000 on 10/01/2012.");
account.deposit(1000, "10/01/2012");
console.log(`Current Balance: ${account.getBalance()}`);
console.log(`Number of Transactions: ${account.getTransactions().length}\n`);

console.log("2) Then, she makes a deposit of 2000 on 13/01/2012.");
account.deposit(2000, "13/01/2012");
console.log(`Current Balance: ${account.getBalance()}`);
console.log(`Number of Transactions: ${account.getTransactions().length}\n`);

console.log("3) Next, she makes a withdrawal of 500 on 14/01/2012.");
account.withdraw(500, "14/01/2012");
console.log(`Current Balance: ${account.getBalance()}`);
console.log(`Number of Transactions: ${account.getTransactions().length}\n`);

console.log("4) Finally, she prints her bank statement:\n");
const accountStatement = new AccountStatement(account);
accountStatement.printStatement();

console.log("\n=== END OF DEMO ===");