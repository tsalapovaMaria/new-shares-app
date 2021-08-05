const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
    const desiredPriceInput = document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');
    
    const addInputsEvents = (input) => {
        input.addEventListener('input', () => {
            const value = readInputValue(input);
    
            if (!value) {
                return;
            }
    
            changeAmountEl(entryPointsForm, exitPointsForm);
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
    addInputsEvents(desiredPriceInput);
    addInputsEvents(currentPriceInput);
};
