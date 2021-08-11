const amountToBuy = amountToBuyCounter();

const desiredPriceInput = document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');
const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');

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

const changeAmountToBuyValue = function(entryPointsForm, exitPointsForm) {
    const userValuesEntered = checkInputsValidate();

    if (!userValuesEntered) {
        return;
    }

    const amountToBuyEl = document.querySelector('.shares-amount__amount-output');
    const amountToBuyValue = amountToBuy.count(userValuesEntered, entryPointsForm, exitPointsForm);

    amountToBuyEl.textContent = (amountToBuyValue > 0 && Number.isFinite(amountToBuyValue)) ? Math.ceil(amountToBuyValue).toLocaleString() + ' шт' : '0 шт';
};

const addPositionAveragingInputEvent = (input, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return 0;
        }

        changeAmountToBuyValue(entryPointsForm, exitPointsForm);
    });
};

const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    addInputBlurFocusEvents(desiredPriceInput);
    addPositionAveragingInputEvent(desiredPriceInput, entryPointsForm, exitPointsForm);

    addInputBlurFocusEvents(currentPriceInput);
    addPositionAveragingInputEvent(currentPriceInput, entryPointsForm, exitPointsForm);
};
