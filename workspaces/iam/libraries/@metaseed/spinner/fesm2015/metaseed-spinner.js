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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YXNlZWQtc3Bpbm5lci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGlubmVyL2xpYi9zcGlubmVyL3dhbmRlcmluZy1jdWJlcy5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGlubmVyL2xpYi9zcGlubmVyL3B1bHNlLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIvY2hhc2luZy1kb3RzLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIvY2lyY2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIvdGhyZWUtYm91bmNlLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIvY3ViZS1ncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIvd29yZC1wcmVzcy5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGlubmVyL2xpYi9zcGlubmVyL2ZhZGluZy1jaXJjbGUuY29tcG9uZW50LnRzIiwibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci9saWIvc3Bpbm5lci9mb2xkaW5nLWN1YmUuY29tcG9uZW50LnRzIiwibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci9saWIvc3Bpbm5lci9yb3RhdGluZy1wbGFuZS5jb21wb25lbnQudHMiLCJuZzovL0BtZXRhc2VlZC9zcGlubmVyL2xpYi9zcGlubmVyL2RvdWJsZS1ib3VuY2UuY29tcG9uZW50LnRzIiwibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci9saWIvc3Bpbm5lci93YXZlLmNvbXBvbmVudC50cyIsIm5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvbGliL3NwaW5uZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcGlubmVyJyxcclxuICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgdGltZW91dDogYW55O1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjaGFzaW5nLWRvdHMtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdkb3QnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMjtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBkZWxheTogbnVtYmVyID0gMDtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJyMzMzMnO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBpc1J1bm5pbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMudGltZW91dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgfSwgdGhpcy5kZWxheSk7XHJcbiAgfVxyXG4gIFxyXG4gIHByaXZhdGUgY2FuY2VsKCk6IHZvaWQge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBnZXQgaXRlbXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkodGhpcy5udW1JdGVtcyk7XHJcbiAgfVxyXG4gIFxyXG4gIG5nT25EZXN0cm95KCk6IGFueSB7XHJcbiAgICB0aGlzLmNhbmNlbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNwaW5uZXJUZW1wbGF0ZSA9IGBcclxuICA8ZGl2IFtoaWRkZW5dPVwiIXZpc2libGVcIiBbbmdDbGFzc109XCJiYXNlQ2xhc3NcIj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cImNoaWxkQ2xhc3MgKyAoaSsxKVwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICA8L2Rpdj5cclxuYDtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay13YW5kZXJpbmctY3ViZXMnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC53YW5kZXJpbmctY3ViZXMtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlMSxcclxuICAgIC5jdWJlMiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTVweDtcclxuICAgICAgaGVpZ2h0OiAxNXB4O1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWN1YmVtb3ZlIDEuOHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stY3ViZW1vdmUgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stY3ViZW1vdmUge1xyXG4gICAgICAyNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHJvdGF0ZSgtOTBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTgwZGVnKTtcclxuICAgICAgfVxyXG4gICAgICA3NSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stY3ViZW1vdmUge1xyXG4gICAgICAyNSUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSByb3RhdGUoLTkwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHJvdGF0ZSgtOTBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE3OWRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE3OWRlZyk7XHJcbiAgICAgIH1cclxuICAgICAgNTAuMSUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTgwZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTgwZGVnKTtcclxuICAgICAgfVxyXG4gICAgICA3NSUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0yNzBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgV2FuZGVyaW5nQ3ViZXNDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnd2FuZGVyaW5nLWN1YmVzLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnY3ViZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAyO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXB1bHNlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAucHVsc2Utc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXNjYWxlb3V0IDEuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stc2NhbGVvdXQgMS4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXNjYWxlb3V0IHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stc2NhbGVvdXQge1xyXG4gICAgICAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCIgY2xhc3M9XCJwdWxzZS1zcGlubmVyXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxyXG4gIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQdWxzZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1jaGFzaW5nLWRvdHMnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5jaGFzaW5nLWRvdHMtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stcm90YXRlIDIuMHMgaW5maW5pdGUgbGluZWFyO1xyXG4gICAgICBhbmltYXRpb246IHNrLXJvdGF0ZSAyLjBzIGluZmluaXRlIGxpbmVhcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmRvdDEsXHJcbiAgICAuZG90MiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIHdpZHRoOiA2MCU7XHJcbiAgICAgIGhlaWdodDogNjAlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICBhbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZG90MiB7XHJcbiAgICAgIHRvcDogYXV0bztcclxuICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1yb3RhdGUge1xyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1yb3RhdGUge1xyXG4gICAgICAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgMCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYXNpbmdEb3RzQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2NoYXNpbmctZG90cy1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2RvdCc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAyO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stY2lyY2xlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgPiBkaXYge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIGRpdjpiZWZvcmUge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgIHdpZHRoOiAxNSU7XHJcbiAgICAgIGhlaWdodDogMTUlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xyXG4gICAgICBjb250ZW50OiAnJztcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWNpcmNsZUJvdW5jZURlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1jaXJjbGVCb3VuY2VEZWxheSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNSB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlOCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlOSB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTAge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTExIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMzpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU0OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU1OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU2OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC43cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC43cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU3OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU4OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU5OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC40cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC40cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMDpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTE6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEyOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWNpcmNsZUJvdW5jZURlbGF5IHtcclxuICAgICAgMCUsIDgwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgNDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWNpcmNsZUJvdW5jZURlbGF5IHtcclxuICAgICAgMCUsIDgwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgNDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDaXJjbGVDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnY2lyY2xlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnY2lyY2xlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDEyO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stdGhyZWUtYm91bmNlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAudGhyZWUtYm91bmNlLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC50aHJlZS1ib3VuY2Utc3Bpbm5lciA+IGRpdiB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgIGhlaWdodDogMThweDtcclxuICAgICAgXHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAudGhyZWUtYm91bmNlLXNwaW5uZXIgLmJvdW5jZTEge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjMycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnRocmVlLWJvdW5jZS1zcGlubmVyIC5ib3VuY2UyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2VkZWxheSB7XHJcbiAgICAgIDAlLCA4MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stYm91bmNlZGVsYXkge1xyXG4gICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaHJlZUJvdW5jZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICd0aHJlZS1ib3VuY2Utc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdib3VuY2UnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMztcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWN1YmUtZ3JpZCcsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciBkaXYge1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6IDMzJTtcclxuICAgICAgaGVpZ2h0OiAzMyU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZUdyaWRTY2FsZURlbGF5IDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogY3ViZUdyaWRTY2FsZURlbGF5IDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTEge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmUyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlMyB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTQge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU1IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTcge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTgge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU5IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIGN1YmVHcmlkU2NhbGVEZWxheSB7XHJcbiAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgICAzNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIGN1YmVHcmlkU2NhbGVEZWxheSB7XHJcbiAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgICAzNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdWJlR3JpZENvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjdWJlLWdyaWQtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjdWJlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2std29yZC1wcmVzcycsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLndvcmQtcHJlc3Mtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogaW5uZXItY2lyY2xlIDFzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgICAgYW5pbWF0aW9uOiBpbm5lci1jaXJjbGUgMXMgbGluZWFyIGluZmluaXRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuaW5uZXItY2lyY2xlIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDVweDtcclxuICAgICAgbGVmdDogNXB4O1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgd2lkdGg6IDhweDtcclxuICAgICAgaGVpZ2h0OiA4cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIGlubmVyLWNpcmNsZSB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIGlubmVyLWNpcmNsZSB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIGNsYXNzPVwid29yZC1wcmVzcy1zcGlubmVyXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImlubmVyLWNpcmNsZVwiPjwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JkUHJlc3NDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stZmFkaW5nLWNpcmNsZScsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgZGl2IHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgZGl2OmJlZm9yZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgd2lkdGg6IDE1JTtcclxuICAgICAgaGVpZ2h0OiAxNSU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY2lyY2xlRmFkZURlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1jaXJjbGVGYWRlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTQge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU1IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTcge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU4IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlOSB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEwIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTEge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUzOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU0OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNTpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTY6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU3OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlODpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuNXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTk6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMDpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTExOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stY2lyY2xlRmFkZURlbGF5IHtcclxuICAgICAgMCUsIDM5JSwgMTAwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXkge1xyXG4gICAgICAwJSwgMzklLCAxMDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGYWRpbmdDaXJjbGVDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnZmFkaW5nLWNpcmNsZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2NpcmNsZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAxMjtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWZvbGRpbmctY3ViZScsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVaKDQ1ZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDQ1ZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIGRpdiB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICAgIGhlaWdodDogNTAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgZGl2OmJlZm9yZSB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xyXG4gICAgICBjb250ZW50OiAnJztcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XHJcbiAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWZvbGRDdWJlQW5nbGUgMi40cyBpbmZpbml0ZSBsaW5lYXIgYm90aDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1mb2xkQ3ViZUFuZ2xlIDIuNHMgaW5maW5pdGUgbGluZWFyIGJvdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciAuY3ViZTIge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDkwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooOTBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgLmN1YmU0IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWigxODBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWigxODBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgLmN1YmUzIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWigyNzBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWigyNzBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgLmN1YmUyOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciAuY3ViZTQ6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuNnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC42cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIC5jdWJlMzpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stZm9sZEN1YmVBbmdsZSB7XHJcbiAgICAgIDAlLCAxMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgtMTgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKC0xODBkZWcpO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgICAgMjUlLCA3NSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKDBkZWcpO1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIH1cclxuICAgICAgOTAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVkoMTgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVZKDE4MGRlZyk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWZvbGRDdWJlQW5nbGUge1xyXG4gICAgICAwJSwgMTAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoLTE4MGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgtMTgwZGVnKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICAgIDI1JSwgNzUlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoMGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgwZGVnKTtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB9XHJcbiAgICAgIDkwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVZKDE4MGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWSgxODBkZWcpO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRm9sZGluZ0N1YmVDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnZm9sZGluZy1jdWJlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnY3ViZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSA0O1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXJvdGF0aW5nLXBsYW5lJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAucm90YXRpbmctcGxhbmUtc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXJvdGF0ZXBsYW5lIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stcm90YXRlcGxhbmUgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXJvdGF0ZXBsYW5lIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweClcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWSgxODBkZWcpXHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVZKDE4MGRlZykgcm90YXRlWCgxODBkZWcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1yb3RhdGVwbGFuZSB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZylcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MC4xZGVnKSByb3RhdGVZKDBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwLjFkZWcpIHJvdGF0ZVkoMGRlZylcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKC0xODBkZWcpIHJvdGF0ZVkoLTE3OS45ZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MGRlZykgcm90YXRlWSgtMTc5LjlkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIGNsYXNzPVwicm90YXRpbmctcGxhbmUtc3Bpbm5lclwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRpbmdQbGFuZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1kb3VibGUtYm91bmNlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuZG91YmxlLWJvdW5jZS1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmRvdWJsZS1ib3VuY2UxLFxyXG4gICAgLmRvdWJsZS1ib3VuY2UyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgb3BhY2l0eTogMC42O1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICBhbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZG91YmxlLWJvdW5jZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRG91YmxlQm91bmNlQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2RvdWJsZS1ib3VuY2Utc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdkb3VibGUtYm91bmNlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay13YXZlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAud2F2ZS1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MnB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgPiBkaXYge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIHdpZHRoOiA1cHg7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogNHB4O1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stc3RyZXRjaGRlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stc3RyZXRjaGRlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgPiBkaXY6bGFzdC1jaGlsZCB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgLnJlY3QzIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0NCB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1zdHJldGNoZGVsYXkge1xyXG4gICAgICAwJSwgNDAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDAuNCk7XHJcbiAgICAgIH1cclxuICAgICAgMjAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1zdHJldGNoZGVsYXkge1xyXG4gICAgICAwJSwgNDAlLCAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjQpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMC40KTtcclxuICAgICAgfVxyXG4gICAgICAyMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhdmVDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnd2F2ZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ3JlY3QnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gNTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2FuZGVyaW5nQ3ViZXNDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvd2FuZGVyaW5nLWN1YmVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQdWxzZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9wdWxzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhc2luZ0RvdHNDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvY2hhc2luZy1kb3RzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaXJjbGVDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvY2lyY2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaHJlZUJvdW5jZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci90aHJlZS1ib3VuY2UuY29tcG9uZW50JztcbmltcG9ydCB7IEN1YmVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL2N1YmUtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29yZFByZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL3dvcmQtcHJlc3MuY29tcG9uZW50JztcbmltcG9ydCB7IEZhZGluZ0NpcmNsZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9mYWRpbmctY2lyY2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb2xkaW5nQ3ViZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9mb2xkaW5nLWN1YmUuY29tcG9uZW50JztcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm90YXRpbmdQbGFuZUNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci9yb3RhdGluZy1wbGFuZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRG91YmxlQm91bmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL2RvdWJsZS1ib3VuY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdhdmVDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIvd2F2ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IHtcbiAgU3Bpbm5lckNvbXBvbmVudCxcbiAgUm90YXRpbmdQbGFuZUNvbXBvbmVudCxcbiAgRG91YmxlQm91bmNlQ29tcG9uZW50LFxuICBXYXZlQ29tcG9uZW50LFxuICBXYW5kZXJpbmdDdWJlc0NvbXBvbmVudCxcbiAgUHVsc2VDb21wb25lbnQsXG4gIENoYXNpbmdEb3RzQ29tcG9uZW50LFxuICBDaXJjbGVDb21wb25lbnQsXG4gIFRocmVlQm91bmNlQ29tcG9uZW50LFxuICBDdWJlR3JpZENvbXBvbmVudCxcbiAgV29yZFByZXNzQ29tcG9uZW50LFxuICBGYWRpbmdDaXJjbGVDb21wb25lbnQsXG4gIEZvbGRpbmdDdWJlQ29tcG9uZW50XG59O1xuXG5jb25zdCBOR19TUElOX0tJVF9DT01QT05FTlRTID0gW1xuICBTcGlubmVyQ29tcG9uZW50LFxuICBSb3RhdGluZ1BsYW5lQ29tcG9uZW50LFxuICBEb3VibGVCb3VuY2VDb21wb25lbnQsXG4gIFdhdmVDb21wb25lbnQsXG4gIFdhbmRlcmluZ0N1YmVzQ29tcG9uZW50LFxuICBQdWxzZUNvbXBvbmVudCxcbiAgQ2hhc2luZ0RvdHNDb21wb25lbnQsXG4gIENpcmNsZUNvbXBvbmVudCxcbiAgVGhyZWVCb3VuY2VDb21wb25lbnQsXG4gIEN1YmVHcmlkQ29tcG9uZW50LFxuICBXb3JkUHJlc3NDb21wb25lbnQsXG4gIEZhZGluZ0NpcmNsZUNvbXBvbmVudCxcbiAgRm9sZGluZ0N1YmVDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IE5HX1NQSU5fS0lUX0NPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IE5HX1NQSU5fS0lUX0NPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgU3Bpbm5lck1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7dUJBTzRCLElBQUk7eUJBRUgsc0JBQXNCOzBCQUNyQixLQUFLO3dCQUNQLENBQUM7cUJBR0osQ0FBQztxQkFHRCxNQUFNOzs7Ozs7UUFHbEIsU0FBUyxDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHVCxNQUFNO1FBQ1osWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzs7Ozs7UUFHaEIsS0FBSztRQUNkLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7SUFHOUIsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7WUE5Q0YsU0FBUyxTQUFDO2dC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