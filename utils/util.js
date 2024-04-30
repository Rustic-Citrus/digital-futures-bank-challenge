export const getMaxStringLength = (objectArray, property) => {
  let maxStringLength = objectArray[0][property].toFixed(2).length;

  objectArray.forEach(item => {
    if (item[property].toFixed(2).length > maxStringLength) maxStringLength = item[property].toFixed(2).length;
  });

  return maxStringLength;
};

export const generateRowFromObject = (columns, columnNames, object, i) => {
  // Function that generates the rows of the table from the column information and the data provided.
  const cells = new Array();

  // Header is generated first.
  if (i === 0) {
    cells.push("date       ||"); // First cell is always the same in the header.

    columnNames.forEach(columnName => {
      const width = columns.find(col => columnName === col.name).width;

      // Balance column is formatted differently, since it is on the far-right of the table.
      const cell = columnName != "balance" ? ` ${columnName} `.padEnd(width, " ") + "||" : ` ${columnName} `.padEnd(width, " ");

      cells.push(cell);
    });

  // Then the body is generated.
  } else {
    cells.push(`${object.date} ||`); // First cell is always the same in the body.

    columnNames.forEach(columnName => {
      const width = columns.find(col => columnName === col.name).width;

      // Debit values greater than zero and balances less than or equal to zero are shown in red.
      const conditionsForRed = (columnName === "debit" && object[columnName] != 0) || (columnName === "balance" && object[columnName] <= 0);

      // Credit values greater than zero and balances greater than zero are shown in green.
      const conditionsForGreen = (columnName === "credit" && object[columnName] != 0) || (columnName === "balance" && object[columnName] > 0);

      let valueString;

      if (conditionsForGreen) {

        valueString = `\x1b[32m${object[columnName].toFixed(2)}\x1b[0m`; // ASCII escape code for green = "\x1b[32m"

      } else if (conditionsForRed) {

        valueString = `\x1b[31m${object[columnName].toFixed(2)}\x1b[0m`; // ASCII escape code for red = "\x1b[31m"

      } else {

        valueString = "";

      }

      // Balance column is formatted differently, since it is on the far-right of the table.
      const cell = columnName != "balance" ? ` ${valueString} `.padEnd(width, " ") + "||" : ` ${valueString} `.padEnd(width, " ");

      cells.push(cell);
    });
  }

  return cells.join("");
}