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

    const inputsEventListeners = ({
        className,
        textContent,
        inputClassName
    } = {}) => {
        const input = element.querySelector(`.${inputClassName}`);
        const inputLength = input.offsetWidth;

        const symbolWidth = 9;

        const paddingLeft = 17;
        const spaceBetweenElements = 5;

        input.addEventListener('blur',
            () => {                
                const value = readInputValue(input);
                const inputValueLength = value.length;

                const top = inputClassName === amountInputClassName ? 8 : 0;
                const left = inputClassName === amountInputClassName ?
                    paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements :
                    (inputValueLength * symbolWidth) / 2 - inputLength / 2;

                const span = addElement({
                    input: input,
                    textContent: textContent,
                    className: className,
                    top: top + 'px',
                    left: left + 'px'
                });
                if (input.className !== priceInputClassName) {
                    return;
                }
                span.dataset.currency = currency;
            });

        input.addEventListener('focus',
            () => {
                removeElement({
                    input: input,
                    className: className
                });
            }
        );

        input.addEventListener('input', () => {
            changeBtnBehavior(input);
        });
    };

    return {
        amountInputAddEventListener: function () {
            const top = 8;

            inputsEventListeners({
                top: top,
                className: amountClassName,
                textContent: 'шт',
                inputClassName: amountInputClassName
            });
        },
        priceInputAddEventListener: function () {
            const top = 0;

            inputsEventListeners({
                top: top,
                className: priceClassName,
                textContent: '',
                inputClassName: priceInputClassName
            });
        },
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
        addAmountBtnAddEventListener: function () {
            const symbolWidth = 9;
    
            const paddingLeft = 17;
            const spaceBetweenElements = 5;
            
            const btn = element.querySelector('.btns__add-btn');
            const input = element.querySelector(`.${amountInputClassName}`);
            btn.addEventListener('click', () => {
                const value = leadAmountToValid(input.value);

                input.value = (value + 1).toLocaleString();
                const inputValueLength = value.length;

                changeBtnBehavior(input);
                removeElement({
                    input: input,
                    className: amountClassName
                });
                addElement({
                    input: input,
                    textContent: 'шт',
                    className: amountClassName,
                    top: '8px',
                    left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
                });
            })
        },
        subAmountBtnAddEventListener: function () {
            const symbolWidth = 9;
    
            const paddingLeft = 17;
            const spaceBetweenElements = 5;
            
            const btn = element.querySelector('.btns__remove-btn');
            const input = element.querySelector(`.${amountInputClassName}`);

            btn.addEventListener('click', () => {
                const value = leadAmountToValid(input.value);
                if (value === 1 || value === 0) {
                    return;
                }

                input.value = (value - 1).toLocaleString();
                const inputValueLength = value.length;

                changeBtnBehavior(input);
                removeElement({
                    input: input,
                    className: amountClassName
                });
                addElement({
                    input: input,
                    textContent: 'шт',
                    className: amountClassName,
                    top: '8px',
                    left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
                });
            })
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

    addEventListeners({
        form: form,
        element: element
    }).amountInputAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).priceInputAddEventListener();


    addEventListeners({
        form: form,
        element: element
    }).addShareBtnsAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).addAmountBtnAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).subAmountBtnAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).amountTransparentClickAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).priceTransparentClickAddEventListener();

}