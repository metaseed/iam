import { setBasePath } from '@awesome.me/webawesome/dist/webawesome.js';
import './app.ts';
import { initTheme } from './ui/theme.ts';

// Web Awesome assets (icons etc.) are served from node_modules during development.
setBasePath('/node_modules/@awesome.me/webawesome/dist');
initTheme();
