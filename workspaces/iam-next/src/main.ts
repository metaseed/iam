import { setBasePath } from '@awesome.me/webawesome/dist/webawesome.js';
import './app.ts';

// Web Awesome assets (icons etc.) are served from node_modules during Phase 0.
setBasePath('/node_modules/@awesome.me/webawesome/dist');
