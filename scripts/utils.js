const leadAmountToValid = (enteredValue) => {
    const validValue = enteredValue.replace(/\s/g, "");
    return Number(validValue);
};
const leadPriceToValid = (enteredValue) => {
    const validValue = enteredValue.replace(/\s/g, "").replace(',', '.');
    return Number(validValue);
};

const readInputValue = (input) => {
    let value = (input.className.includes('price')) ? leadPriceToValid(input.value) : leadAmountToValid(input.value);
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
