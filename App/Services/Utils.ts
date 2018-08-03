export const getItemsByKeysArr = (keysArr, items) => {
    return keysArr.map((key) => items[key]);
};