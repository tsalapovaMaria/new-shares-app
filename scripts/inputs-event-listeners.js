const amountInputs = document.querySelectorAll('.amount-container__input');
const priceInputs = document.querySelectorAll('.price-container__input');
const amountClassName = 'amount-container__amounts';
const priceClassName = 'price-container__currency';


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

Array.from(amountInputs).forEach(input => {
    input.addEventListener('blur',
        () => {
            readInputValue(input);
            addElement({
                input: input,
                textContent: 'шт',
                className: amountClassName,
                top: '8px',
                left: 20 + String(input.value).length * 9 + 'px'
            });
        });
    input.addEventListener('focus',
        () => {
            removeElement({
                input: input,
                className: amountClassName
            });
        }
    );
    input.addEventListener('input', () => {        
        changeBtnBehavior(input);
    });
});

Array.from(priceInputs).forEach(input => {
    input.addEventListener('blur',
        () => {
            readInputValue(input);

            const spanCurrency = addElement({
                input: input,
                textContent: '',
                className: priceClassName,
                top: '0px',
                left: String(input.value).length * 9 / 2 - input.offsetWidth / 2 + 'px'
            });
            spanCurrency.dataset.currency = currency;
        });
    input.addEventListener('focus',
        () => {
            removeElement({
                input: input,
                className: priceClassName
            });            
        }
    );
    input.addEventListener('input', () => {        
        changeBtnBehavior(input);
    });
});