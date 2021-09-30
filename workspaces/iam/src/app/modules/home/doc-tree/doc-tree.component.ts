import { Component, OnInit, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DynamicDataSource } from './doc-tree.dataSource';
import { DocTreeDataService, DocNode } from './doc-tree.data.service';
import { NavigationExtras, Router } from '@angular/router';
import { SubscriptionManager } from 'core';
import { tap } from 'rxjs';

@Component({
  selector: 'ms-doc-tree',
  templateUrl: './doc-tree.component.html',
  styleUrls: ['./doc-tree.component.scss'],
})
export class DocTreeComponent extends SubscriptionManager implements OnInit {
  treeControl = new NestedTreeControl<DocNode>((node: DocNode) => node.subPages);
  dataSource: DynamicDataSource;
  root: DocNode;

  constructor(public dataService: DocTreeDataService, private router: Router) {
    super();
    this.dataSource = new DynamicDataSource(this.treeControl, dataService);
  }

  @Input()
  rootId: number;

  ngOnInit() {
    super.addSub(
      this.dataService.initialData$(this.rootId).pipe(
        tap(data => {
          this.dataSource.data = data.subPages;
          this.root = data;
        })).subscribe({ error: e => console.error(e) })
    );
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
