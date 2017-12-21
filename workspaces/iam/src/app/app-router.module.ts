import { Routes } from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { DocListComponent } from "./docs/doc-list/doc-list.component";
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router/src/router_module";
import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";

const appRoutes: Routes = [
    { path: 'doc', component:  },
    { path: '', component: DocListComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false,
                preloadingStrategy: SelectivePreloadingStrategy,
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard,
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule {

}