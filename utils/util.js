export const getMaxStringLength = (objectArray, property) => {
  let maxStringLength = objectArray[0][property].toFixed(2).length;

  objectArray.forEach(item => {
    if (item[property].toFixed(2).length > maxStringLength) maxStringLength = item[property].toFixed(2).length;
  });

  return maxStringLength;
};
