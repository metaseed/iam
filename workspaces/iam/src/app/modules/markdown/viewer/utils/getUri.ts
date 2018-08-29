export const getAddr = href => {
  const indexofHash = href.indexOf('#');
  const addr = indexofHash !== -1 ? href.substr(0, indexofHash) : href;
  return addr;
};
