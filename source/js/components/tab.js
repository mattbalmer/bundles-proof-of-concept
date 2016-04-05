import loader from 'services/loader';

class Tab {
    shown = false;

    constructor({ trigger, content }) {
        this.trigger = trigger;
        this.content = content;
        this.bundle = content.dataset['requiresBundle'];
    }

    loadBundles() {
        loader.load(this.bundle)
            .then(() => console.log(`Loaded bundle: ${this.bundle}`))
            .catch(() => console.error('Unable to load script ' + this.bundle))
            .then(() => {
                window.bundles[this.bundle].init();
            })
    }

    show() {
        if(!this.shown) {
            this.loadBundles();
        }

        this.content.classList.add('visible');

        this.shown = true;
    }

    hide() {
        this.content.classList.remove('visible');
    }
}

export { Tab }