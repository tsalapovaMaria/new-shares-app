const inputElements = document.querySelectorAll('.items > input[type=radio]');
const currentCurrencyElement = document.querySelector('#text > div');
const currencyElements = document.querySelectorAll('[data-currency]');

console.log(currencyElements);

const changeCurrency = (id) => {
    switch(id){
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
    const currencySpanElements = document.querySelectorAll('.price-container__currency');
    Array.from(currencySpanElements).forEach(
        span => {
            span.textContent = currency;
        }
    );
}

Array.from(inputElements).forEach(radioBtn => 
    radioBtn.addEventListener('change', () => {
        if(radioBtn.checked){
            changeCurrency(radioBtn.id);
            currentCurrencyElement.textContent = radioBtn.id.toUpperCase();

            changePlaceholderCurrency();
            changeCurrencyElements();
            changePriceInputs();
        }
}));