const amountInputElements = document.querySelectorAll('.amount-container__input');
const priceInputElements = document.querySelectorAll('.price-container__input');

const changeBtnBehavior = (input) => {
    const inputContainer = input.parentElement;

    const inputSiblingContainer =
        (inputContainer.nextElementSibling) ?
        inputContainer.nextElementSibling :
        inputContainer.previousElementSibling;

    const inputSibling = inputSiblingContainer.querySelector('INPUT');

    const formContainer = inputContainer.parentElement;

    const btn = formContainer.nextElementSibling?.querySelector('.btn-container__btn-add');

    const value = Number(input.value);
    const siblingValue = Number(inputSibling.value);

    const isAboveZero = value && siblingValue && value > 0 && siblingValue > 0;
    const isNumber = value === value && siblingValue === siblingValue;

    if (isAboveZero && isNumber) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

Array.from(amountInputElements).forEach(input => {
    input.addEventListener('input', () => changeBtnBehavior(input));
});
Array.from(priceInputElements).forEach(input => {
    input.addEventListener('input', () => changeBtnBehavior(input));
});