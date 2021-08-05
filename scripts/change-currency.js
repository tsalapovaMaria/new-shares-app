const inputElements = document.querySelectorAll('.items__wrapper > input[type=radio]');
const currentCurrencyElement = document.querySelector('.current-container__value');
const tableSpanElements = document.querySelectorAll('.price-container__currency');

Array.from(inputElements).forEach(input =>
    input.addEventListener('change', () => {
        if (!input.checked) {
            return;
        }

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
            const priceInputs = document.querySelectorAll('.price-container__input');

            Array.from(priceInputs).forEach(
                input => {
                    input.placeholder = '0 ' + currency;
                }
            );

            const priceInputAverage = document.querySelectorAll('.current-price__input');
            Array.from(priceInputAverage).forEach(
                input => {
                    input.placeholder = '220 ' + currency;
                }
            );

            const desiredPriceInput = document.querySelector('.desired-price__input');
            desiredPriceInput.placeholder = '205 ' + currency;
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

        changeCurrency(input.value);

        currentCurrencyElement.textContent = input.value.toUpperCase();

        changePlaceholderCurrency();
        changeCurrencyElements();
        changePriceInputs();
    }));