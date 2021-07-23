const amountInputs = document.querySelectorAll('.amount-container__input');
const priceInputs = document.querySelectorAll('.price-container__input');
let currency = '$';

const addElement = (input, textContent, className, top, left) => {
    const value = +(input.value.replace(/\s/g, ''));

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
const removeElement = (input, className) => {
    const element = input.parentElement.querySelector(className);
    if (element) {
        element.remove();
    }
};


Array.from(amountInputs).forEach(input =>
    input.addEventListener('blur',
        () => addElement(
            input,
            'шт',
            'amount-container__amounts',
            '8px',
            20 + String(input.value).length * 9 + 'px'
        )));
Array.from(amountInputs).forEach(input =>
    input.addEventListener('focus',
        () => removeElement(
            input,
            '.amount-container__amounts')
    ));
Array.from(priceInputs).forEach(input =>
    input.addEventListener('blur',
        () => addElement(
            input,
            currency,
            'price-container__currency',
            '7px',
            String(input.value).length * 11 / 2 + input.offsetWidth / 2 + 'px'
        )));
Array.from(priceInputs).forEach(input => 
    input.addEventListener('focus',
        () => removeElement(
            input,
            '.price-container__currency')
    ));