const addPosAveragingEvent = (input, siblingInput, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);

        if (!value) {
            return;
        }

        const amountToBuy = calculateAmount(input, siblingInput, entryPointsForm, exitPointsForm);
        changeAmountEl(amountToBuy);
    });

    const currencyClassName = 'current-price__currency';
    const symbolWidth = 9;
    const paddingLeft = 12;
    const spaceBetweenElements = 5;

    const top = 0;

    input.addEventListener('blur', () => {
        const inputLength = input.offsetWidth;
        const value = readInputValue(input);
        const inputValueLength = value.toLocaleString().length;
        const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements - inputLength;

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

const addAveragePosInputsEvent = (entryPointsForm, exitPointsForm) => {
    const desiredPriceInput = document.querySelector('.desired-price__input');
    const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');

    addPosAveragingEvent(desiredPriceInput, currentPriceInput, entryPointsForm, exitPointsForm);
    addPosAveragingEvent(desiredPriceInput, currentPriceInput, entryPointsForm, exitPointsForm);
};