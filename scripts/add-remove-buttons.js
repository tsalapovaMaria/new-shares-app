const addButtons = document.querySelectorAll('.btns__add-btn');
const removeButtons = document.querySelectorAll('.btns__remove-btn');

const inputs = document.querySelectorAll('.amount-container__input');

Array.from(addButtons).forEach(
    (btn, id) => btn.addEventListener('click', () => {
        const value = +inputs[id].value.replace(/\s/g, "");

        inputs[id].value = (value + 1).toLocaleString();
        removeElement(
            inputs[id],
            '.amount-container__amounts');
        addElement(
            inputs[id],
            'шт',
            'amount-container__amounts',
            '8px',
            20 + String(inputs[id].value).length * 9 + 'px'
        );
    }));

Array.from(removeButtons).forEach(
    (btn, id) => btn.addEventListener('click', () => {
        const value = +inputs[id].value.replace(/\s/g, "");

        inputs[id].value = (value - 1).toLocaleString();
        removeElement(
            inputs[id],
            '.amount-container__amounts');
        addElement(
            inputs[id],
            'шт',
            'amount-container__amounts',
            '8px',
            20 + String(inputs[id].value).length * 9 + 'px'
        );
    }));