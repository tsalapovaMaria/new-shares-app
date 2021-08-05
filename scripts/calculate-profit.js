
const addProfitInputEventListener = (form) => {
    const input = document.querySelector('.current-price__input');

    input.addEventListener('input', () => {
        const value = readInputValue(input);

        if (!value) {
            return;
        }

        const profit = calculateProfit(form, value);
        changeProfitEl(profit);
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