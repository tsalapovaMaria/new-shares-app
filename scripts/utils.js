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
};

const changeCurrencyElements = () => {
    Array.from(currencyElements).forEach(
        element => {
            element.dataset.currency = currency;
        }
    );
};

const changePriceInputs = () => {
    Array.from(tableSpanElements).forEach(
        span => {
            span.textContent = currency;
        }
    );
};

const addElement = ({input, textContent, className, top, left} = {}) => {
    const value = Number(input.value.replace(/\s/g, ''));

    if (value !== value || value === 0) {
        input.value = '0';
    }

    const wrapperElement = input.parentElement;
    const element = document.createElement('span');

    element.className = className;   
    element.textContent = `${textContent}`;
    element.style.top = top;
    element.style.left = left;

    wrapperElement.append(element);
    input.value = value.toLocaleString();
};

const removeElement = ({input, className} = {}) => {
    const element = input.parentElement.querySelector(className);
    if (element) {
        element.remove();
    }
};