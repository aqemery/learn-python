export var MessagerQueue = (function() {
    var instance;
    function createInstance() {
        var object = new PriorityQueue();
        window.messager = object;
        return object;
    }
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


// Path: src/components/priority-queue.js
//create a priority queue for messages with observer pattern
class PriorityQueue {
    constructor() {
        this._queue = [];
        this._topics = {};
        this._elapsed = 0;
    }
    push(event, data, delay) {
        const priority = delay + this._elapsed;
        this._queue.push({ event, data, priority});
        this._queue.sort((a, b) => a.priority - b.priority);
    }
    pop(priority) {
        while (this._queue.length > 0 && this._queue[0].priority <= priority) {
            const item = this._queue.shift();
            console.log('POP!', item);
            //if there are subscribers to the topic, call them
            if (this._topics[item.event]) {
                //parse the data if it is a string
                const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;

                this._topics[item.event].forEach((cb) => cb(data));
            }
        }
    }
    subscribe(topic, callback) {
        if (!this._topics[topic]) {
            this._topics[topic] = [];
        }
        this._topics[topic].push(callback);
    }
    unsubscribe(topic, callback) {
        if (!this._topics[topic]) {
            return;
        }
        this._topics[topic] = this._topics[topic].filter((cb) => cb !== callback);
    }
}