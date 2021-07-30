// const addButtons = document.querySelectorAll('.btns__add-btn');
// const removeButtons = document.querySelectorAll('.btns__remove-btn');

// const inputs = document.querySelectorAll('.amount-container__input');

// Array.from(addButtons).forEach(
//     (btn, id) => btn.addEventListener('click', () => {
//         const value = Number(inputs[id]?.value?.replace(/\s/g, "").replace(',', '.'));

//         inputs[id].value = (value + 1).toLocaleString();
//         changeBtnBehavior(inputs[id]);
//         removeElement({
//             input: inputs[id],
//             className: amountClassName
//         });
//         addElement({
//             input: inputs[id],
//             textContent: 'шт',
//             className: amountClassName,
//             top: '8px',
//             left: 20 + String(inputs[id].value).length * 9 + 'px'
//         });
// }));

// Array.from(removeButtons).forEach(
//     (btn, id) => btn.addEventListener('click', () => {
//         const value = Number(inputs[id]?.value?.replace(/\s/g, "").replace(',', '.'));
//         if (value === 1 || value === 0) {
//             return;
//         }

//         inputs[id].value = (value - 1).toLocaleString();
//         changeBtnBehavior(inputs[id]);
//         removeElement({
//             input: inputs[id],
//             className: amountClassName
//         });
//         addElement({
//             input: inputs[id],
//             textContent: 'шт',
//             className: amountClassName,
//             top: '8px',
//             left: 20 + String(inputs[id].value).length * 9 + 'px'
//         });
// }));


// const amountInputElements = document.querySelectorAll('.amount-container__input');
// const priceInputElements = document.querySelectorAll('.price-container__input');

// const changeBtnBehavior = (input) => {
//     const inputContainer = input.parentElement;

//     const inputSiblingContainer =
//         (inputContainer.nextElementSibling) ?
//         inputContainer.nextElementSibling :
//         inputContainer.previousElementSibling;

//     const inputSibling = inputSiblingContainer.querySelector('INPUT');

//     const formContainer = inputContainer.parentElement;

//     const btn = formContainer.nextElementSibling?.querySelector('.btn-container__btn-add');

//     const value = Number(input.value);
//     const siblingValue = Number(inputSibling.value);

//     const isAboveZero = value && siblingValue && value > 0 && siblingValue > 0;
//     const isNumber = value === value && siblingValue === siblingValue;

//     if (isAboveZero && isNumber) {
//         btn.disabled = false;
//     } else {
//         btn.disabled = true;
//     }
// };

// Array.from(amountInputElements).forEach(input => {
//     input.addEventListener('input', () => changeBtnBehavior(input));
// });
// Array.from(priceInputElements).forEach(input => {
//     input.addEventListener('input', () => changeBtnBehavior(input));
// });