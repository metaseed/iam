import { Route, Routes, RouterModule } from "@angular/router";
import { MarkdownComponent } from "./markdown.component";
import { NgModule } from "@angular/core";


const documentRoutes: Routes = [
    // { path: 'doc', component: DocumentComponent },
    { path: 'doc', component: MarkdownComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(documentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DocumentRoutingModule {

}
