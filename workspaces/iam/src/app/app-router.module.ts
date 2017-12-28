import { Routes } from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { DocsComponent } from 'docs';
import { MarkdownComponent } from "./modules/markdown/markdown.component";

const appRoutes: Routes = [
    // {
    //     path: 'admin',
    //     loadChildren: 'app/admin/admin.module#AdminModule',
    //     canLoad: [AuthGuard]
    //   },
    //   {
    //     path: 'crisis-center',
    //     loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
    //     data: { preload: true }
    //   },
    { path: 'doc', component: MarkdownComponent },
    { path: '', component: DocsComponent },
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