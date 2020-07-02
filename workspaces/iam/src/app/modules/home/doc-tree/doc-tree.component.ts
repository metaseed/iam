import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DynamicDataSource } from './doc-tree.dataSource';
import { DocTreeDataService, DocNode } from './doc-tree.data.service';


@Component({
  selector: 'ms-doc-tree',
  templateUrl: './doc-tree.component.html',
  styleUrls: ['./doc-tree.component.scss'],
})
export class DocTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<DocNode>((node: DocNode) => node.subPages);
  dataSource: DynamicDataSource;
  constructor(dataService: DocTreeDataService) {
    this.dataSource = new DynamicDataSource(this.treeControl, dataService);
    dataService.initialData$.subscribe(data =>
       this.dataSource.data = data, e => console.error(e))
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: DocNode) => !!node.subPageIds?.length;
}
