export default class Account {
  #balance = 0;
  #hasRightToOverdraft = false;
  #overdraftLimit;

  constructor(overdraftPrivileges) {
    this.#hasRightToOverdraft = overdraftPrivileges;
  }

  getBalance() {
    return this.#balance;
  }

  checkRightToOverdraft() {
    return this.#hasRightToOverdraft;
  }

  deposit(amount) {
    if (amount < 0) {
      throw Error("Cannot deposit a negative amount.");
    } else {
      this.#balance += amount;
    }
  }

  withdraw(amount) {
    if (amount > this.#balance && !this.#hasRightToOverdraft) {
      throw Error("Account does not have overdraft limit. Cannot withdraw more than current balance.");
    } else if (amount < 0) {
      throw Error("Cannot withdraw a negative amount.");
    } else if (amount > (this.#balance + this.#overdraftLimit)) {
      throw Error("Overdraft limit exceeded.");
    } else {
      this.#balance -= amount;
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
}