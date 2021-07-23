const amountInputs = document.querySelectorAll('.amount-container__input');
const priceInputs = document.querySelectorAll('.price-container__input');
const amountClassName = 'amount-container__amounts';
const priceClassName = 'price-container__currency';

let currency = '$';

Array.from(amountInputs).forEach(input => {
    input.addEventListener('blur',
        () => {
            readInputValue(input);
            addElement({
                input: input,
                textContent: 'шт',
                className: amountClassName,
                top: '8px',
                left: 20 + String(input.value).length * 9 + 'px'
            });
        });
    input.addEventListener('focus',
        () => removeElement({
            input: input,
            className: amountClassName
        })
    );
});

Array.from(priceInputs).forEach(input => {
    input.addEventListener('blur',
        () => {
            readInputValue(input);
            addElement({
                input: input,
                textContent: currency,
                className: priceClassName,
                top: '7px',
                left: String(input.value).length * 11 / 2 + input.offsetWidth / 2 + 'px'
            });
        });
    input.addEventListener('focus',
        () => removeElement({
            input: input,
            className: priceClassName
        })
    );
});