/**
 * get host component of directive
 * @param viewContainerRef injected ViewContainerRef of the directive
 * @returns component instance
 */
export function getComponent<T>(viewContainerRef): T | null {
  const index = viewContainerRef._hostTNode.directiveStart;
  const component = viewContainerRef._hostLView[index];
  return component;
}
/**
 * get @input() or @output() metadata of directive or component
 * @param directiveOrComponentInstance 
 * @returns 
 */
export function getDirectiveMetadata(directiveOrComponentInstance: any){
  let meta = directiveOrComponentInstance.constructor.ɵcmp || directiveOrComponentInstance.constructor.ɵdir;
  return {inputs:meta.inputs, outputs: meta.outputs};
}