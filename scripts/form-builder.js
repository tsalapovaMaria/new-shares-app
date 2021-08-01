const formBuilder = function () {
    return {
        state: [],
        eventManager: {
            subscribers: [],
            subscribe: function (callback) {
                this.subscribers.push(callback);
                return this.subscribers;
            },
            unsubscribe: function (callback) {
                if (!this.subscribers.includes(callback)) {
                    return;
                }
                const index = this.subscribers.indexOf(callback);
                this.subscribers.splice(index, 1);
            },
            notify: function () {
                this.subscribers.forEach(callback => this.update(callback));
            },
            update: function (callback) {
                return callback();
            }
        },
        addRecord: function (amount, price) {
            const totalPrice = amount * price;
            const id = Date.now();

            const newEl = {
                id: id,
                amount: amount,
                price: price,
                total: totalPrice
            };

            this.state.push(newEl);
            this.eventManager.notify();

            const tr = renderForm.createTableRow(amount, price, totalPrice);


            return tr;
        },
        removeRecord: function (id) {
            const splicesEl = this.state.find(item => item.id === id);
            const elIndex = this.state.indexOf(splicesEl);

            this.state.splice(elIndex, 1);
            this.eventManager.notify();
        },
    }
};

const state = formBuilder.state;

Object.defineProperty(formBuilder, 'state', {
    configurable: false,
    get() {
        return state;
    }
});