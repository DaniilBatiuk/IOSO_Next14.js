export const removeItemFromArray = (array: string[], itemToRemove: string) => {
  const indexToRemove = array.indexOf(itemToRemove);

  if (indexToRemove !== -1) {
    array.splice(indexToRemove, 1);
  }

  return array;
};
