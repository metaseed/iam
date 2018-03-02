import {
    Component,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as CodeMirror from 'codemirror';
// import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript'
import { MarkdownEditorService } from '../services/markdown.editor.service';
import { Scrollable } from 'core';
import { Store } from '@ngrx/store';
import * as markdown from '../../reducers';
import * as fromEdit from '../../actions/edit';
/**
 * Usage : <codemirror [(ngModel)]="markdown" [config]="{...}"></codemirror>
 */
@Component({
    selector: 'codemirror',
    styleUrls: ['./codemirror.component.scss'],

    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CodemirrorComponent),
            multi: true
        }
    ],
    template: `
    <ms-codemirror-toolbar></ms-codemirror-toolbar>
    <div #scroll>
    <textarea #host></textarea>
    </div>
    `,
})
export class CodemirrorComponent {
    //    var map = {"Alt-Space": function(cm){...}}
    //    editor.addKeyMap(map);
    @Input() config;
    @Output() change = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() blur = new EventEmitter();

    @ViewChild('host') host;

    @Output() instance = null;

    _value = '';

    /**
     * Constructor
     */
    constructor(private service: MarkdownEditorService, private store: Store<markdown.State>) { }

    get value() {
        return this._value;
    };

    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    /**
     * On component destroy
     */
    ngOnDestroy() { }
    @ViewChild('scroll')
    scroll;

    ngAfterViewInit() {


        this.config = this.config || {};
        this.codemirrorInit(this.config);
        this.service.editorLoaded$.next(this.instance);
        new Scrollable(this.scroll.nativeElement.children[1].lastChild).
            isScrollDown$.subscribe((e) => {
                this.store.dispatch(new fromEdit.ScrollDown(e));
                // console.log(e)
            });
    }

    /**
     * Initialize codemirror
     */
    codemirrorInit(config) {
        this.instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
        this.instance.setValue(this._value);

        this.instance.on('change', () => {
            this.updateValue(this.instance.getValue());
        });

        this.instance.on('focus', () => {
            this.focus.emit();
        });

        this.instance.on('blur', () => {
            this.blur.emit();
        });
    }

    refresh() {
        this.instance.refresh();
    }

    /**
     * Value update process
     */
    updateValue(value) {
        this.value = value;
        this.onTouched();
        this.change.emit(value);
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value) {
        this._value = value || '';
        if (this.instance) {
            this.instance.setValue(this._value);
        }
    }

    onChange(_) { }

    onTouched() { }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}