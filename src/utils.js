export const isSubstring = (str, substr) => {
  return str
    .toString()
    .toUpperCase()
    .includes(substr.toString().toUpperCase());
};


export const isEqualString = (str1, str2) => {
  return str1.toString().toUpperCase() === str2.toString().toUpperCase();
};

const ASSET_MAX_LENGTH = 5;
export const checkTypingReachAssetMaxLength = (val) => {
  return val.toString().length === ASSET_MAX_LENGTH;
};