import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SpinnerComponent {
    constructor() {
        this.visible = true;
        this.baseClass = 'chasing-dots-spinner';
        this.childClass = 'dot';
        this.numItems = 2;
        this.delay = 0;
        this.color = '#333';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isRunning(value) {
        if (!value) {
            this.cancel();
            this.visible = false;
            return;
        }
        if (this.timeout) {
            return;
        }
        this.timeout = setTimeout(() => {
            this.visible = true;
            this.cancel();
        }, this.delay);
    }
    /**
     * @return {?}
     */
    cancel() {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    }
    /**
     * @return {?}
     */
    get items() {
        return Array(this.numItems);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.cancel();
    }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'spinner',
                template: ''
            },] },
];
/** @nocollapse */
SpinnerComponent.propDecorators = {
    "delay": [{ type: Input },],
    "color": [{ type: Input },],
    "isRunning": [{ type: Input },],
};
const /** @type {?} */ SpinnerTemplate = `
  <div [hidden]="!visible" [ngClass]="baseClass">
      <div *ngFor="let item of items; let i = index" [ngClass]="childClass + (i+1)" [style.backgroundColor]="color"></div>
  </div>
`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WanderingCubesComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'wandering-cubes-spinner';
        this.childClass = 'cube';
        this.numItems = 2;
    }
}
WanderingCubesComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-wandering-cubes',
                styles: [`
    .wandering-cubes-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .cube1,
    .cube2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 15px;
      
      -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
      animation: sk-cubemove 1.8s infinite ease-in-out;
    }
    
    .cube2 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    @-webkit-keyframes sk-cubemove {
      25% {
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        -webkit-transform: rotate(-360deg);
      }
    }
    
    @keyframes sk-cubemove {
      25% {
        transform: translateX(42px) rotate(-90deg) scale(0.5);
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        transform: translateX(42px) translateY(42px) rotate(-179deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
      }
      50.1% {
        transform: translateX(42px) translateY(42px) rotate(-180deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PulseComponent extends SpinnerComponent {
}
PulseComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-pulse',
                styles: [`
    .pulse-spinner {
      margin: 25px auto;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      
      -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
      animation: sk-scaleout 1.0s infinite ease-in-out;
    }
    
    @-webkit-keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }
    
    @keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
      }
    }
  `],
                template: `
    <div [hidden]="!visible" class="pulse-spinner" [style.backgroundColor]="color"></div>
  `
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ChasingDotsComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'chasing-dots-spinner';
        this.childClass = 'dot';
        this.numItems = 2;
    }
}
ChasingDotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-chasing-dots',
                styles: [`
    .chasing-dots-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
      
      -webkit-animation: sk-rotate 2.0s infinite linear;
      animation: sk-rotate 2.0s infinite linear;
    }
    
    .dot1,
    .dot2 {
      position: absolute;
      top: 0;
      display: inline-block;
      width: 60%;
      height: 60%;
      border-radius: 100%;
      
      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }
    
    .dot2 {
      top: auto;
      bottom: 0;
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }
    
    @-webkit-keyframes sk-rotate {
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    
    @keyframes sk-rotate {
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }
    
    @-webkit-keyframes sk-bounce {
      0%, 100% {
        -webkit-transform: scale(0.0);
      }
      50% {
        -webkit-transform: scale(1.0);
      }
    }
    
    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CircleComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'circle-spinner';
        this.childClass = 'circle';
        this.numItems = 12;
    }
}
CircleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-circle',
                styles: [`
    .circle-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .circle-spinner > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent !important;
    }
    
    .circle-spinner div:before {
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      border-radius: 100%;
      background-color: #333;
      content: '';
      -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
      animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    }
    
    .circle-spinner .circle2 {
      -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
      transform: rotate(30deg);
    }
    
    .circle-spinner .circle3 {
      -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
      transform: rotate(60deg);
    }
    
    .circle-spinner .circle4 {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    
    .circle-spinner .circle5 {
      -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
      transform: rotate(120deg);
    }
    
    .circle-spinner .circle6 {
      -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
      transform: rotate(150deg);
    }
    
    .circle-spinner .circle7 {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    
    .circle-spinner .circle8 {
      -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
      transform: rotate(210deg);
    }
    
    .circle-spinner .circle9 {
      -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
      transform: rotate(240deg);
    }
    
    .circle-spinner .circle10 {
      -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    
    .circle-spinner .circle11 {
      -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
      transform: rotate(300deg);
    }
    
    .circle-spinner .circle12 {
      -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
      transform: rotate(330deg);
    }
    
    .circle-spinner .circle2:before {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    
    .circle-spinner .circle3:before {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    
    .circle-spinner .circle4:before {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    .circle-spinner .circle5:before {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    
    .circle-spinner .circle6:before {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
    
    .circle-spinner .circle7:before {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
    
    .circle-spinner .circle8:before {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
    
    .circle-spinner .circle9:before {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
    
    .circle-spinner .circle10:before {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
    
    .circle-spinner .circle11:before {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    
    .circle-spinner .circle12:before {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }
    
    @-webkit-keyframes sk-circleBounceDelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    
    @keyframes sk-circleBounceDelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ThreeBounceComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'three-bounce-spinner';
        this.childClass = 'bounce';
        this.numItems = 3;
    }
}
ThreeBounceComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-three-bounce',
                styles: [`
    .three-bounce-spinner {
      margin: 25px auto;
      width: 70px;
    }
    
    .three-bounce-spinner > div {
      display: inline-block;
      width: 18px;
      height: 18px;
      
      border-radius: 100%;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }
    
    .three-bounce-spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    
    .three-bounce-spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
    
    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1.0);
      }
    }
    
    @keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CubeGridComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'cube-grid-spinner';
        this.childClass = 'cube';
        this.numItems = 9;
    }
}
CubeGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-cube-grid',
                styles: [`
    .cube-grid-spinner {
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .cube-grid-spinner div {
      float: left;
      width: 33%;
      height: 33%;
      
      -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
      animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
    }
    
    .cube-grid-spinner .cube1 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    
    .cube-grid-spinner .cube2 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    
    .cube-grid-spinner .cube3 {
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
    }
    
    .cube-grid-spinner .cube4 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    
    .cube-grid-spinner .cube5 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    
    .cube-grid-spinner .cube6 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    
    .cube-grid-spinner .cube7 {
      -webkit-animation-delay: 0s;
      animation-delay: 0s;
    }
    
    .cube-grid-spinner .cube8 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    
    .cube-grid-spinner .cube9 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    
    @-webkit-keyframes cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      }
      35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
      }
    }
    
    @keyframes cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      }
      35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WordPressComponent extends SpinnerComponent {
}
WordPressComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-word-press',
                styles: [`
    .word-press-spinner {
      position: relative;
      margin: 25px auto;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      
      -webkit-animation: inner-circle 1s linear infinite;
      animation: inner-circle 1s linear infinite;
    }
    
    .inner-circle {
      position: absolute;
      top: 5px;
      left: 5px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background: #fff;
    }
    
    @-webkit-keyframes inner-circle {
      0% {
        -webkit-transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    
    @keyframes inner-circle {
      0% {
        transform: rotate(0);
        -webkit-transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }
  `],
                template: `
    <div [hidden]="!visible" class="word-press-spinner" [style.backgroundColor]="color">
      <span class="inner-circle"></span>
    </div>
  `
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FadingCircleComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'fading-circle-spinner';
        this.childClass = 'circle';
        this.numItems = 12;
    }
}
FadingCircleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-fading-circle',
                styles: [`
    .fading-circle-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .fading-circle-spinner div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent !important;
    }
    
    .fading-circle-spinner div:before {
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      border-radius: 100%;
      background-color: #333;
      content: '';
      -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
      animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
    }
    
    .fading-circle-spinner .circle2 {
      -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
      transform: rotate(30deg);
    }
    
    .fading-circle-spinner .circle3 {
      -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
      transform: rotate(60deg);
    }
    
    .fading-circle-spinner .circle4 {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    
    .fading-circle-spinner .circle5 {
      -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
      transform: rotate(120deg);
    }
    
    .fading-circle-spinner .circle6 {
      -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
      transform: rotate(150deg);
    }
    
    .fading-circle-spinner .circle7 {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    
    .fading-circle-spinner .circle8 {
      -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
      transform: rotate(210deg);
    }
    
    .fading-circle-spinner .circle9 {
      -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
      transform: rotate(240deg);
    }
    
    .fading-circle-spinner .circle10 {
      -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    
    .fading-circle-spinner .circle11 {
      -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
      transform: rotate(300deg);
    }
    
    .fading-circle-spinner .circle12 {
      -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
      transform: rotate(330deg);
    }
    
    .fading-circle-spinner .circle2:before {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    
    .fading-circle-spinner .circle3:before {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    
    .fading-circle-spinner .circle4:before {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    .fading-circle-spinner .circle5:before {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    
    .fading-circle-spinner .circle6:before {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
    
    .fading-circle-spinner .circle7:before {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
    
    .fading-circle-spinner .circle8:before {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
    
    .fading-circle-spinner .circle9:before {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
    
    .fading-circle-spinner .circle10:before {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
    
    .fading-circle-spinner .circle11:before {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    
    .fading-circle-spinner .circle12:before {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }
    
    @-webkit-keyframes sk-circleFadeDelay {
      0%, 39%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
    
    @keyframes sk-circleFadeDelay {
      0%, 39%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FoldingCubeComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'folding-cube-spinner';
        this.childClass = 'cube';
        this.numItems = 4;
    }
}
FoldingCubeComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-folding-cube',
                styles: [`
    .folding-cube-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
      
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
    }
    
    .folding-cube-spinner div {
      position: relative;
      float: left;
      width: 50%;
      height: 50%;
      background-color: transparent !important;
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
    
    .folding-cube-spinner div:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #333;
      content: '';
      -webkit-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
      -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
      animation: sk-foldCubeAngle 2.4s infinite linear both;
    }
    
    .folding-cube-spinner .cube2 {
      -webkit-transform: scale(1.1) rotateZ(90deg);
      transform: scale(1.1) rotateZ(90deg);
    }
    
    .folding-cube-spinner .cube4 {
      -webkit-transform: scale(1.1) rotateZ(180deg);
      transform: scale(1.1) rotateZ(180deg);
    }
    
    .folding-cube-spinner .cube3 {
      -webkit-transform: scale(1.1) rotateZ(270deg);
      transform: scale(1.1) rotateZ(270deg);
    }
    
    .folding-cube-spinner .cube2:before {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    
    .folding-cube-spinner .cube4:before {
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
    }
    
    .folding-cube-spinner .cube3:before {
      -webkit-animation-delay: 0.9s;
      animation-delay: 0.9s;
    }
    
    @-webkit-keyframes sk-foldCubeAngle {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
    
    @keyframes sk-foldCubeAngle {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RotatingPlaneComponent extends SpinnerComponent {
}
RotatingPlaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-rotating-plane',
                styles: [`
    .rotating-plane-spinner {
      margin: 25px auto;
      width: 40px;
      height: 40px;
      
      -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
      animation: sk-rotateplane 1.2s infinite ease-in-out;
    }
    
    @-webkit-keyframes sk-rotateplane {
      0% {
        -webkit-transform: perspective(120px)
      }
      50% {
        -webkit-transform: perspective(120px) rotateY(180deg)
      }
      100% {
        -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)
      }
    }
    
    @keyframes sk-rotateplane {
      0% {
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
      }
      50% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
      }
      100% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
    }
  `],
                template: `
    <div [hidden]="!visible" class="rotating-plane-spinner" [style.backgroundColor]="color"></div>
  `
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DoubleBounceComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'double-bounce-spinner';
        this.childClass = 'double-bounce';
        this.numItems = 2;
    }
}
DoubleBounceComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-double-bounce',
                styles: [`
    .double-bounce-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .double-bounce1,
    .double-bounce2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      opacity: 0.6;
      
      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }
    
    .double-bounce2 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }
    
    @-webkit-keyframes sk-bounce {
      0%, 100% {
        -webkit-transform: scale(0.0);
      }
      50% {
        -webkit-transform: scale(1.0);
      }
    }
    
    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WaveComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'wave-spinner';
        this.childClass = 'rect';
        this.numItems = 5;
    }
}
WaveComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-wave',
                styles: [`
    .wave-spinner {
      margin: 25px auto;
      width: 42px;
      height: 40px;
    }
    
    .wave-spinner > div {
      display: inline-block;
      width: 5px;
      margin-right: 4px;
      height: 100%;
      
      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }
    
    .wave-spinner > div:last-child {
      margin-right: 0;
    }
    
    .wave-spinner .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    
    .wave-spinner .rect3 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }
    
    .wave-spinner .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    .wave-spinner .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    
    @-webkit-keyframes sk-stretchdelay {
      0%, 40%, 100% {
        -webkit-transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1.0);
      }
    }
    
    @keyframes sk-stretchdelay {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ NG_SPIN_KIT_COMPONENTS = [
    SpinnerComponent,
    RotatingPlaneComponent,
    DoubleBounceComponent,
    WaveComponent,
    WanderingCubesComponent,
    PulseComponent,
    ChasingDotsComponent,
    CircleComponent,
    ThreeBounceComponent,
    CubeGridComponent,
    WordPressComponent,
    FadingCircleComponent,
    FoldingCubeComponent
];
class SpinnerModule {
}
SpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: NG_SPIN_KIT_COMPONENTS,
                exports: NG_SPIN_KIT_COMPONENTS
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { SpinnerComponent, RotatingPlaneComponent, DoubleBounceComponent, WaveComponent, WanderingCubesComponent, PulseComponent, ChasingDotsComponent, CircleComponent, ThreeBounceComponent, CubeGridComponent, WordPressComponent, FadingCircleComponent, FoldingCubeComponent, SpinnerModule, SpinnerTemplate as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YXNlZWQtc3BpbmVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbWV0YXNlZWQvc3BpbmVyL2xpYi9zcGlubmVyL3NwaW5uZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AbWV0YXNlZWQvc3BpbmVyL2xpYi9zcGlubmVyL3dhbmRlcmluZy1jdWJlcy5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvcHVsc2UuY29tcG9uZW50LnRzIiwibmc6Ly9AbWV0YXNlZWQvc3BpbmVyL2xpYi9zcGlubmVyL2NoYXNpbmctZG90cy5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvY2lyY2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5lci9saWIvc3Bpbm5lci90aHJlZS1ib3VuY2UuY29tcG9uZW50LnRzIiwibmc6Ly9AbWV0YXNlZWQvc3BpbmVyL2xpYi9zcGlubmVyL2N1YmUtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvd29yZC1wcmVzcy5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvZmFkaW5nLWNpcmNsZS5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvZm9sZGluZy1jdWJlLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5lci9saWIvc3Bpbm5lci9yb3RhdGluZy1wbGFuZS5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvZG91YmxlLWJvdW5jZS5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5uZXIvd2F2ZS5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGluZXIvbGliL3NwaW5lci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NwaW5uZXInLFxyXG4gIHRlbXBsYXRlOiAnJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIHZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyB0aW1lb3V0OiBhbnk7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2NoYXNpbmctZG90cy1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2RvdCc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAyO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGRlbGF5OiBudW1iZXIgPSAwO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAnIzMzMyc7XHJcbiAgXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2V0IGlzUnVubmluZyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB9LCB0aGlzLmRlbGF5KTtcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBjYW5jZWwoKTogdm9pZCB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMudGltZW91dCA9IHVuZGVmaW5lZDtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIGdldCBpdGVtcygpIHtcclxuICAgIHJldHVybiBBcnJheSh0aGlzLm51bUl0ZW1zKTtcclxuICB9XHJcbiAgXHJcbiAgbmdPbkRlc3Ryb3koKTogYW55IHtcclxuICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU3Bpbm5lclRlbXBsYXRlID0gYFxyXG4gIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIFtuZ0NsYXNzXT1cImJhc2VDbGFzc1wiPlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaSA9IGluZGV4XCIgW25nQ2xhc3NdPVwiY2hpbGRDbGFzcyArIChpKzEpXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG5gO1xyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXdhbmRlcmluZy1jdWJlcycsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLndhbmRlcmluZy1jdWJlcy1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUxLFxyXG4gICAgLmN1YmUyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxNXB4O1xyXG4gICAgICBoZWlnaHQ6IDE1cHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY3ViZW1vdmUgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1jdWJlbW92ZSAxLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1jdWJlbW92ZSB7XHJcbiAgICAgIDI1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgIDc1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1jdWJlbW92ZSB7XHJcbiAgICAgIDI1JSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHJvdGF0ZSgtOTBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTc5ZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTc5ZGVnKTtcclxuICAgICAgfVxyXG4gICAgICA1MC4xJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgIDc1JSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0yNzBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBXYW5kZXJpbmdDdWJlc0NvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICd3YW5kZXJpbmctY3ViZXMtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjdWJlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stcHVsc2UnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5wdWxzZS1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stc2NhbGVvdXQgMS4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1zY2FsZW91dCAxLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stc2NhbGVvdXQge1xyXG4gICAgICAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1zY2FsZW91dCB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtoaWRkZW5dPVwiIXZpc2libGVcIiBjbGFzcz1cInB1bHNlLXNwaW5uZXJcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImNvbG9yXCI+PC9kaXY+XHJcbiAgYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFB1bHNlQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWNoYXNpbmctZG90cycsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmNoYXNpbmctZG90cy1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1yb3RhdGUgMi4wcyBpbmZpbml0ZSBsaW5lYXI7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stcm90YXRlIDIuMHMgaW5maW5pdGUgbGluZWFyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZG90MSxcclxuICAgIC5kb3QyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDYwJTtcclxuICAgICAgaGVpZ2h0OiA2MCU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5kb3QyIHtcclxuICAgICAgdG9wOiBhdXRvO1xyXG4gICAgICBib3R0b206IDA7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXJvdGF0ZSB7XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLXJvdGF0ZSB7XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhc2luZ0RvdHNDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnY2hhc2luZy1kb3RzLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnZG90JztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1jaXJjbGUnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5jaXJjbGUtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciA+IGRpdiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgZGl2OmJlZm9yZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgd2lkdGg6IDE1JTtcclxuICAgICAgaGVpZ2h0OiAxNSU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY2lyY2xlQm91bmNlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgICBhbmltYXRpb246IHNrLWNpcmNsZUJvdW5jZURlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUzIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU0IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU1IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU2IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU3IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU4IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU5IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTEge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUyOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUzOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTQ6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTU6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTY6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTc6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTg6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjVzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjVzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTk6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEwOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMTpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stY2lyY2xlQm91bmNlRGVsYXkge1xyXG4gICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stY2lyY2xlQm91bmNlRGVsYXkge1xyXG4gICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENpcmNsZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjaXJjbGUtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjaXJjbGUnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMTI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay10aHJlZS1ib3VuY2UnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC50aHJlZS1ib3VuY2Utc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNzBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnRocmVlLWJvdW5jZS1zcGlubmVyID4gZGl2IHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB3aWR0aDogMThweDtcclxuICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgICBcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC50aHJlZS1ib3VuY2Utc3Bpbm5lciAuYm91bmNlMSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAudGhyZWUtYm91bmNlLXNwaW5uZXIgLmJvdW5jZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMTZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5IHtcclxuICAgICAgMCUsIDgwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1ib3VuY2VkZWxheSB7XHJcbiAgICAgIDAlLCA4MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRocmVlQm91bmNlQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ3RocmVlLWJvdW5jZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2JvdW5jZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAzO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stY3ViZS1ncmlkJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIGRpdiB7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICB3aWR0aDogMzMlO1xyXG4gICAgICBoZWlnaHQ6IDMzJTtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBjdWJlR3JpZFNjYWxlRGVsYXkgMS4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBjdWJlR3JpZFNjYWxlRGVsYXkgMS4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlMSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmUzIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuNHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNCB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU2IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNyB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlOCB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTkge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgY3ViZUdyaWRTY2FsZURlbGF5IHtcclxuICAgICAgMCUsIDcwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMSwgMSwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICB9XHJcbiAgICAgIDM1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMCwgMCwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgY3ViZUdyaWRTY2FsZURlbGF5IHtcclxuICAgICAgMCUsIDcwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMSwgMSwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICB9XHJcbiAgICAgIDM1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMCwgMCwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1YmVHcmlkQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2N1YmUtZ3JpZC1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2N1YmUnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gOTtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay13b3JkLXByZXNzJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAud29yZC1wcmVzcy1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgIGhlaWdodDogMzBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBpbm5lci1jaXJjbGUgMXMgbGluZWFyIGluZmluaXRlO1xyXG4gICAgICBhbmltYXRpb246IGlubmVyLWNpcmNsZSAxcyBsaW5lYXIgaW5maW5pdGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5pbm5lci1jaXJjbGUge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogNXB4O1xyXG4gICAgICBsZWZ0OiA1cHg7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogOHB4O1xyXG4gICAgICBoZWlnaHQ6IDhweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgaW5uZXItY2lyY2xlIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgaW5uZXItY2lyY2xlIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCIgY2xhc3M9XCJ3b3JkLXByZXNzLXNwaW5uZXJcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImNvbG9yXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiaW5uZXItY2lyY2xlXCI+PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmRQcmVzc0NvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1mYWRpbmctY2lyY2xlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciBkaXYge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciBkaXY6YmVmb3JlIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICB3aWR0aDogMTUlO1xyXG4gICAgICBoZWlnaHQ6IDE1JTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1jaXJjbGVGYWRlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgICBhbmltYXRpb246IHNrLWNpcmNsZUZhZGVEZWxheSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTIge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUzIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTUge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU2IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTgge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU5IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTAge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMSB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTM6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTQ6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU1OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuN3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuN3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTc6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU4OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlOTpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuNHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEwOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTE6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXkge1xyXG4gICAgICAwJSwgMzklLCAxMDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWNpcmNsZUZhZGVEZWxheSB7XHJcbiAgICAgIDAlLCAzOSUsIDEwMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgICAgNDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZhZGluZ0NpcmNsZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdmYWRpbmctY2lyY2xlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnY2lyY2xlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDEyO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stZm9sZGluZy1jdWJlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVooNDVkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooNDVkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgZGl2IHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgaGVpZ2h0OiA1MCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciBkaXY6YmVmb3JlIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcclxuICAgICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcclxuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stZm9sZEN1YmVBbmdsZSAyLjRzIGluZmluaXRlIGxpbmVhciBib3RoO1xyXG4gICAgICBhbmltYXRpb246IHNrLWZvbGRDdWJlQW5nbGUgMi40cyBpbmZpbml0ZSBsaW5lYXIgYm90aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIC5jdWJlMiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooOTBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWig5MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciAuY3ViZTQge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDE4MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDE4MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciAuY3ViZTMge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDI3MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDI3MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciAuY3ViZTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIC5jdWJlNDpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC42cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjZzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgLmN1YmUzOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuOXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1mb2xkQ3ViZUFuZ2xlIHtcclxuICAgICAgMCUsIDEwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKC0xODBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoLTE4MGRlZyk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgICAyNSUsIDc1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKDBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoMGRlZyk7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgfVxyXG4gICAgICA5MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWSgxODBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVkoMTgwZGVnKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stZm9sZEN1YmVBbmdsZSB7XHJcbiAgICAgIDAlLCAxMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgtMTgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKC0xODBkZWcpO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgICAgMjUlLCA3NSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKDBkZWcpO1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIH1cclxuICAgICAgOTAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVkoMTgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVZKDE4MGRlZyk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGb2xkaW5nQ3ViZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdmb2xkaW5nLWN1YmUtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjdWJlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stcm90YXRpbmctcGxhbmUnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5yb3RhdGluZy1wbGFuZS1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stcm90YXRlcGxhbmUgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1yb3RhdGVwbGFuZSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stcm90YXRlcGxhbmUge1xyXG4gICAgICAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KVxyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVZKDE4MGRlZylcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVkoMTgwZGVnKSByb3RhdGVYKDE4MGRlZylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLXJvdGF0ZXBsYW5lIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoMGRlZykgcm90YXRlWSgwZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoMGRlZykgcm90YXRlWSgwZGVnKVxyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwLjFkZWcpIHJvdGF0ZVkoMGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKC0xODAuMWRlZykgcm90YXRlWSgwZGVnKVxyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MGRlZykgcm90YXRlWSgtMTc5LjlkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwZGVnKSByb3RhdGVZKC0xNzkuOWRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCIgY2xhc3M9XCJyb3RhdGluZy1wbGFuZS1zcGlubmVyXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxyXG4gIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3RhdGluZ1BsYW5lQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWRvdWJsZS1ib3VuY2UnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5kb3VibGUtYm91bmNlLXNwaW5uZXIge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZG91YmxlLWJvdW5jZTEsXHJcbiAgICAuZG91YmxlLWJvdW5jZTIge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICBvcGFjaXR5OiAwLjY7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5kb3VibGUtYm91bmNlMiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgMCUsIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEb3VibGVCb3VuY2VDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnZG91YmxlLWJvdW5jZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2RvdWJsZS1ib3VuY2UnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMjtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXdhdmUnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC53YXZlLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQycHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciA+IGRpdiB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDVweDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1zdHJldGNoZGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1zdHJldGNoZGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciA+IGRpdjpsYXN0LWNoaWxkIHtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0MiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDMge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgLnJlY3Q0IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0NSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXN0cmV0Y2hkZWxheSB7XHJcbiAgICAgIDAlLCA0MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMC40KTtcclxuICAgICAgfVxyXG4gICAgICAyMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLXN0cmV0Y2hkZWxheSB7XHJcbiAgICAgIDAlLCA0MCUsIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDAuNCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgwLjQpO1xyXG4gICAgICB9XHJcbiAgICAgIDIwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVkoMS4wKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgV2F2ZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICd3YXZlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAncmVjdCc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSA1O1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXYW5kZXJpbmdDdWJlc0NvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci93YW5kZXJpbmctY3ViZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFB1bHNlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL3B1bHNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFzaW5nRG90c0NvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9jaGFzaW5nLWRvdHMuY29tcG9uZW50JztcbmltcG9ydCB7IENpcmNsZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9jaXJjbGUuY29tcG9uZW50JztcbmltcG9ydCB7IFRocmVlQm91bmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL3RocmVlLWJvdW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3ViZUdyaWRDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvY3ViZS1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3JkUHJlc3NDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvd29yZC1wcmVzcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFkaW5nQ2lyY2xlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL2ZhZGluZy1jaXJjbGUuY29tcG9uZW50JztcbmltcG9ydCB7IEZvbGRpbmdDdWJlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL2ZvbGRpbmctY3ViZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3RhdGluZ1BsYW5lQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL3JvdGF0aW5nLXBsYW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb3VibGVCb3VuY2VDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvZG91YmxlLWJvdW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2F2ZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci93YXZlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQge1xuICBTcGlubmVyQ29tcG9uZW50LFxuICBSb3RhdGluZ1BsYW5lQ29tcG9uZW50LFxuICBEb3VibGVCb3VuY2VDb21wb25lbnQsXG4gIFdhdmVDb21wb25lbnQsXG4gIFdhbmRlcmluZ0N1YmVzQ29tcG9uZW50LFxuICBQdWxzZUNvbXBvbmVudCxcbiAgQ2hhc2luZ0RvdHNDb21wb25lbnQsXG4gIENpcmNsZUNvbXBvbmVudCxcbiAgVGhyZWVCb3VuY2VDb21wb25lbnQsXG4gIEN1YmVHcmlkQ29tcG9uZW50LFxuICBXb3JkUHJlc3NDb21wb25lbnQsXG4gIEZhZGluZ0NpcmNsZUNvbXBvbmVudCxcbiAgRm9sZGluZ0N1YmVDb21wb25lbnRcbn07XG5cbmNvbnN0IE5HX1NQSU5fS0lUX0NPTVBPTkVOVFMgPSBbXG4gIFNwaW5uZXJDb21wb25lbnQsXG4gIFJvdGF0aW5nUGxhbmVDb21wb25lbnQsXG4gIERvdWJsZUJvdW5jZUNvbXBvbmVudCxcbiAgV2F2ZUNvbXBvbmVudCxcbiAgV2FuZGVyaW5nQ3ViZXNDb21wb25lbnQsXG4gIFB1bHNlQ29tcG9uZW50LFxuICBDaGFzaW5nRG90c0NvbXBvbmVudCxcbiAgQ2lyY2xlQ29tcG9uZW50LFxuICBUaHJlZUJvdW5jZUNvbXBvbmVudCxcbiAgQ3ViZUdyaWRDb21wb25lbnQsXG4gIFdvcmRQcmVzc0NvbXBvbmVudCxcbiAgRmFkaW5nQ2lyY2xlQ29tcG9uZW50LFxuICBGb2xkaW5nQ3ViZUNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogTkdfU1BJTl9LSVRfQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogTkdfU1BJTl9LSVRfQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBTcGluZXJNb2R1bGUge31cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O3VCQU80QixJQUFJO3lCQUVILHNCQUFzQjswQkFDckIsS0FBSzt3QkFDUCxDQUFDO3FCQUdKLENBQUM7cUJBR0QsTUFBTTs7Ozs7O1FBR2xCLFNBQVMsQ0FBQyxLQUFjO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2YsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBR1QsTUFBTTtRQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7O1FBR2hCLEtBQUs7UUFDZCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7O0lBRzlCLFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7O1lBOUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FB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