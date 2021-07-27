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

    if (input.value && inputSibling.value){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

Array.from(amountInputElements).forEach(input => {
    input.addEventListener('input', () => {
        changeBtnBehavior(input);
    });
});
Array.from(priceInputElements).forEach(input => {
    input.addEventListener('input', () => changeBtnBehavior(input));
});