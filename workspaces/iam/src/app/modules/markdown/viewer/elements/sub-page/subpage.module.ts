import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubPageComponent } from './subpage.component';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';
import { SubPageIdSearchComponent } from './subpage-id-search.component';
import { SearchModule } from 'app/modules/shared/bundle-share/components/search/search.module';
import { MatModules } from 'material';

@NgModule({
    imports: [CommonModule, MatModules, SearchModule],
    declarations: [SubPageComponent, SubPageIdSearchComponent],
    exports: [SubPageComponent]
})
export class SubPageModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = SubPageComponent;
}
