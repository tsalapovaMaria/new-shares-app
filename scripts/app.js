const entryPoints = form.createForm('Точки входа');
const exitPoints = form.createForm('Точки выхода');

const addShareBtnElements = document.querySelectorAll('btn-container__btn-add');

Array.from(addShareBtnElements).forEach(btn => {
    const btnContainer = btn.parentElement;
    const inputContainer = btnContainer.previousElementSibling;

    const amountInput = inputContainer.querySelector('amount-container__input');
    const priceInput = inputContainer.querySelector('price-container__input');

    if(!amountInput.value || !priceInput.value){
        btn.disabled = true;
    }
    console.log(!amountInput.value || !priceInput.value);

    btn.addEventListener('click', () => {
        console.log('hello');
    });
});