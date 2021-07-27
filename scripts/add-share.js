// const btns = document.querySelectorAll('.btn-container__btn-add');
// const tbodyElements = document.querySelectorAll('.table-container__shares-table > tbody');
// let trElements = document.querySelectorAll('.shares-table__shares-item');

// const trClassName = 'shares-table__shares-item';
// const tdClassName = 'shares-item__value';

// const firstTdClassName = 'shares-item__first-value';
// const secTdClassName = 'shares-item__sec-value';
// const thirdTdClassName = 'shares-item__third-value';
// const forthTdClassName = 'shares-item__forth-value';

// const btnClassName = 'btn-container__delete-btn';

// Array.from(btns).forEach(
//     (btn, id) => btn.addEventListener('click', () => {

//         const amount = Number(amountInputs[id]?.value.replace(/\s/g, ''));
//         const price = Number(priceInputs[id]?.value.replace(/\s/g, '').replace(',', '.'));

//         if(trElements.length === 0 ){
//             createTableRow( );
//             trElements = document.querySelector('.shares-table__shares-item');
//         }
//         const newTr = trElements[0].cloneNode(true);

//         const firstTd = newTr.querySelector(`${firstTdClassName} > span`);
//         const secTd = newTr.querySelector(`${secTdClassName} > span`);
//         const thirdTd = newTr.querySelector(`${thirdTdClassName} > span`);

//         firstTd.innerText = amount.toLocaleString();
//         secTd.innerText = price.toLocaleString();
//         thirdTd.innerText = (amount * price).toLocaleString();

//         tbodyElement[id].append(newTr);
//         newTr.className = 'shares-table__shares-item-add';
//         // newTr.style.transform = 'scale(1.2)';
//         // newTr.style.opacity = 0.2;

//         setTimeout(() => {
//             newTr.className = 'shares-table__shares-item';
//             // newTr.style.transform = 'scale(1)';
//             // newTr.style.transition = '0.5s all';
//             // newTr.style.opacity = 1;
//         }, 0);

//         const deleteBtn = newTr.querySelector('.btn-container__delete-btn');

//         addBtnsEventRemoveShare(deleteBtn, newTr);

//         const emptyElements = document.querySelectorAll('.table-is-empty');

//         const reachParentElement = (parent) => {
//             while (parent.className !== 'shares-article__shares-container') {
//                 parent = parent.parentElement;
//             }
//         }

//         if (emptyElements) {
//             if (emptyElements.length === 1) {
//                 emptyElements[0].remove();
//                 return;
//             }

//             let emptyElementParent = emptyElements[0].parentElement;
//             let btnParent = btn.parentElement;

//             reachParentElement(btnParent);
//             reachParentElement(emptyElementParent);

//             if (emptyElementParent === btnParent) {
//                 emptyElements[0].remove();
//                 return;
//             }

//             emptyElements[1].remove();
//         }
//     }));