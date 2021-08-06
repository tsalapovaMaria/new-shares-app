const countAveragePrice = (form) => {
    const state = form.getState();

    const amountSum = Array.from(state)
        .map(item => item.amount)
        .reduce((prev, total) => prev + total, 0);
    const totalSum = Array.from(state)
        .map(item => item.total)
        .reduce((prev, amount) => prev + amount, 0);

    if (totalSum === 0 && amountSum === 0) {
        return 0;
    }
    return totalSum / amountSum;
};

const changeAveragePrice = (form) => {
    const averagePrice = countAveragePrice(form);
    const element = document.querySelector('.average-output-price');

    element.textContent = (averagePrice).toFixed(2).toLocaleString();
};

const calculateProfit = (form) => {
    const input = document.querySelector('.current-price__input');
    const value = readInputValue(input);
    if (!value) {
        return 0;
    }

    const state = form.getState();

    const amountSum = Array.from(state)
        .map(item => item.amount)
        .reduce((prev, total) => prev + total, 0);
    const totalSum = Array.from(state)
        .map(item => item.total)
        .reduce((prev, amount) => prev + amount, 0);

    const profit = (totalSum) - (amountSum * value);

    return profit > 0 ? profit : 0;
};

const changeProfitEl = (form) => {
    const profit = calculateProfit(form);
    const profitEl = document.querySelector('.profit-value');
    profitEl.textContent =
        (profit > 0) ? `+ ${profit.toLocaleString()}` :
        (profit === 0) ? `0` :
        `- ${Math.abs(profit).toLocaleString()}`;
};

const calculateAmount = (entryPointsForm, exitPointsForm) => {
    const desiredPriceInput = document.querySelector('.desired-price__input');
    const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
    const checkInputsValidate = () => {
        const desiredPrice = readInputValue(desiredPriceInput);
        const currentPrice = readInputValue(currentPriceInput);

        if(desiredPrice === 0){
            desiredPriceInput.value = '';
            return;
        }
        if(currentPrice === 0){
            currentPriceInput.value = '';
            return;
        }

        if (!desiredPrice || !currentPrice) {
            return false;
        }
        return [desiredPrice, currentPrice];
    };
    const userValuesEntered = checkInputsValidate();

    if (!userValuesEntered) {
        return;
    }

    const [desiredPrice, currentPrice] = userValuesEntered;

    const entryState = entryPointsForm.getState();
    const exitState = exitPointsForm.getState();

    const entryAmountSum = Array.from(entryState).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    const exitAmountSum = Array.from(exitState).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);

    const restAmountSum = entryAmountSum - exitAmountSum;

    const priceEntrySum = Array.from(entryState).map(item => item.price).reduce((prev, curr) => prev + curr, 0);

    return ((restAmountSum * priceEntrySum) - (desiredPrice * restAmountSum)) / (desiredPrice - currentPrice);
};

const changeAmountEl = (entryPointsForm, exitPointsForm) => {
    const amount = calculateAmount(entryPointsForm, exitPointsForm);
    const amountToBuyEl = document.querySelector('.shares-amount__amount-output');
    amountToBuyEl.textContent = (amount > 0 && Number.isFinite(amount)) ? Math.ceil(amount).toLocaleString() + ' шт' : '0 шт';
};

const addProfitInputEventListener = (form) => {
    const input = document.querySelector('.current-price__input');

    const currencyClassName = 'current-price__currency';
    
    const symbolWidth = 9;
    const paddingLeft = 12;
    const spaceBetweenElements = 5;
    
    const top = 0;

    input.addEventListener('input', () => {
        changeProfitEl(form);
    });

    input.addEventListener('blur', () => {
        const inputLength = input.offsetWidth;
        const value = readInputValue(input);
        const inputValueLength = value.toLocaleString().length;
        const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements - inputLength;

        if(value === 0){
            input.value = '';
            return;
        }
        const span = addElement({
            input: input,
            textContent: '',
            className: currencyClassName,
            top: top + 'px',
            left: left + 'px'
        });
        span.dataset.currency = currency;
    });

    input.addEventListener('focus', () => {
        removeElement({
            input: input,
            className: currencyClassName
        });
    });
};

const addInputsEvents = (input, entryPointsForm, exitPointsForm) => {

    const currencyClassName = 'current-price__currency';
    
    const symbolWidth = 9;
    const paddingLeft = 12;
    const spaceBetweenElements = 5;
    
    const top = 0;

    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return 0;
        }

        changeAmountEl(entryPointsForm, exitPointsForm);
    });

    input.addEventListener('blur', () => {
        const inputLength = input.offsetWidth;
        const value = readInputValue(input);
        const inputValueLength = value.toLocaleString().length;
        const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements - inputLength;

        if(value === 0){
            input.value = '';
            return;
        }

        const span = addElement({
            input: input,
            textContent: '',
            className: currencyClassName,
            top: top + 'px',
            left: left + 'px'
        });
        span.dataset.currency = currency;
    });
    input.addEventListener('focus', () => {
        removeElement({
            input: input,
            className: currencyClassName
        });
    });
};

const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
    const desiredPriceInput = document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');
    
    addInputsEvents(desiredPriceInput, entryPointsForm, exitPointsForm);
    addInputsEvents(currentPriceInput, entryPointsForm, exitPointsForm);
};
