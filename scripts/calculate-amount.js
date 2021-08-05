const addPosAveragingEvent = (entryPointsForm, exitPointsForm) => {
    const currentPriceInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
    const desiredPriceInput = document.querySelector('.desired-price__input');

    desiredPriceInput.addEventListener('input', () => {
        const userValuesEntered = checkInputsValidate();
        if (!userValuesEntered) {
            return;
        }

        const [desiredPrice, currentPrice] = userValuesEntered;
        const amountToBuy = calculateAmount(desiredPrice, currentPrice);

        const amountToBuyEl = document.querySelector('.shares-amount__amount-output');
        amountToBuyEl.textContent = Math.ceil(amountToBuy).toLocaleString() + ' шт';
    });

    currentPriceInput.addEventListener('input', () => {
        const userValuesEntered = checkInputsValidate();
        if (!userValuesEntered) {
            return;
        }

        const [desiredPrice, currentPrice] = userValuesEntered;
        const amountToBuy = calculateAmount(desiredPrice, currentPrice);

        const amountToBuyEl = document.querySelector('.shares-amount__amount-output');
        amountToBuyEl.textContent = Math.abs(amountToBuy).toLocaleString() + ' шт';
    });
}