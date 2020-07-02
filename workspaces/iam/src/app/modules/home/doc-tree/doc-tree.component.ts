import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DynamicDataSource } from './doc-tree.dataSource';
import { DocTreeDataService, DocNode } from './doc-tree.data.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'ms-doc-tree',
  templateUrl: './doc-tree.component.html',
  styleUrls: ['./doc-tree.component.scss'],
})
export class DocTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<DocNode>((node: DocNode) => node.subPages);
  dataSource: DynamicDataSource;
  root: DocNode;
  constructor(dataService: DocTreeDataService, private router: Router) {
    this.dataSource = new DynamicDataSource(this.treeControl, dataService);
    dataService.initialData$.subscribe(data => {
      this.dataSource.data = data.subPages;
      this.root = data;
    }, e => console.error(e))
  }

  ngOnInit(): void {
  }

  onShowDoc(doc: DocNode) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.id,
        title: doc.title,
        f: doc.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }

  hasChild = (_: number, node: DocNode) => !!node.subPageIds?.length;
}
