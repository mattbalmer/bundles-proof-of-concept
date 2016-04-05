import { findAll, findOne } from 'lib/dom';

const Filters = {
    currency: (number) => `$${parseInt(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`
};

class InputUpdate {
    shown = false;

    constructor(input) {
        this.input = input;
        this.target = findOne(input.dataset['update']);
        this.filter = input.dataset['filter'];

        this.input.addEventListener('keyup', () => {
            let value = this.input.value;
            this.update(value);
        });
    }

    update(value) {
        if(this.filter) {
            value = Filters[this.filter](value);
        }

        this.target.textContent = value;
    }

    static initAll() {
        let els = findAll('input[data-update]');
        return els.map(input => new InputUpdate(input));
    }
}

export { InputUpdate }