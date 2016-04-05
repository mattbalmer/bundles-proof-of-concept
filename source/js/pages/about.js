import { InputUpdate } from 'components/input-update';

function init() {
    console.log('About loaded!');
    InputUpdate.initAll();
}

if(!window.bundles) {
    window.bundles = {};
}
window.bundles['pages/about'] = { init };
export { init }