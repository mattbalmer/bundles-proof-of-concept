import { findAll, findOne } from 'lib/dom';
import { Tab } from './tab';

class Tabs {
    currentTab = null;

    constructor(container) {
        let triggers = findAll(container, '[data-tab]');

        this.tabs = triggers.map(trigger => {
            let target = trigger.href.replace(location.origin, '');
            let content = findOne(container, `[data-tab-content="${target}"]`);
            console.log(`[data-tab-content="${target}"]`, content);
            return new Tab({ trigger, content })
        });

        this.select(this.tabs[0]);

        this.tabs.forEach(tab => {
            tab.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.select(tab);
            });
        })
    }

    select(tab) {
        if(this.currentTab) {
            this.currentTab.hide();
        }

        this.currentTab = tab;

        tab.show();
    }
    
    static initAll() {
        let tabs = findAll('[data-tabs]');
        return tabs.map(el => new Tabs(el));
    }
}

export { Tabs }