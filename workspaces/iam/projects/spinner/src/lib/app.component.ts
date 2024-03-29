import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  styles: [
    `
           .wrapper {
             width: 480px;
             margin: 0 auto;
             text-align: center;
           }
     
           h1 {
             margin-bottom: 15px;
             padding-bottom: 15px;
             border-bottom: 1px dashed #333;
           }
     
           h3 {
             margin-bottom: 15px;
           }
         `
  ],
  template: `
    <div class="wrapper">
      <h1>@metaseed/spinner</h1>

      <h3>rotating-plane</h3>
      <sk-rotating-plane></sk-rotating-plane>

      <h3>double-bounce</h3>
      <sk-double-bounce [color]="'green'"></sk-double-bounce>

      <h3>wave</h3>
      <sk-wave [color]="'#00688B'"></sk-wave>

      <h3>wandering-cubes</h3>
      <sk-wandering-cubes></sk-wandering-cubes>

      <h3>pulse</h3>
      <sk-pulse [color]="'red'"></sk-pulse>

      <h3>chasing-dots</h3>
      <sk-chasing-dots></sk-chasing-dots>

      <h3>circle</h3>
      <sk-circle></sk-circle>

      <h3>three-bounce</h3>
      <sk-three-bounce></sk-three-bounce>

      <h3>cube-grid</h3>
      <sk-cube-grid></sk-cube-grid>

      <h3>word-press</h3>
      <sk-word-press></sk-word-press>

      <h3>fading-circle</h3>
      <sk-fading-circle></sk-fading-circle>

      <h3>folding-cube</h3>
      <sk-folding-cube></sk-folding-cube>
    </div>
  `
})
export class AppComponent implements OnInit {
  ngOnInit(): any {
    console.log('App initialized!');
  }
}
