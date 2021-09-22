 /**
 * function to dynamic fill the string template.
 * 
 * @example 1:
 *  T`${0} says that ${1} is ${'firstName'} ${'lastName'}. --${0}`('Tom','my friend',{firstName:'Jz', lastName:'Song'})
 * 
 *  output:  'Tom says that my friend is Jz Song. --Tom'
 * 
 * @example 2:
 *  const errorMsgTemplate = T`min value is ${'min'}, but the current value is ${'actual'}!`;
 *  const errMsg = errorMsgTemplate({min: 0, actual: 1024});
 * 
 *  output: 'min value is 0, but the current value is 1024!'
 * 
 * @param strings 
 * @param keys 
 * @returns 
 */
export function T(strings, ...keys) {
  return (function(...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function(key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}