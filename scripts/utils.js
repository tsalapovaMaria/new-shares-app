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

const readInputValue = (input) => {
    let value = Number(input.value.replace(/\s/g, '').replace(',', '.'));
    if (value !== value || value === 0) {
        value = 1;
    }
    input.value = value.toLocaleString();
}

const createNewElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
};

const addElement = ({input, textContent, className, top, left} = {}) => {
    const wrapperElement = input.parentElement;
    const element = document.createElement('span');

    element.className = className;   
    element.textContent = `${textContent}`;
    element.style.top = top;
    element.style.left = left;

    wrapperElement.append(element);

    element.addEventListener('click', (e) => {
        if(!e.target.closest(`.${input.parentElement.className}`)){
            return;
        }
        input.focus();
    });
};

const removeElement = ({input, className} = {}) => {
    const element = input.parentElement.querySelector(`.${className}`);
    if (element) {
        element.remove();
    }
};