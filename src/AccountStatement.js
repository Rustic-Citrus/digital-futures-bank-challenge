import { getMaxStringLength } from "../utils/util.js";

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

    const generateLine = (columns, columnNames, transaction, i) => {
      const cells = new Array();

      // Header is generated first.
      if (i === 0) {
        cells.push("date       ||");

        columnNames.forEach(columnName => {
          const width = columns.find(col => columnName === col.name).width;
    
          // Balance column is handled differently as it is on the end.
          const cell = columnName != "balance" ? ` ${columnName} `.padEnd(width, " ") + "||" : ` ${columnName} `.padEnd(width, " ");
    
          cells.push(cell);
        });

      // Then the body is generated.
      } else {
        cells.push(`${transaction.date} ||`);

        columnNames.forEach(columnName => {
          const width = columns.find(col => columnName === col.name).width;
          let valueString;
          
          if (columnName === "credit" && transaction[columnName] != 0) {
            valueString = `\x1b[32m${transaction[columnName].toFixed(2)}\x1b[0m`;
          } else if (columnName === "debit" && transaction[columnName] != 0) {
            valueString = `\x1b[31m${transaction[columnName].toFixed(2)}\x1b[0m`;
          } else if (columnName === "balance" && transaction[columnName] > 0) {
            valueString = `\x1b[32m${transaction[columnName].toFixed(2)}\x1b[0m`;
          } else if (columnName === "balance" && transaction[columnName] <= 0) {
            valueString = `\x1b[31m${transaction[columnName].toFixed(2)}\x1b[0m`;
          } else {
            valueString = "";
          }
    
          // Again, balance column is handled differently as it is on the end.
          const cell = columnName != "balance" ? ` ${valueString} `.padEnd(width, " ") + "||" : ` ${valueString} `.padEnd(width, " ");
    
          cells.push(cell);
        });
      }

      return cells.join("");
    }

    const columnNames = [ "credit", "debit", "balance" ];
    const columns = createColumns(columnNames);
    const transactions = this.#account.getTransactions().reverse(); // As per user specifications.
    const lines = new Array();

    for (let i = 0; i <= transactions.length; i++) {
      lines.push(generateLine(columns, columnNames, transactions[i-1], i));
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