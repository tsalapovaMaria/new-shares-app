const inputElements = document.querySelectorAll('.items > div > input[type=radio]');
const currentCurrencyElement = document.querySelector('#text > div');
const tableSpanElements = document.querySelectorAll('.price-container__currency');

console.log(inputElements);
console.log(currentCurrencyElement);
console.log(tableSpanElements);

Array.from(inputElements).forEach(input => 
    input.addEventListener('change', () => {
        if(!input.checked){
            return;
        }
        changeCurrency(input.value);
        currentCurrencyElement.textContent = input.value.toUpperCase();

        changePlaceholderCurrency();
        changeCurrencyElements();
        changePriceInputs();
}));