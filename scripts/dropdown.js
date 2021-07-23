const inputElements = document.querySelectorAll('.items > input[type=radio]');
const currentCurrencyElement = document.querySelector('#text > div');
const currencyElements = document.querySelectorAll('[data-currency]');
const tableSpanElements = document.querySelectorAll('.price-container__currency');

const changeCurrency = (inputValue) => {
    switch(inputValue){
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
    Array.from(priceInputs).forEach(
        input => {
            input.placeholder = '215,3 ' + currency;
        }
    );
}
const changeCurrencyElements = () => {
    Array.from(currencyElements).forEach(
        element => {
            element.dataset.currency = currency;
        }
    );
}
const changePriceInputs = () => {
    Array.from(tableSpanElements).forEach(
        span => {
            span.textContent = currency;
        }
    );
}

Array.from(inputElements).forEach(input => 
    input.addEventListener('change', () => {
        if(input.checked){
            changeCurrency(input.value);
            currentCurrencyElement.textContent = input.value.toUpperCase();

            changePlaceholderCurrency();
            changeCurrencyElements();
            changePriceInputs();
        }
}));