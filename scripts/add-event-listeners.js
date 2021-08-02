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
        amountInputAddEventListener: function () {
            const input = element.querySelector(`.${amountInputClassName}`);

            // функция добавления элемент с текстом "шт" на срабатывании event blur
            const addBlurEvent = () => {
                const paddingLeft = 17;
                const spaceBetweenElements = 5;

                const inputValueLength = String(input.value).length;                
                const symbolWidth = 9;

                input.addEventListener('blur',
                    () => {
                        readInputValue(input);
                        addElement({
                            input: input,
                            textContent: 'шт',
                            className: amountClassName,
                            top: '8px',
                            left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
                        });
                    });
            };
            addBlurEvent();

            // функция изъятия элемента с текстом "шт" на срабатывании event focus
            const addFocusEvent = () => {
                input.addEventListener('focus',
                    () => {
                        removeElement({
                            input: input,
                            className: amountClassName
                        });
                    }
                );
            };
            addFocusEvent();

            //функция изменения поведения свойства disable для кнопки "Добавить"
            //в зависимости от значения в полях input
            //на срабатывании event input
            const addInputEvent = () => {
                input.addEventListener('input', () => {
                    changeBtnBehavior(input);
                });
            };
            addInputEvent();
        },
        priceInputAddEventListener: function () {
            const input = element.querySelector(`.${priceInputClassName}`);

            // функция добавления валюты на срабатывании event blur
            const addBlurEvent = () => {
                const inputValueLength = String(input.value).length;                
                const symbolWidth = 9;

                const inputLength = input.offsetWidth;

                input.addEventListener('blur',
                    () => {
                        readInputValue(input);
                        const spanCurrency = addElement({
                            input: input,
                            textContent: '',
                            className: priceClassName,
                            top: '0px',
                            left: (inputValueLength * symbolWidth) / 2 - inputLength / 2 + 'px'
                        });
                        spanCurrency.dataset.currency = currency;
                    });
            };
            addBlurEvent();

            // функция изъятия элемента с валютой на срабатывании event focus
            const addFocusEvent = () => {
                input.addEventListener('focus',
                    () => {
                        removeElement({
                            input: input,
                            className: priceClassName
                        });
                    }
                );
            };
            addFocusEvent();

            //функция изменения поведения свойства disable для кнопки "Добавить"
            //в зависимости от значения в полях input
            //на срабатывании event input
            const addInputEvent = () => {
                input.addEventListener('input', () => {
                    changeBtnBehavior(input);
                });
            };
            addInputEvent();
        },
        addShareBtnsAddEventListener: function () {
            const btn = element.querySelector('.btn-container__btn-add');

            //добавление новой строки в таблицу при срабатывании onclick
            btn.addEventListener('click', () => {
                const amountContainer = element.querySelector(`.${amountInputClassName}`);
                const priceContainer = element.querySelector(`.${priceInputClassName}`);

                const amount = Number(amountContainer.value.replace(/\s/g, "").replace(',', '.'));
                const price = Number(priceContainer.value.replace(/\s/g, ""));

                const tr = form.addRecord(amount, price);
                const trID = form.state[form.state.length - 1].id;

                const tbody = element.querySelector('TBODY');
                const purchases = element.querySelector('.table-is-empty');
                purchases?.remove();

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
            const btn = element.querySelector('.btns__add-btn');
            const input = element.querySelector(`.${amountInputClassName}`);
            btn.addEventListener('click', () => {
                const value = Number(input.value?.replace(/\s/g, "").replace(',', '.'));

                input.value = (value + 1).toLocaleString();
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
                    left: 20 + String(input.value).length * 9 + 'px'
                });
            })
        },
        subAmountBtnAddEventListener: function () {
            const btn = element.querySelector('.btns__remove-btn');
            const input = element.querySelector(`.${amountInputClassName}`);

            btn.addEventListener('click', () => {
                const value = Number(input.value?.replace(/\s/g, "").replace(',', '.'));
                if (value === 1 || value === 0) {
                    return;
                }

                input.value = (value - 1).toLocaleString();
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
                    left: 20 + String(input.value).length * 9 + 'px'
                });
            })
        },
        amountTransparentClickAddEventListener: function () {
            const span = element.querySelector(`.${amountClassName}`);
            const input = element.querySelector(`.${amountInputClassName}`);

            span?.addEventListener('click', (e) => {
                const target = e.target;

                if (!target.closest('.shares-form-inputs__amount-container')) {
                    return;
                }
                input.focus();
            });
        },
        priceTransparentClickAddEventListener: function () {
            const span = element.querySelector(`.${priceClassName}`);
            const input = element.querySelector(`.${priceInputClassName}`);

            span?.addEventListener('click', (e) => {
                const target = e.target;

                if (!target.closest('.shares-form-inputs__amount-container')) {
                    return;
                }
                input.focus();
            });
        },
    };
};

const handleEventListeners = () => {

    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).amountInputAddEventListener();

    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).amountInputAddEventListener();


    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).priceInputAddEventListener();

    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).priceInputAddEventListener();


    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).addShareBtnsAddEventListener();

    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).addShareBtnsAddEventListener();


    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).addAmountBtnAddEventListener();

    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).addAmountBtnAddEventListener();


    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).subAmountBtnAddEventListener();

    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).subAmountBtnAddEventListener();

    
    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).amountTransparentClickAddEventListener();

    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).amountTransparentClickAddEventListener();


    addEventListeners({
        form: exitPointsForm,
        element: exitPointsElement
    }).priceTransparentClickAddEventListener();
    
    addEventListeners({
        form: entryPointsForm,
        element: entryPointsElement
    }).priceTransparentClickAddEventListener();
}