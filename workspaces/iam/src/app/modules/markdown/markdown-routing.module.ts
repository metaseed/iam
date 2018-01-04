import { Route, Routes, RouterModule } from "@angular/router";
import { MarkdownComponent } from "./markdown.component";
import { NgModule } from "@angular/core";


const documentRoutes: Routes = [
    { path: 'new', component: MarkdownComponent },
    { path: '', component: MarkdownComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(documentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MarkdownRoutingModule {

}
