const inputElements = document.querySelectorAll('.items__wrapper > input[type=radio]');
const currentCurrencyElement = document.querySelector('.current-container__value');
const tableSpanElements = document.querySelectorAll('.price-container__currency');


const changeCurrency = (inputValue) => {
    switch (inputValue) {
        case 'usd':
            currency = '$';
            break;
        case 'eur':
            currency = '€';
            break;
        case 'rub':
            currency = '₽';
            break;
    }
};

const changePlaceholderCurrency = () => {
    const changePlaceholder = (value, input) => {
        input.placeholder = `${value} ${currency}`;
    }
    const priceInputs = document.querySelectorAll('.price-container__input');

    Array.from(priceInputs).forEach(
        input => {
            changePlaceholder(0, input);
        }
    );

    const priceInputAverage = document.querySelectorAll('.current-price__input');
    Array.from(priceInputAverage).forEach(
        input => {
            changePlaceholder(200, input);
        }
    );

    const desiredPriceInput = document.querySelector('.desired-price__input');
    changePlaceholder(205, desiredPriceInput);
};

const changeCurrencyElements = () => {
    const currencyElements = document.querySelectorAll('[data-currency]');

    Array.from(currencyElements).forEach(
        element => {
            element.dataset.currency = currency;
        }
    );
};

const changePriceInputs = () => {
    Array.from(tableSpanElements).forEach(
        span => {
            span.dataset.currency = currency;
        }
    );
};

Array.from(inputElements).forEach(input =>
    input.addEventListener('change', () => {
        if (!input.checked) {
            return;
        }
        changeCurrency(input.value);

        currentCurrencyElement.textContent = input.value.toUpperCase();

        changePlaceholderCurrency();
        changeCurrencyElements();
        changePriceInputs();
    }));