import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

/**
 * @description declare an variable for the expression in the template.
 *  if you evaluate several times for the same expression , then try to assign it a variable.
 * @goal
 *  because the expression is just evaluated one time in every change detection cycle,
 *  it improved performance and make the template code easier to read and maintain.
 * @otherwise
 *  in component's typescript code, declare the variable, and in ngDoCheck update the variable, in template use the variable.
 *  this also evaluate the expression one time in every change detection cycle:
 *  note: ngDoCheck is triggered after @input property is set and ngOnChanges,
 *        used to detect additional changes (is the purpose here),
 *        then the View(template) update would use the updated variable,
 *        ngAfterViewCheck is triggered after every element in the view has run the change detection
 * @example
 * <div *var="false as variable">
 *       <span>{{variable | json}}</span>
 * </div>
 * or
 *
 * <div *var="false; let variable">
 *     <span>{{variable | json}}</span>
 * </div>
 * or
 *
 * <div *var="45 as variable">
 *     <span>{{variable | json}}</span>
 * </div>
 * or
 *
 * <div *var="{ x: expression } as variable">
 *     <span>{{variable | json}}</span>
 * </div>
 */
@Directive({
  selector: '[var]',
})
export class VarDirective {

  private context: {
      $implicit: unknown;
      var: unknown;
  } = {
      $implicit: undefined,
      var: undefined,
  };

  private hasView = false;

  @Input()
  public set var(context: unknown) {
      this.context.$implicit = context;
      this.context.var = context;

      if (!this.hasView) {
          this.vcRef.createEmbeddedView(this.templateRef, this.context);
          this.hasView = true;
      }
  }

  constructor(
      private templateRef: TemplateRef<any>,
      private vcRef: ViewContainerRef,
  ) {}
}
