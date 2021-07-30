const amountSpanElements = document.querySelectorAll(`.amount-container__amounts`);
const priceSpanElements = document.querySelectorAll(`.price-container__currency`);

Array.from(amountSpanElements).forEach(
    (span, id) => span.addEventListener('click', (e) => {
        const target = e.target;

        if(!target.closest('.shares-form-inputs__amount-container')){
            return;
        }
        amountInputs[id].focus();
}));


Array.from(priceSpanElements).forEach(
    (span, id) => span.addEventListener('click', (e) => {
        const target = e.target;

        if(!target.closest('.shares-form-inputs__price-container')){
            return;
        }
        priceInputs[id].focus();
}));