import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocTreeDataService, DocNode } from './doc-tree.data.service';

export class DynamicDataSource implements DataSource<DocNode> {

    dataChange = new BehaviorSubject<DocNode[]>([]);

    get data(): DocNode[] { return this.dataChange.value; }
    set data(value: DocNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private _treeControl: NestedTreeControl<DocNode>,
        private _dataService: DocTreeDataService) { }

    connect(collectionViewer: CollectionViewer): Observable<DocNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if ((change as SelectionChange<DocNode>).added ||
                (change as SelectionChange<DocNode>).removed) {
                this.expandCollapseHandler(change as SelectionChange<DocNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    private expandCollapseHandler(change: SelectionChange<DocNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    private toggleNode(node: DocNode, expand: boolean) {
        const index = this.data.indexOf(node);
        if (!node.subPageIds?.length || index < 0) { // If no children, or cannot find the node, no op
            return;
        }
        if (expand && !node.subPages) {
            node.isLoading = true;
            this._dataService.getChildren$(node)
                .subscribe(nodes => {
                    node.subPages = nodes;
                    // workaround for the ui is not update when expand: https://github.com/angular/components/issues/11381
                    // to improve performance need to update the references all the way up to root.
                    // const data = this.data;
                    // this.data = null;
                    // this.data = data;

                    // just update the parent refer
                    const i = node.parent.subPages.indexOf(node);
                    const updateNode = { ...node };
                    this.moveExpansionState(node, updateNode);
                    node.parent.subPages[i] = updateNode;
                    updateNode.isLoading = false;
                    this.dataChange.next(this.data);
                })
        }

    }
    private moveExpansionState(from: DocNode, to: DocNode) {
        if (this._treeControl.isExpanded(from)) {
            this._treeControl.collapse(from);
            this._treeControl.expand(to);
        }
    }
}
