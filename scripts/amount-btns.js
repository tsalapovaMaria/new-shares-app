const addButtons = document.querySelectorAll('.btns__add-btn');
const removeButtons = document.querySelectorAll('.btns__remove-btn');

const inputs = document.querySelectorAll('.amount-container__input');

Array.from(addButtons).forEach(
    (btn, id) => btn.addEventListener('click', () => {
        const value = Number(inputs[id]?.value?.replace(/\s/g, "").replace(',', '.'));

        inputs[id].value = (value + 1).toLocaleString();
        
        removeElement({
            input: inputs[id],
            className: amountClassName
        });
        addElement({
            input: inputs[id],
            textContent: 'шт',
            className: amountClassName,
            top: '8px',
            left: 20 + String(inputs[id].value).length * 9 + 'px'
        });
    }));

Array.from(removeButtons).forEach(
    (btn, id) => btn.addEventListener('click', () => {
        const value = Number(inputs[id]?.value?.replace(/\s/g, "").replace(',', '.'));
        if (value === 1 || value === 0) {
            return;
        }

        inputs[id].value = (value - 1).toLocaleString();
        removeElement({
            input: inputs[id],
            className: amountClassName
        });
        addElement({
            input: inputs[id],
            textContent: 'шт',
            className: amountClassName,
            top: '8px',
            left: 20 + String(inputs[id].value).length * 9 + 'px'
        });
    }));