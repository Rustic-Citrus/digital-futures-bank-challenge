export const getMaxStringLength = (array, property) => {
  let maxStringLength = array[0][property].toFixed(2).length;

  array.forEach(item => {
    if (item[property].toFixed(2).length > maxStringLength) maxStringLength = item[property].toFixed(2).length;
  });

  return maxStringLength;
};
