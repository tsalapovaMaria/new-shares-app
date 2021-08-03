const addEventListeners = ({
    form = null,
    element
}) => {
    const amountClassName = 'amount-container__amounts';
    const amountInputClassName = 'amount-container__input';

    const priceClassName = 'price-container__currency';
    const priceInputClassName = 'price-container__input';

    const rowClassName = 'shares-table__shares-item';
    const removedRowClassName = 'shares-table__shares-item-remove';


    return {
        addShareBtnsAddEventListener: function () {
            const btn = element.querySelector('.btn-container__btn-add');

            //добавление новой строки в таблицу при срабатывании onclick
            btn.addEventListener('click', () => {
                const amountContainer = element.querySelector(`.${amountInputClassName}`);
                const priceContainer = element.querySelector(`.${priceInputClassName}`);

                const amount = leadAmountToValid(amountContainer.value);
                const price = leadPriceToValid(priceContainer.value);

                const tr = form.addRecord(amount, price);
                const trID = form.state[form.state.length - 1].id;

                const tbody = element.querySelector('TBODY');
                const purchases = element.querySelector('.table-is-empty');
                if (purchases) {
                    purchases.remove();
                }

                tbody.append(tr);

                // использование setTimeout для анимации 
                // появления элемента

                setTimeout(() => {
                    tr.className = rowClassName;
                }, 0);

                //очистка форм после добавления новой строки
                const currencyEl = element.querySelector('.price-container__currency');
                const amountEl = element.querySelector('.amount-container__amounts');

                amountContainer.value = '0';
                priceContainer.value = '0';
                btn.disabled = true;
                amountEl.style.left = '29px';
                currencyEl.style.left = '-70px';

                //добавление события onclick для кнопки удаления строки таблицы
                const deleteRowBtn = tr.querySelector('.btn-container__delete-btn');
                deleteRowBtn.onclick = () => {
                    form.removeRecord(trID);

                    const removeRow = () => {
                        tr.className += ` ${removedRowClassName}`;
                        // использование setTimeout для анимации удаления элемента 

                        setTimeout(() => {
                            tr.remove();

                            // ЕСЛИ в таблице нет данных (пусто)
                            // ТОГДА добавить новый элемент, указывающий, что таблица пуста

                            if (tbody.children.length !== 0) {
                                return;
                            }

                            const element = createElement('DIV', 'table-is-empty');
                            element.textContent = 'НЕТ ПОКУПОК';
                            tbody.append(element);

                            element.style.left = tbody.offsetWidth / 2 - element.offsetWidth / 2 + 'px';
                            tbody.className = 'empty-table';
                            element.className = 'table-is-empty';
                        }, 250);
                    };

                    removeRow();
                };
            });
        },
        amountTransparentClickAddEventListener: function () {
            const span = element.querySelector(`.${amountClassName}`);
            if (!span) {
                return;
            }

            const input = element.querySelector(`.${amountInputClassName}`);

            span.addEventListener('click', (e) => {
                const target = e.target;

                if (!target.closest('.shares-form-inputs__amount-container')) {
                    return;
                }
                input.focus();
            });
        },
        priceTransparentClickAddEventListener: function () {
            const span = element.querySelector(`.${priceClassName}`);
            if (!span) {
                return;
            }

            const input = element.querySelector(`.${priceInputClassName}`);

            span.addEventListener('click', (e) => {
                const target = e.target;

                if (!target.closest('.shares-form-inputs__amount-container')) {
                    return;
                }
                input.focus();
            });
        },
    };
};

const handleEventListeners = (form, element) => {

    // addEventListeners({
    //     form: form,
    //     element: element
    // }).addShareBtnsAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).amountTransparentClickAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).priceTransparentClickAddEventListener();

}