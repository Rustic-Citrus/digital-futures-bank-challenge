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

  calculateColWidths(propertyName) {
    const maxLengthWithSpaces = this.getMaxStringLength(propertyName) + 2;
    const propertyNameWithSpaces = propertyName.length + 2;

    if (maxLengthWithSpaces > propertyNameWithSpaces) {
      return maxLengthWithSpaces;
    } else {
      return propertyNameWithSpaces;
    }
  }

  createCols(colNames) {
    const cols = new Array();

    colNames.forEach(name => {
      cols.push({ name, width: this.calculateColWidths(name) });
    });

    return cols;
  }

  generateHeaderLine(colNames, cols) {
    const cells = [ "date       ||" ];

    colNames.forEach(colName => {
      const findFunc = (col) => {
        return colName === col.name;
      };

      const width = cols.find(findFunc).width;

      const cell = colName != "balance" ? ` ${colName} `.padEnd(width, " ") + "||" : ` ${colName}`.padEnd(width, " ");

      cells.push(cell);
    });

    return cells.join("");
  }

  generateBodyLine(cols, transaction, colNames) {
    const cells = [ `${transaction.date} ||` ];

    colNames.forEach(colName => {
      const findFunc = (col) => {
        return colName === col.name;
      };

      const width = cols.find(findFunc).width;

      let valueString;
      if (colName === "credit" && transaction[colName] != 0) {
        valueString = `\x1b[32m${transaction[colName].toFixed(2)}\x1b[0m`;
      } else if (colName === "debit" && transaction[colName] != 0) {
        valueString = `\x1b[31m${transaction[colName].toFixed(2)}\x1b[0m`;
      } else if (colName === "balance" && transaction[colName] > 0) {
        valueString = `\x1b[32m${transaction[colName].toFixed(2)}\x1b[0m`;
      } else if (colName === "balance" && transaction[colName] <= 0) {
        valueString = `\x1b[31m${transaction[colName].toFixed(2)}\x1b[0m`;
      } else {
        valueString = "";
      }

      const cell = colName != "balance" ? ` ${valueString} `.padEnd(width, " ") + "||" : ` ${valueString}`.padEnd(width, " ");

      cells.push(cell);
    });

    return cells.join("");
  }

  generateLines() {
    const colNames = [ "credit", "debit", "balance" ];
    const cols = this.createCols(colNames);
    const transactions = this.#account.getTransactions().reverse();

    const lines = [ this.generateHeaderLine(colNames, cols) ];

    transactions.forEach(transaction => {
      lines.push(this.generateBodyLine(cols, transaction, colNames));
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