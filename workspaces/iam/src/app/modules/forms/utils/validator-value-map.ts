import { ValidatorFn } from "@angular/forms";

export function getValueByPath(o: object, propertyPath: string) {
  if (!o) return o;
  if (!propertyPath) return o;
  const paths = propertyPath.split('.');
  paths.forEach(p => o = o[p]);
  return o;
}

/**
 * note: if the o is primitive values( number, boolean, string, null, undefined) but not object, this would not work
 * @param o 
 * @param propertyPath 
 * @param value 
 */
export function setValueByPath(o: object, propertyPath: string, value: any) {
  if (typeof o !== 'object' || null === o || Array.isArray(o)) throw 'setValueByPath: parameter o must be an object';

  const paths = propertyPath.split('.');
  paths.forEach((p, i) => i === paths.length - 1 ? o[p] = value : o = o[p]);
}

/**
 * map common validators from Angular Form package to custom value validators
 * 
 * @param valueMap 
 * string: property path, path example: 'a.b.c' or 'd'
 * function: to map the value to the one that used by Angular Form validators
 * @param funcs a set of common validator functions from Form Package
 * @returns a set of custom validator functions that just validate the property on the property path
 */
export const validatorValueMap = (valueMap, ...funcs: Array<ValidatorFn>) => funcs.map((fn: any) => control => fn(
  { value: ((typeof valueMap === 'string') ? getValueByPath(control.value, valueMap) : valueMap(control.value)) }
))