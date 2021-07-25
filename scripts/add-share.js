const btns = document.querySelectorAll('.btn-container__btn-add');
const tbodyElement = document.querySelectorAll('.table-container__shares-table > tbody');
const trElements = document.querySelectorAll('.shares-table__shares-item');

Array.from(btns).forEach(
    (btn, id) => btn.addEventListener('click', () => {

        const amount = Number(amountInputs[id].value.replace(/\s/g, ''));
        const price = Number(priceInputs[id].value.replace(/\s/g, '').replace(',', '.'));

        const newTr = trElements[0].cloneNode(true);

        const firstTd = newTr.querySelector('.shares-item__first-value > span');
        const secTd = newTr.querySelector('.shares-item__sec-value > span');
        const thirdTd = newTr.querySelector('.shares-item__third-value > span');

        firstTd.innerText = amount.toLocaleString();
        secTd.innerText = price.toLocaleString();
        thirdTd.innerText = (amount * price).toLocaleString();

        amountInputs[id].value = '1';
        priceInputs[id].value = '215,3';

        tbodyElement[id].append(newTr);
        newTr.style.transform = 'scale(1.2)';
        newTr.style.opacity = 0.2;

        setTimeout(() => {
            newTr.style.transform = 'scale(1)';
            newTr.style.transition = '0.5s all';
            newTr.style.opacity = 1;
        }, 0);

        const deleteBtn = newTr.querySelector('.btn-container__delete-btn');

        addBtnsEventRemoveShare(deleteBtn, newTr);

        const emptyElements = document.querySelectorAll('.table-is-empty');

        const reachParentElement = (parent) => {
            while (parent.className !== 'shares-article__shares-container') {
                parent = parent.parentElement;
            }
        }

        if (emptyElements) {
            if (emptyElements.length === 1) {
                emptyElements[0].remove();
                return;
            }

            let emptyElementParent = emptyElements[0].parentElement;
            let btnParent = btn.parentElement;

            reachParentElement(btnParent);
            reachParentElement(emptyElementParent);

            if (emptyElementParent === btnParent) {
                emptyElements[0].remove();
                return;
            }

            emptyElements[1].remove();
        }
    }));