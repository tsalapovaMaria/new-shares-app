const btns = document.querySelectorAll('.btn-container__btn-add');
const tbody = document.querySelectorAll('.table-container__shares-table > tbody');
const tr = document.querySelector('.shares-table__shares-item');

Array.from(btns).forEach(
    (btn, id) => btn.addEventListener('click', () => {
        const amount = Number(amountInputs[id].value.replace(/\s/g, ''));
        const price = Number(priceInputs[id].value.replace(/\s/g, '').replace(',', '.'));

        const newTr = tr.cloneNode(true);

        const firstTd = newTr.querySelector('.shares-item__first-value > span');
        const secTd =  newTr.querySelector('.shares-item__sec-value > span');
        const thirdTd =  newTr.querySelector('.shares-item__third-value > span');

        firstTd.innerText = amount.toLocaleString();
        secTd.innerText = price.toLocaleString();
        thirdTd.innerText = (amount * price).toLocaleString();

        tbody[id].append(newTr);
}));