import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { HomeComponent } from 'home';
import { MarkdownComponent } from './modules/markdown/markdown.component';

const appRoutes: Routes = [
  // {
  //     path: 'admin',
  //     loadChildren: 'app/admin/admin.module#AdminModule',
  //     canLoad: [AuthGuard]
  //   },
  {
    path: 'doc',
    loadChildren: 'app/modules/markdown/markdown.module#MarkdownModule',
    data: { preload: true }
  },
  {
    path: 'explore',
    loadChildren: 'app/modules/me/me.module#MeModule'
  },
  {
    path: 'message',
    loadChildren: 'app/modules/me/me.module#MeModule'
  },
  {
    path: 'me',
    loadChildren: 'app/modules/me/me.module#MeModule'
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
