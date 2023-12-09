import './reset.css';
import './style.css';

import Alpine from 'alpinejs';
import controller from './data/controller';
import view from './data/view';
import state from './stores/state';

// suggested in the Alpine docs:
// make Alpine on window available for better DX
window.Alpine = Alpine;

Alpine.store('state', state);
Alpine.data('controller', controller);
Alpine.data('view', view);

Alpine.start();
