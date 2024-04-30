import { getMaxStringLength, generateRowFromObject } from "../utils/util.js";

export default class AccountStatement {
  #account;

  constructor(accountObject) {
    this.#account = accountObject;
  }

  generateRows() {
    const createColumns = columnNames => {
      // Nested function that generates the info about the columns.

      const calculateColumnWidths = propertyName => {
        // Doubly-nested function that calculates the string length for each column.
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

    // Prepare data to generate the rows.
    const columnNames = [ "credit", "debit", "balance" ];
    const columns = createColumns(columnNames);
    const transactions = this.#account.getTransactions().reverse(); // As per user specifications.
    const rows = new Array();

    // Generate the rows from the data.
    for (let i = 0; i <= transactions.length; i++) {
      rows.push(generateRowFromObject(columns, columnNames, transactions[i-1], i));
    }
    
    return rows;
  }

  printStatement() {
    const rows = this.generateRows();
    
    rows.forEach(line => {
      console.log(line);
    });
  }
}