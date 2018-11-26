export const isSubstring = (str, substr) => {
  return str
    .toString()
    .toUpperCase()
    .includes(substr.toString().toUpperCase());
};


export const isEqualString = (str1, str2) => {
  return str1.toString().toUpperCase() === str2.toString().toUpperCase();
};