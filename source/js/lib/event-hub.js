class Subscriber {
    constructor(id, event, callback) {
        this.id = id;
        this.event = event;
        this.callback = callback;
    }

    trigger(...args) {
        this.callback(...args);
    }
}

export class EventHub {
    constructor(id = null) {
        this.id = id;

        this.subscribers_ = [];

        this.nextId_ = 1;
    }

    nextSubscriberID_() {
        return this.nextId_++;
    }

    on(event, callback) {
        let subscriber = new Subscriber(this.nextSubscriberID_(), event, callback);
        subscriber.destroy = this.destroy.bind(this, subscriber);

        this.subscribers_.push(subscriber);

        return subscriber;
    }

    trigger(event, ...args) {
        this.subscribers_
            .filter(s => s.event == event)
            .forEach(s => s.trigger(...args));
    }

    destroy(subscriber) {
        this.subscribers_ = this.subscribers_
            .filter(s => s.id != subscriber.id);
    }
}