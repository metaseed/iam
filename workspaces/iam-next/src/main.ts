import './app.ts';
import { registerIcons } from './ui/icons.ts';
import { initTheme } from './ui/theme.ts';

// Icons are bundled inline (see ui/icons.ts); no Web Awesome asset path is needed.
registerIcons();
initTheme();
