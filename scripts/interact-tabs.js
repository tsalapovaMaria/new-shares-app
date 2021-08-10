const countAveragePrice = (boughtRecords, soldRecords) => {
    const getFilteredBoughtRecords = (boughtRecords, soldRecord) => {
        //берем элементы, чьи id меньше id точки выхода (покупки, приобретенные раньше продажи)
        const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);

        if (recordsBoughtEarlier.length === 0) {
            return;
        }

        const recordsBoughtLater = boughtRecords.filter(boughtRecord => boughtRecord.id > soldRecord.id);

        let lastBoughtRecord = recordsBoughtEarlier[recordsBoughtEarlier.length - 1];


        const calculateAmountDifference = () => {
            let amountDifference = soldRecord.amount - lastBoughtRecord.amount;

            //количество продаж превышает количество покупок
            let isSalesExceedPurchases = amountDifference >= 0;
            return [amountDifference, isSalesExceedPurchases];
        };

        //разница в количестве продаж и покупок
        let [amountDifference, isSalesExceedPurchases] = calculateAmountDifference();

        //фильтр массива покупок до тех пор, пока
        //количество продаж превышает количество покупок
        while (isSalesExceedPurchases) {
            soldRecord.amount = amountDifference;
            recordsBoughtEarlier.pop();

            lastBoughtRecord = recordsBoughtEarlier[recordsBoughtEarlier.length - 1];

            if (!lastBoughtRecord) {
                break;
            }

            [amountDifference, isSalesExceedPurchases] = calculateAmountDifference();
        }

        //выйти из функции, если в boughtRecords не осталось значений
        if (!lastBoughtRecord) {
            return;
        }

        if (amountDifference < 0) {
            soldRecord.amount = 0;
        }

        recordsBoughtEarlier[recordsBoughtEarlier.length - 1].amount = Math.abs(amountDifference);

        if (recordsBoughtLater.length !== 0) {
            return recordsBoughtEarlier.concat(recordsBoughtLater);
        }

        return recordsBoughtEarlier;
    };

    const countAverage = (boughtRecords) => {
        if (!boughtRecords) {
            return 0;
        }

        const countBoughtTotalPrice = (boughtRecords) => {
            return boughtRecords
                .map((record) => record.amount * record.price)
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

    if (recordsBoughtEarlier.length === 0) {
        return countAverage(boughtRecords);
    }

    let averagePrice = 0;
    let indexModificator = 1;
    while (soldRecord && soldRecord.amount) {
        const filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
        averagePrice += countAverage(filteredBoughtRecords);

        soldRecordIndex = soldRecords.length - ++indexModificator;
        soldRecord = soldRecords[soldRecordIndex];
    }

    return averagePrice;
};

const changeAveragePrice = (entryPointsForm, exitPointsForm) => {

    const entryState = entryPointsForm.getState();
    const boughtRecords = Object
        .keys(entryState)
        .map((key) => entryState[key]);

    const exitState = exitPointsForm.getState();
    const soldRecords = Object
        .keys(exitState)
        .map((key) => exitState[key]);

    const averagePrice = countAveragePrice(boughtRecords, soldRecords);
    const outputElement = document.querySelector('.average-output-price');

    outputElement.textContent = (Math.trunc(averagePrice * 100) / 100).toLocaleString();
};

const currentPriceProfitInput = document.querySelector('.tab01 .current-price__input');

const getCurrentPriceInputValue = () => {
    return readInputValue(currentPriceProfitInput);
};

const calculateProfit = (boughtRecords, value) => {
    const amountSum = Array.from(boughtRecords)
        .map(item => item.amount)
        .reduce((sum, amount) => sum + amount, 0);
    const priceSum = Array.from(boughtRecords)
        .map(item => item.price)
        .reduce((sum, price) => sum + price, 0);

    const profit = (priceSum * amountSum) - (amountSum * value);

    return profit > 0 ? profit : 0;
};

const profitEl = document.querySelector('.profit-value');

const changeProfitEl = (entryPointsForm, exitPointsForm) => {
    const value = getCurrentPriceInputValue();
    if (!value) {
        currentPriceProfitInput.textContent = '';
        return 0;
    }

    const entryState = entryPointsForm.getState();
    const boughtRecords = Object
        .keys(entryState)
        .map((key) => entryState[key]);

    const exitState = exitPointsForm.getState();
    const soldRecords = Object
        .keys(exitState)
        .map((key) => exitState[key]);

    const changeProfitElValue = (profit) => {
        profitEl.textContent =
            (profit > 0) ? `+ ${profit.toLocaleString()}` :
                (profit === 0) ? `0` :
                    `- ${Math.abs(profit).toLocaleString()}`;
    }

    let soldRecordIndex = soldRecords.length - 1;
    let soldRecord = soldRecords[soldRecordIndex];

    if (!soldRecord || !soldRecord.amount) {
        const profit = calculateProfit(boughtRecords, value);
        changeProfitElValue(profit);
        return;
    }

    const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);

    if (recordsBoughtEarlier.length === 0) {
        const profit = calculateProfit(boughtRecords, value);
        changeProfitElValue(profit);
        return;
    }

    let profit = 0;
    let indexModificator = 1;
    while (soldRecord && soldRecord.amount) {
        const filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
        profit += calculateProfit(filteredBoughtRecords, value);

        soldRecordIndex = soldRecords.length - ++indexModificator;
        soldRecord = soldRecords[soldRecordIndex];
    }
    // const filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
    // const profit = calculateProfit(filteredBoughtRecords, value);
    changeProfitElValue(profit);
};


