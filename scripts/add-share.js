const btns = document.querySelectorAll('.btn-container__btn-add');

const createNewElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

Array.from(btns).forEach(
    (btn, id) => btn.addEventListener('click', (e) => {
        e.preventDefault();

        const amount = +amountInputs[id].value.replace(/\s/g, '');
        const price = +priceInputs[id].value.replace(/\s/g, '');

        const tbody = document.querySelectorAll('.table-container__shares-table > tbody');
        const tr = document.querySelector('.shares-table__shares-item');

        const newTr = tr.cloneNode(true);

        const firstTd = newTr.childNodes[1].childNodes[1];
        const secTd = newTr.childNodes[3].childNodes[1];
        const thirdTd = newTr.childNodes[5].childNodes[1];

        firstTd.innerText = amount.toLocaleString();
        secTd.innerText = price.toLocaleString();
        thirdTd.innerText = (amount * price).toLocaleString();

        tbody[id].append(newTr);
        btn.active = 'false';
        btn.default = 'true';
}));