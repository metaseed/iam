export function removeItem<T>(arr: T[], value: T) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
