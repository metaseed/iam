import { t, tag, UIElement } from '@std-ui/core';
import '@std-ui/router'; // defines <std-router>, <std-route>, <std-outlet>
import './pages/doc-view.ts';

@tag('iam-app')
export class App extends UIElement {
	protected override template() {
		return t`
			<std-router>
				<std-outlet></std-outlet>
				<std-route path="/" redirect="/doc?id=1"></std-route>
				<std-route path="/doc" element="iam-doc-view" title="iam"></std-route>
				<std-route path="*"><template><h1>Not found</h1></template></std-route>
			</std-router>`;
	}
}
