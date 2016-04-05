
function init() {
    console.log('Contact loaded!');
}

if(!window.bundles) {
    window.bundles = {};
}
window.bundles['pages/contact'] = { init };
export { init }