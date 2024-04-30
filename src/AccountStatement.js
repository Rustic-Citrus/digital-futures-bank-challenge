import { getMaxStringLength, generateRowFromObject } from "../utils/util.js";

export default class AccountStatement {
  #account;

  constructor(accountObject) {
    this.#account = accountObject;
  }

  generateLines() {
    const createColumns = columnNames => {
      const calculateColumnWidths = propertyName => {
        const transactions = this.#account.getTransactions();
        const padding = 2;
  
        const maxLengthWithPadding = getMaxStringLength(transactions, propertyName) + padding; 
        const propertyNameWithPadding = propertyName.length + padding;
    
        if (maxLengthWithPadding > propertyNameWithPadding) {
          return maxLengthWithPadding;
        } else {
          return propertyNameWithPadding;
        }
      }
  
      const columns = new Array();
  
      columnNames.forEach(name => {
        columns.push({ name, width: calculateColumnWidths(name) });
      });
  
      return columns;
    }

    const columnNames = [ "credit", "debit", "balance" ];
    const columns = createColumns(columnNames);
    const transactions = this.#account.getTransactions().reverse(); // As per user specifications.
    const lines = new Array();

    for (let i = 0; i <= transactions.length; i++) {
      lines.push(generateRowFromObject(columns, columnNames, transactions[i-1], i));
    }
    
    return lines;
  }

  printStatement() {
    const lines = this.generateLines();
    
    lines.forEach(line => {
      console.log(line);
    });
  }
}