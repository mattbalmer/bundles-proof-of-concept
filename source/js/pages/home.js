function init() {
    console.log('Home loaded!');
}

if(!window.bundles) {
    window.bundles = {};
}
window.bundles['pages/home'] = { init };
export { init }