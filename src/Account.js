export default class Account {
  #balance = 0;
  #hasRightToOverdraft = false;
  #overdraftLimit;
  #transactions = new Array();

  constructor(overdraftPrivileges) {
    this.#hasRightToOverdraft = overdraftPrivileges;
  }

  getBalance() {
    return this.#balance;
  }

  checkRightToOverdraft() {
    return this.#hasRightToOverdraft;
  }

  deposit(amount, date) {
    if (amount < 0) {
      throw Error("Cannot deposit a negative amount.");
    } else {
      this.#balance += amount;
      const balanceString = this.#balance >= 0 ? `£${this.#balance.toFixed(2)}` : `-£${Math.abs(this.#balance).toFixed(2)}`;
      this.#transactions.push({ amount: `£${amount.toFixed(2)}`, date, balance: balanceString });
    }
  }

  withdraw(amount, date) {
    if (amount > this.#balance && !this.#hasRightToOverdraft) {
      throw Error("Account does not have overdraft limit. Cannot withdraw more than current balance.");
    } else if (amount < 0) {
      throw Error("Cannot withdraw a negative amount.");
    } else if (amount > (this.#balance + this.#overdraftLimit)) {
      throw Error("Overdraft limit exceeded.");
    } else {
      this.#balance -= amount;
      const balanceString = this.#balance >= 0 ? `£${this.#balance.toFixed(2)}` : `-£${Math.abs(this.#balance).toFixed(2)}`;
      this.#transactions.push({ amount: `-£${amount.toFixed(2)}`, date, balance: balanceString });
    }
  }

  setOverdraftLimit(amount) {
    if (this.#hasRightToOverdraft) {
      this.#overdraftLimit = amount;
    }
  }

  getOverdraftLimit() {
    return this.#overdraftLimit;
  }

  getTransactions() {
    return this.#transactions;
  }
}