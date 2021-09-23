export const getAddr = href => {
  const hashIndex = href.indexOf("#");
  const addr = hashIndex !== -1 ? href.substr(0, hashIndex) : href;
  return addr;
};
