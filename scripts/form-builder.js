const formBuilder = function() {
    return {
        state : [],        
        eventManager : {
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
                if (prevState && prevState !== state) {
        
                }
                const prevState = state;
            },
        },
        
        addRecord : function (amount, price) {
            const totalPrice = amount * price;
            const id = Date.now();
        
            const newEl = {
                id: id,
                amount: amount,
                price: price,
                total: totalPrice
            };
        
            this.state.push(newEl);
        
            return renderForm.createTableRow(amount, price, totalPrice);
        },
        removeRecord : function(id) {
            const splicesEl = this.state.find(item => item.id === id);
            const elIndex = this.state.indexOf(splicesEl);
        
            this.state.splice(elIndex, 1);        
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