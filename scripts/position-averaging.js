

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

const addPositionAveragingInputEvent = (input, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return 0;
        }

        changeAmountEl(entryPointsForm, exitPointsForm);
    });
};

const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    addInputBlurFocusEvents(desiredPriceAmountInput);
    addPositionAveragingInputEvent(desiredPriceAmountInput, entryPointsForm, exitPointsForm);

    addInputBlurFocusEvents(currentPriceAmountInput);
    addPositionAveragingInputEvent(currentPriceAmountInput, entryPointsForm, exitPointsForm);
};
