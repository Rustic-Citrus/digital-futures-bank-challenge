export default class Account {
  #balance = 0;

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount < 0) {
      throw Error("Cannot deposit a negative amount.");
    } else {
      this.#balance += amount;
    }
  }
}