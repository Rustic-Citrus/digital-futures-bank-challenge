export default class AccountStatement {
  #account;

  constructor(accountObject) {
    this.#account = accountObject;
  }

  getMaxStringLength(property) {
    const transactions = this.#account.getTransactions();

    let maxStringLength = transactions[0][property].toFixed(2).length;

    transactions.forEach(transaction => {
      if (transaction[property].toFixed(2).length > maxStringLength) maxStringLength = transaction[property].toFixed(2).length;
    });

    return maxStringLength;
  }

  calculateColumnWidths(propertyName) {
    const maxLengthWithSpaces = this.getMaxStringLength(propertyName) + 2;
    const propertyNameWithSpaces = propertyName.length + 2;

    if (maxLengthWithSpaces > propertyNameWithSpaces) {
      return maxLengthWithSpaces;
    } else {
      return propertyNameWithSpaces;
    }
  }

  createColumns(columnNames) {
    const columns = new Array();

    columnNames.forEach(name => {
      columns.push({ name, width: this.calculateColumnWidths(name) });
    });

    return columns;
  }

  generateHeaderLine(columnNames, columns) {
    const cells = [ "date       ||" ];

    columnNames.forEach(columnName => {
      const width = columns.find((col) => columnName === col.name).width;

      const cell = columnName != "balance" ? ` ${columnName} `.padEnd(width, " ") + "||" : ` ${columnName}`.padEnd(width, " ");

      cells.push(cell);
    });

    return cells.join("");
  }

  generateBodyLine(columns, transaction, columnNames) {
    const cells = [ `${transaction.date} ||` ];

    columnNames.forEach(columnName => {
      const width = columns.find((col) => columnName === col.name).width;

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

      const cell = columnName != "balance" ? ` ${valueString} `.padEnd(width, " ") + "||" : ` ${valueString} `.padEnd(width, " ");

      cells.push(cell);
    });

    return cells.join("");
  }

  generateLines() {
    const columnNames = [ "credit", "debit", "balance" ];
    const columns = this.createColumns(columnNames);
    const transactions = this.#account.getTransactions().reverse();

    const lines = [ this.generateHeaderLine(columnNames, columns) ];

    transactions.forEach(transaction => {
      lines.push(this.generateBodyLine(columns, transaction, columnNames));
    });
    
    return lines;
  }

  printStatement() {
    const lines = this.generateLines();
    
    lines.forEach(line => {
      console.log(line);
    });
  }
}