const inputElements = document.querySelectorAll('.items > input[type=radio]');
const currentCurrencyElement = document.querySelector('#text > div');
const currencyElements = document.querySelectorAll('[data-currency]');
const tableSpanElements = document.querySelectorAll('.price-container__currency');

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