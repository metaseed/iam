import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { HomeComponent } from 'home';

const appRoutes: Routes = [
  // {
  //     path: 'admin',
  //     loadChildren: 'app/admin/admin.module#AdminModule',
  //     canLoad: [AuthGuard]
  //   },
  {
    path: 'doc',
    loadChildren: () => import('app/modules/markdown/markdown.module').then(m => m.MarkdownModule),
    data: { preload: true }
  },
  {
    path: 'explore',
    loadChildren: () => import('app/modules/me/me.module').then(m => m.MeModule)
  },
  {
    path: 'message',
    loadChildren: () => import('app/modules/me/me.module').then(m => m.MeModule)
  },
  {
    path: 'search',
    loadChildren: () => import('app/modules/search/doc-search.module').then(m => m.DocSearchModule)
  },
  {
    path: 'me',
    loadChildren: () => import('app/modules/me/me.module').then(m => m.MeModule)
  },

  { path: 'home', component: HomeComponent, data: { key: 'home' } /*for routeReuse*/ },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    preloadingStrategy: SelectivePreloadingStrategy
})
  ],
  exports: [RouterModule],
  providers: [CanDeactivateGuard, SelectivePreloadingStrategy]
})
export class AppRoutingModule {}
