import cloneDeep from 'lodash/cloneDeep';

export const getItemsByKeysArr = (keysArr, items) => {
  return keysArr.map((key) => items[key]);
};

export const objWithoutKey = (obj, key) => {
	const newObj = cloneDeep(obj);

	if (Object.keys(newObj).includes(key)) {
		delete newObj[key];
	}
	
	return newObj;
};