const addInputBlurFocusEvents = (input) => {
    const currencyClassName = 'current-price__currency';

    const symbolWidth = 9;
    const paddingLeft = 12;
    const spaceBetweenElements = 5;

    const top = 0;

    const addPseudoElement = () => {
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
    };

    input.addEventListener('blur', () => {
        addPseudoElement();
    });

    input.addEventListener('focus', () => {
        removePseudoElement({
            input: input,
            className: currencyClassName
        });
    });
};

const addPositionAveragingInputEvent = (input, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return 0;
        }

        changeAmountEl(entryPointsForm, exitPointsForm);
    });
};

const addProfitInputEvent = (input, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return 0;
        }

        changeProfitEl(entryPointsForm, exitPointsForm);
    });
};

// const addInputsEvents = (input, entryPointsForm, exitPointsForm) => {
//     const currencyClassName = 'current-price__currency';

//     const symbolWidth = 9;
//     const paddingLeft = 12;
//     const spaceBetweenElements = 5;

//     const top = 0;

//     input.addEventListener('input', () => {
//         const value = readInputValue(input);
//         if (!value) {
//             return 0;
//         }

//         // changeAmountEl(entryPointsForm, exitPointsForm);
//         changeProfitEl(entryPointsForm);
//     });

//     input.addEventListener('blur', () => {
//         const inputLength = input.offsetWidth;
//         const value = readInputValue(input);
//         const inputValueLength = value.toLocaleString().length;
//         const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements - inputLength;

//         if (value === 0) {
//             input.value = '';
//             return;
//         }

//         const span = createPseudoElement({
//             input: input,
//             textContent: '',
//             className: currencyClassName,
//             top: top + 'px',
//             left: left + 'px'
//         });
//         span.dataset.currency = currency;
//     });
//     input.addEventListener('focus', () => {
//         removePseudoElement({
//             input: input,
//             className: currencyClassName
//         });
//     });
// };
const currentPriceAmountInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
const desiredPriceAmountInput = document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');

const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    addInputBlurFocusEvents(desiredPriceAmountInput);
    addPositionAveragingInputEvent(desiredPriceAmountInput, entryPointsForm, exitPointsForm);

    addInputBlurFocusEvents(currentPriceAmountInput);
    addPositionAveragingInputEvent(currentPriceAmountInput, entryPointsForm, exitPointsForm);
    // addInputsEvents(desiredPriceAmountInput, entryPointsForm, exitPointsForm);
    // addInputsEvents(currentPriceAmountInput, entryPointsForm, exitPointsForm);
};

const addProfitInputEventListener = (entryPointsForm, exitPointsForm) => {
    addInputBlurFocusEvents(currentPriceProfitInput);
    addProfitInputEvent(currentPriceProfitInput, entryPointsForm, exitPointsForm);
    // addInputsEvents(currentPriceProfitInput, entryPointsForm, exitPointsForm);
};