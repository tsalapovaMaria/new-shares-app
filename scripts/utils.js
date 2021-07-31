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
    Array.from(priceInputs).forEach(
        input => {
            input.placeholder = '0 ' + currency;
        }
    );
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

const readInputValue = (input) => {
    let value = Number(input.value.replace(/\s/g, '').replace(',', '.'));
    if (value !== value || value === 0) {
        value = 0;
    }
    input.value = value.toLocaleString();
}

const createElement = (tag, {
    className,
    dataAttr,
    textContent,
    placeholder,
    type
} = {}, children = []) => {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }
    if (dataAttr) {
        element.dataset.currency = dataAttr;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (placeholder) {
        element.placeholder = placeholder;
    }
    if (type) {
        element.type = type;
    }
    if (children.length !== 0) {
        children.forEach(child => element.append(child));
    }
    return element;
};

const addElement = ({
    input,
    textContent,
    className,
    top,
    left
} = {}) => {
    const wrapperElement = input.parentElement;
    const element = document.createElement('span');

    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = `${textContent}`;
    }
    if (top) {
        element.style.top = top;
    }
    if (left) {
        element.style.left = left;
    }
    wrapperElement.append(element);

    element.addEventListener('click', (e) => {
        if (!e.target.closest(`.${input.parentElement.className}`)) {
            return;
        }
        input.focus();
    });
    return element;
};

const removeElement = ({
    input,
    className
} = {}) => {
    const element = input.parentElement.querySelector(`.${className}`);
    if (element) {
        element.remove();
    }
};

const changeBtnBehavior = (input) => {
    const inputContainer = input.parentElement;

    const inputSiblingContainer =
        (inputContainer.nextElementSibling) ?
        inputContainer.nextElementSibling :
        inputContainer.previousElementSibling;

    const inputSibling = inputSiblingContainer.querySelector('INPUT');

    const formContainer = inputContainer.parentElement;

    const btn = formContainer.nextElementSibling?.querySelector('.btn-container__btn-add');

    const value = Number(input.value.replace(/\s/g, ""));
    const siblingValue = Number(inputSibling.value.replace(/\s/g, ""));

    const isAboveZero = value && siblingValue && value > 0 && siblingValue > 0;
    const isNumber = value === value && siblingValue === siblingValue;

    if (isAboveZero && isNumber) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
};