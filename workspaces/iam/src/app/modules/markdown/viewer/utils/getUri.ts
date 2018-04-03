export const getAddr = href => {
  var indexofHash = href.indexOf("#");
  var addr = indexofHash !== -1 ? href.substr(0, indexofHash) : href;
  return addr;
};
