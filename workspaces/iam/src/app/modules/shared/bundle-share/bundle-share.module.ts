import { NgModule } from '@angular/core';
import { SearchModule } from './components/search/search.module';
import { ScrollHideModule } from './directives/scroll-hide/scroll-hide.module';
import { AutofocusModule } from './matinput-autofocus/matinput-autofocus.module';

@NgModule({
  imports: [SearchModule, ScrollHideModule, AutofocusModule],
  exports: [SearchModule, ScrollHideModule, AutofocusModule],
})
export class BundleShareModule { }
