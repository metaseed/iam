import { Routes } from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    //{ path: '', },
    { path: '**', component: NotFoundComponent }
];