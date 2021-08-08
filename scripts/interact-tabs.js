const countAveragePrice = (boughtRecords, soldRecords) => {
    const getFilteredBoughtRecords = (soldRecord) => {
        //берем элементы, чьи id меньше id точки выхода (покупки, приобретенные раньше продажи)
        const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);

        if (recordsBoughtEarlier.length === 0) {
            return;
        }

        const recordsBoughtLater = boughtRecords.filter(boughtRecord => boughtRecord.id > soldRecord.id);

        let lastBoughtRecord = recordsBoughtEarlier[recordsBoughtEarlier.length - 1];
        //разница в количестве продаж и покупок
        let amountDifference = soldRecord.amount - lastBoughtRecord.amount;

        while (amountDifference >= 0) {
            soldRecord.amount = amountDifference;
            recordsBoughtEarlier.pop();

            lastBoughtRecord = recordsBoughtEarlier[recordsBoughtEarlier.length - 1];

            if (!lastBoughtRecord) {
                break;
            }
            amountDifference = soldRecord.amount - lastBoughtRecord.amount;
        }
        if (!lastBoughtRecord) {
            return;
        }

        if(amountDifference < 0){
            soldRecord.amount = 0;
        }

        recordsBoughtEarlier[recordsBoughtEarlier.length - 1].amount = Math.abs(amountDifference);

        return recordsBoughtEarlier.concat(recordsBoughtLater);
    };

    const countAverage = (boughtRecords) => {
        if (!boughtRecords) {
            return 0;
        }

        const countBoughtTotalPrice = (boughtRecords) => {
            return boughtRecords
                .map(record => record.amount * record.price)
                .reduce((prev, curr) => prev + curr, 0)
        };

        const countBoughtAmount = (boughtRecords) => {
            return boughtRecords
                .map((record) => record.amount)
                .reduce((prev, curr) => prev + curr, 0);
        };

        const totalPrice = countBoughtTotalPrice(boughtRecords);
        const amount = countBoughtAmount(boughtRecords);
        const result = totalPrice / amount;

        return Number.isNaN(result) ? 0 : result;
    };

    let soldRecordIndex = soldRecords.length - 1;
    let soldRecord = soldRecords[soldRecordIndex];

    if (!soldRecord || !soldRecord.amount) {
        return countAverage(boughtRecords);
    }

    const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
    
    if(recordsBoughtEarlier.length === 0){
        return countAverage(boughtRecords);
    }

    let averagePrice = 0;
    let indexModificator = 1;
    while (soldRecord && soldRecord.amount) {
        const filteredBoughtRecords = getFilteredBoughtRecords(soldRecord);
        averagePrice += countAverage(filteredBoughtRecords);

        soldRecordIndex = soldRecords.length - ++indexModificator;
        soldRecord = soldRecords[soldRecordIndex];
    }

    return averagePrice;
};

const changeAveragePrice = (entryPointsForm, exitPointsForm) => {
    const boughtRecords = entryPointsForm.getState();
    const soldRecords = exitPointsForm.getState();

    const averagePrice = countAveragePrice(boughtRecords, soldRecords);
    const element = document.querySelector('.average-output-price');

    element.textContent = (Math.trunc(averagePrice * 100) / 100).toLocaleString();
};

const currentPriceProfitInput = document.querySelector('.tab01 .current-price__input');

const getCurrentPriceInputValue = () => {
    return readInputValue(currentPriceProfitInput);
};

const calculateProfit = (sharesEntries, value) => {
    const amountSum = Array.from(sharesEntries)
        .map(item => item.amount)
        .reduce((prev, total) => prev + total, 0);
    const totalSum = Array.from(sharesEntries)
        .map(item => item.total)
        .reduce((prev, amount) => prev + amount, 0);

    const profit = (totalSum) - (amountSum * value);

    return profit > 0 ? profit : 0;
};

const profitEl = document.querySelector('.profit-value');

const changeProfitEl = (form) => {
    const value = getCurrentPriceInputValue();
    if (!value) {
        currentPriceProfitInput.textContent = '';
        return 0;
    }

    const sharesEntries = form.getState();

    const profit = calculateProfit(sharesEntries, value);
    profitEl.textContent =
        (profit > 0) ? `+ ${profit.toLocaleString()}` :
        (profit === 0) ? `0` :
        `- ${Math.abs(profit).toLocaleString()}`;
};

const checkInputsValidate = () => {
    const desiredPrice = readInputValue(desiredPriceInput);
    const currentPrice = readInputValue(currentPriceInput);

    if (desiredPrice === 0) {
        desiredPriceInput.value = '';
        return;
    }
    if (currentPrice === 0) {
        currentPriceInput.value = '';
        return;
    }

    if (!desiredPrice || !currentPrice) {
        return false;
    }
    return [desiredPrice, currentPrice];
};

const desiredPriceInput = document.querySelector('.desired-price__input');
const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');

const calculateAmount = (userValuesEntered, boughtRecords, soldRecords) => {
    const [desiredPrice, currentPrice] = userValuesEntered;

    const entryAmountSum = Array.from(boughtRecords).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    const exitAmountSum = Array.from(soldRecords).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);

    const restAmountSum = entryAmountSum - exitAmountSum;

    const priceEntrySum = Array.from(boughtRecords).map(item => item.price).reduce((prev, curr) => prev + curr, 0);

    return ((restAmountSum * priceEntrySum) - (desiredPrice * restAmountSum)) / (desiredPrice - currentPrice);
};

const amountToBuyEl = document.querySelector('.shares-amount__amount-output');

const changeAmountEl = (entryPointsForm, exitPointsForm) => {
    const userValuesEntered = checkInputsValidate();

    if (!userValuesEntered) {
        return;
    }

    const boughtRecords = entryPointsForm.getState();
    const soldRecords = exitPointsForm.getState();

    const amount = calculateAmount(userValuesEntered, boughtRecords, soldRecords);
    amountToBuyEl.textContent = (amount > 0 && Number.isFinite(amount)) ? Math.ceil(amount).toLocaleString() + ' шт' : '0 шт';
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

        if (value === 0) {
            input.value = '';
            return;
        }

        const span = createPseudoElement({
            input: input,
            textContent: '',
            className: currencyClassName,
            top: top + 'px',
            left: left + 'px'
        });
        span.dataset.currency = currency;
    });
    input.addEventListener('focus', () => {
        removePseudoElement({
            input: input,
            className: currencyClassName
        });
    });
};

const currentPriceAmountInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
const desiredPriceAmountInput = document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');

const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    addInputsEvents(desiredPriceAmountInput, entryPointsForm, exitPointsForm);
    addInputsEvents(currentPriceAmountInput, entryPointsForm, exitPointsForm);
};

const addProfitInputEventListener = (entryPointsForm, exitPointsForm) => {
    addInputsEvents(currentPriceProfitInput, entryPointsForm, exitPointsForm);
};