const leadAmountToValid = (enteredValue) => {
    const validValue = enteredValue.replace(/\s/g, "");
    return Number(validValue);
};
const leadPriceToValid = (enteredValue) => {
    const validValue = enteredValue.replace(/\s/g, "").replace(',', '.');
    return Number(validValue);
};

const readInputValue = (input) => {
    let value = (input.className.includes('price'))? leadPriceToValid(input.value) : leadAmountToValid(input.value);
    if (value !== value || value === 0) {
        value = 0;
    }
    input.value = value.toLocaleString();
    return value;
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

    const value = (input.className.includes('price'))? leadPriceToValid(input.value) : leadAmountToValid(input.value);
    const siblingValue = (inputSibling.className.includes('price'))? leadPriceToValid(inputSibling.value) : leadAmountToValid(inputSibling.value);
    
    const isUnderZero = (value < 0) && (siblingValue < 0);
    const isZero = value && siblingValue;
    const isNaN = (value !== value) && (siblingValue !== siblingValue);

    if(!formContainer.nextElementSibling){
        return;
    }
    
    const btn = formContainer.nextElementSibling.querySelector('.btn-container__btn-add');
    btn.disabled = !isUnderZero && !isNaN && !isZero;
};

const calculateProfit = (form, currentPrice) => {
    const state = form.getState();

    const amountSum = Array.from(state)
        .map(item => item.amount)
        .reduce((prev, total) => prev + total, 0);
    const totalSum = Array.from(state)
        .map(item => item.total)
        .reduce((prev, amount) => prev + amount, 0);

    return (totalSum) - (amountSum * currentPrice);
};

const changeProfitEl = (profit) => {
    const profitEl = document.querySelector('.profit-value');
    profitEl.textContent =
        (profit > 0) ? `+ ${profit.toLocaleString()}` :
        (profit === 0) ? `${profit.toLocaleString()}` :
        `- ${Math.abs(profit).toLocaleString()}`;
};
const checkInputsValidate = () => {
    const desiredPrice = readInputValue(desiredPriceInput);
    const currentPrice = readInputValue(currentPriceInput);

    if (!desiredPrice || !currentPrice) {
        return false;
    }
    return [desiredPrice, currentPrice];
};

const calculateAmount = (desiredPrice, currentPrice) => {
    const entryState = entryPointsForm.getState();
    const exitState = exitPointsForm.getState();

    const entryAmountSum = Array.from(entryState).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    const exitAmountSum = Array.from(exitState).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);

    const restAmountSum = entryAmountSum - exitAmountSum;

    const priceEntrySum = Array.from(entryState).map(item => item.price).reduce((prev, curr) => prev + curr, 0);

    return ((restAmountSum * priceEntrySum) - (desiredPrice * restAmountSum)) / (desiredPrice - currentPrice);
};