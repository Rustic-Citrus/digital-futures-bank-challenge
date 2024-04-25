# Domain Models and Test Plan

**Author**: Harry Stuart Curtis

**Date Added**: 2024-04-25

**Last Updated**: 2024-04-25

## List of Contents

- [Domain Models and Test Plan](#domain-models-and-test-plan)
  - [List of Contents](#list-of-contents)
  - [Functionality](#functionality)
  - [User Stories](#user-stories)
    - [A function that deposits a specific amount into an account.](#a-function-that-deposits-a-specific-amount-into-an-account)
    - [A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.](#a-function-that-withdraws-a-specific-amount-from-the-account-if-the-value-of-the-withdrawal-is-less-than-the-balance-of-the-account-or-the-value-of-the-withdrawal-is-less-than-the-sum-of-the-value-of-the-overdraft-and-the-balance-of-the-account)
    - [A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.](#a-function-that-adds-an-overdraft-to-the-account-which-takes-a-number-as-an-argument-if-the-account-has-the-right-to-an-overdraft)
    - [A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.](#a-function-that-prints-to-the-console-the-date-and-amount-of-each-transaction-as-well-as-the-new-balance-after-the-transaction-in-a-suitably-formatted-table-with-debits-shown-in-red-and-credits-shown-in-green)
  - [Domain Models](#domain-models)
    - [A function that deposits a specific amount into an account.](#a-function-that-deposits-a-specific-amount-into-an-account-1)
    - [A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.](#a-function-that-withdraws-a-specific-amount-from-the-account-if-the-value-of-the-withdrawal-is-less-than-the-balance-of-the-account-or-the-value-of-the-withdrawal-is-less-than-the-sum-of-the-value-of-the-overdraft-and-the-balance-of-the-account-1)
    - [A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.](#a-function-that-adds-an-overdraft-to-the-account-which-takes-a-number-as-an-argument-if-the-account-has-the-right-to-an-overdraft-1)
    - [A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.](#a-function-that-prints-to-the-console-the-date-and-amount-of-each-transaction-as-well-as-the-new-balance-after-the-transaction-in-a-suitably-formatted-table-with-debits-shown-in-red-and-credits-shown-in-green-1)
    - [Summary](#summary)
  - [Test Cases](#test-cases)
    - [A function that deposits a specific amount into an account.](#a-function-that-deposits-a-specific-amount-into-an-account-2)
    - [A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.](#a-function-that-withdraws-a-specific-amount-from-the-account-if-the-value-of-the-withdrawal-is-less-than-the-balance-of-the-account-or-the-value-of-the-withdrawal-is-less-than-the-sum-of-the-value-of-the-overdraft-and-the-balance-of-the-account-2)
    - [A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.](#a-function-that-adds-an-overdraft-to-the-account-which-takes-a-number-as-an-argument-if-the-account-has-the-right-to-an-overdraft-2)
    - [A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.](#a-function-that-prints-to-the-console-the-date-and-amount-of-each-transaction-as-well-as-the-new-balance-after-the-transaction-in-a-suitably-formatted-table-with-debits-shown-in-red-and-credits-shown-in-green-2)

## Functionality

1. A function that deposits a specific amount into an account.
2. A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.
3. A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.
4. A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.

## User Stories

### A function that deposits a specific amount into an account.

- As a banking company, I want to be able to add money to an account with the program, so that I can automate my banking operations.
- As a hacker, I want to try and deposit a negative amount to an account, so that I can circumvent the withdrawal operation and attempt to bypass the balance and overdraft limitations.

### A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.

- As a banking company, I want to be able to make withdrawals from an account with the program, so that I can automate my banking operations.
- As a hacker, I want to be able to make withdrawals of any amount from an account, so that I can break the bank's systems.
- As a hacker, I want to be able to make negative withdrawals from an account, so that I can give myself funds that I don't actually have.

### A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.

- As a banking company, I want to allow some account holders to withdraw more than their balance, so that they can pay for their bills in an emergency or if there is an unplanned expense.

### A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.

- As a bank manager, I want to be able to see a statement of the transactions for an account, so that I can get an idea of how the account holder uses our banking system.
- As a bank manager, I want to be able to see the debits in red and the credits in green, so that I can get a quicker impression of the nature of each transaction.

## Domain Models

### A function that deposits a specific amount into an account.

| Object    | Property                   | Message                | Output |
| --------- | -------------------------- | ---------------------- | ------ |
| `Account` | `Account.#balance` @Number | `Account.deposit(num)` |        |

### A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.

| Object    | Property                          | Message                       | Output  |
| --------- | --------------------------------- | ----------------------------- | ------- |
| `Account` | `Account.#balance` @Number        | `Account.withdraw(num)`       |         |
|           | `Account.#overdraftLimit` @Number | `Account.getBalance()`        | @Number |
|           |                                   | `Account.getOverdraftLimit()` | @Number |

### A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.

| Object             | Property | Message                             | Output |
| ------------------ | -------- | ----------------------------------- | ------ |
| `AccountStatement` |          | `AccountStatement.printStatement()` |        |

### A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.

| Object    | Property                                | Message                           | Output   |
| --------- | --------------------------------------- | --------------------------------- | -------- |
| `Account` | `Account.#hasRightToOverdraft` @Boolean | `Account.checkRightToOverdraft()` | @Boolean |

### Summary

| Object             | Property                                | Message                            | Output   |
| ------------------ | --------------------------------------- | ---------------------------------- | -------- |
| `Account`          | `Account.#balance` @Number              | `Account.getBalance()`             | @Number  |
|                    |                                         | `Account.deposit(num)`             |          |
|                    |                                         | `Account.withdraw(num)`            |          |
|                    | `Account.#hasRightToOverdraft` @Boolean | `Account.checkRightToOverdraft()`  | @Boolean |
|                    | `Account.#overdraftLimit` @Number       | `Account.getOverdraftLimit()`      | @Number  |
| `AccountStatement` |                                         | `AccountStatement.printStatement()` |          |

## Test Cases

### A function that deposits a specific amount into an account.

* [X] It should update the balance of the account *if* an amount is deposited.
* [X] It should raise an error *if* the user tries to deposit a negative amount.

### A function that withdraws a specific amount from the account *if* the value of the withdrawal is less than the balance of the account *or* the value of the withdrawal is less than the sum of the value of the overdraft and the balance of the account.

* [X] It should update the balance *if* an amount is withdrawn.
* [ ] It should withdraw funds from an account *if* the amount is positive *and* the amount is less than the balance.
* [X] It should raise an error *if* an account without an overdraft limit tries to withdraw an amount that is greater than its balance.
* [ ] It should raise an error *if* an account tries to withdraw a negative amount.

### A function that adds an overdraft to the account, which takes a number as an argument, *if* the account has the right to an overdraft.

* [ ] It should not update the account's overdraft limit *if* the account does not have the right to an overdraft.
* [ ] It should update the account's overdraft limit.
* [ ] It should withdraw funds from an account *if* an account with an overdraft attempts to make a withdrawal *and* the amount is *less than or equal to* the sum of that account's balance and overdraft limit.
* [ ] It should raise an error *if* an account with an overdraft limit tries to withdraw funds *and* the amount is *greater than* the sum of that account's balance and overdraft limit.

### A function that prints to the console the date and amount of each transaction, as well as the new balance after the transaction, in a suitably formatted table, with debits shown in red and credits shown in green.

* [ ] It should show the statement in the console in the correct format.
* [ ] It should show the debits in red and the credits in green.