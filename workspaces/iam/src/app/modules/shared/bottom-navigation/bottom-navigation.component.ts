import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const HOME_ICON = `
<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
`;
const HOME_ICON_INACTIVE = `
<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" stroke-width="2" fill="none"/></svg>
`;
const BELL = `
<svg viewBox="0 0 20 20">
  <g stroke="none" stroke-width="1" fill-rule="evenodd">
    <path d="M10,20 C10.14,20 10.27,19.99 10.4,19.96 C11.05,19.82 11.58,19.38 11.84,18.78 C11.94,18.54 11.99,18.28 11.99,18 L7.99,18 C8,19.1 8.89,20 10,20 Z"></path>
    <path d="M16,9 C16,5.93 14.36,3.36 11.5,2.68 L11.5,2 C11.5,1.17 10.83,0.5 10,0.5 C9.17,0.5 8.5,1.17 8.5,2 L8.5,2.68 C5.63,3.36 4,5.92 4,9 L4,14 L2,16 L2,17 L18,17 L18,16 L16,14 L16,9 Z" fill-rule="nonzero"></path>
  </g>
</svg>
`;

const BELL_INACTIVE = `
<svg viewBox="0 0 20 20">
  <g>
    <path d="M10,20 C10.14,20 10.27,19.99 10.4,19.96 C11.05,19.82 11.58,19.38 11.84,18.78 C11.94,18.54 11.99,18.28 11.99,18 L7.99,18 C8,19.1 8.89,20 10,20 Z" fill="none"></path>
    <path d="M16,9 C16,5.93 14.36,3.36 11.5,2.68 L11.5,2 C11.5,1.17 10.83,0.5 10,0.5 C9.17,0.5 8.5,1.17 8.5,2 L8.5,2.68 C5.63,3.36 4,5.92 4,9 L4,14 L2,16 L2,17 L18,17 L18,16 L16,14 L16,9 Z" stroke-width="1.3" fill="none" fill-rule="nonzero"></path>
  </g>
</svg>
`;

const BELL_RING = `
<svg viewBox="0 0 20 20">
  <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
    <g id="bell">
      <g id="group-2" transform="rotate(1.61335 10 2)">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" keyTimes="0; 0.5; 1" values="-4 10 2; 4 10 2; -4 10 2;"
          dur="0.3s" begin="0s" repeatCount="indefinite"></animateTransform>
        <path d="M17.97,8.5 L19.97,8.5 C19.82,5.3 18.24,2.48 15.85,0.65 L14.43,2.08 C16.45,3.53 17.82,5.85 17.97,8.5 Z"
          id="Path"></path>
        <path d="M5.58,2.08 L4.15,0.65 C1.75,2.48 0.17,5.3 0.03,8.5 L2.03,8.5 C2.18,5.85 3.54,3.53 5.58,2.08 L5.58,2.08 Z"
          id="Path"></path>
      </g>
      <g id="group-3" transform="rotate(4.84006 10 4)">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" keyTimes="0; 0.5; 1" values="-12 10 4; 12 10 4; -12 10 4;"
          dur="0.3s" begin="0s" repeatCount="indefinite"></animateTransform>
        <path d="M10,20 C10.14,20 10.27,19.99 10.4,19.96 C11.05,19.82 11.58,19.38 11.84,18.78 C11.94,18.54 11.99,18.28 11.99,18 L7.99,18 C8,19.1 8.89,20 10,20 Z"
          id="Path" transform="translate(1.31664 0)">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" keyTimes="0; 0.5; 1" values="-5 0; 5 0; -5 0;"
            dur=".3s" begin=".1s" repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M16,9 C16,5.93 14.36,3.36 11.5,2.68 L11.5,2 C11.5,1.17 10.83,0.5 10,0.5 C9.17,0.5 8.5,1.17 8.5,2 L8.5,2.68 C5.63,3.36 4,5.92 4,9 L4,14 L2,16 L2,17 L18,17 L18,16 L16,14 L16,9 Z"
          id="Shape" fill-rule="nonzero"></path>
      </g>
    </g>
  </g>
</svg>
`;



const EXPLORE = `

<svg viewBox="0 0 512 512">
  <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM307.446 120.844l-102.642 97.779a23.997 23.997 0 0 0-6.772 11.729l-33.359 137.779c-5.68 23.459 22.777 39.318 39.88 23.024l102.64-97.779a23.99 23.99 0 0 0 6.772-11.729l33.359-137.779c5.618-23.198-22.591-39.493-39.878-23.024zM256 224c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"
  />
</svg>

`;
const EXPLORE_INACTIVE = `
<svg viewBox="0 0 512 512">
  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 448c-110.532 0-200-89.451-200-200 0-110.531 89.451-200 200-200 110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200zm91.326-312.131l-33.359 137.779a24.005 24.005 0 0 1-6.772 11.729l-102.64 97.779c-17.104 16.293-45.56.434-39.88-23.024l33.359-137.779a23.997 23.997 0 0 1 6.772-11.729l102.642-97.779c17.285-16.47 45.494-.175 39.878 23.024zM256 224c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"
  />
</svg>
`;

const ME_INACTIVE = `
<svg viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" stroke-width="1.5" fill="none"/>
</svg>
`;
const ME = `
<svg viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
</svg>
`;

const ADD = `
<svg viewBox="0 0 24 24">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" stroke="none"/>
</svg>
`
@Component({
  selector: 'ms-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {
  show = false;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('home', sanitizer.bypassSecurityTrustHtml(HOME_ICON));
    iconRegistry.addSvgIconLiteral(
      'home-inactive',
      sanitizer.bypassSecurityTrustHtml(HOME_ICON_INACTIVE)
    );

    iconRegistry.addSvgIconLiteral('bell', sanitizer.bypassSecurityTrustHtml(BELL));
    iconRegistry.addSvgIconLiteral('bell-ring', sanitizer.bypassSecurityTrustHtml(BELL_RING));
    iconRegistry.addSvgIconLiteral(
      'bell-inactive',
      sanitizer.bypassSecurityTrustHtml(BELL_INACTIVE)
    );
    iconRegistry.addSvgIconLiteral('explore', sanitizer.bypassSecurityTrustHtml(EXPLORE));
    iconRegistry.addSvgIconLiteral(
      'explore-inactive',
      sanitizer.bypassSecurityTrustHtml(EXPLORE_INACTIVE)
    );
    iconRegistry.addSvgIconLiteral('me', sanitizer.bypassSecurityTrustHtml(ME));
    iconRegistry.addSvgIconLiteral('me-inactive', sanitizer.bypassSecurityTrustHtml(ME_INACTIVE));
    iconRegistry.addSvgIconLiteral('add', sanitizer.bypassSecurityTrustHtml(ADD));
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.startsWith('/doc?') || event.url.startsWith('/doc/new')) {
          this.show = false;
        } else {
          this.show = true;
        }
        //console.log('NavigationEnd:', event);
      });
  }
}
