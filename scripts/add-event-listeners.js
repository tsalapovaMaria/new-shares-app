const addEventListeners = ({
    form = null,
    element
}) => {
    return {
        amountClassName: 'amount-container__amounts',
        priceClassName: 'price-container__currency',
        rowClassName: 'shares-table__shares-item',

        amountInputAddEventListener: function () {
            const input = element.querySelector('.amount-container__input');

            // функция добавления элемент с текстом "шт" на срабатывании event blur
            const addBlurEvent = () => {
                input.addEventListener('blur',
                    () => {
                        readInputValue(input);
                        addElement({
                            input: input,
                            textContent: 'шт',
                            className: this.amountClassName,
                            top: '8px',
                            left: 20 + String(input.value).length * 9 + 'px'
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
                            className: this.amountClassName
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
            const input = element.querySelector('.price-container__input');

            // функция добавления валюты на срабатывании event blur
            const addBlurEvent = () => {
                input.addEventListener('blur',
                    () => {
                        readInputValue(input);
                        const spanCurrency = addElement({
                            input: input,
                            textContent: '',
                            className: this.priceClassName,
                            top: '0px',
                            left: String(input.value).length * 9 / 2 - input.offsetWidth / 2 + 'px'
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
                            className: this.priceClassName
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
                const btnContainer = btn.parentElement;
                const inputContainer = btnContainer.previousElementSibling;

                const amountContainer = inputContainer.querySelector('.amount-container__input');
                const priceContainer = inputContainer.querySelector('.price-container__input');

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
                    tr.className = this.rowClassName;
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
                        const removedRowClassName = 'shares-table__shares-item-remove';
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
            const input = element.querySelector('.amount-container__input');
            btn.addEventListener('click', () => {
                const value = Number(input.value?.replace(/\s/g, "").replace(',', '.'));

                input.value = (value + 1).toLocaleString();
                changeBtnBehavior(input);
                removeElement({
                    input: input,
                    className: this.amountClassName
                });
                addElement({
                    input: input,
                    textContent: 'шт',
                    className: this.amountClassName,
                    top: '8px',
                    left: 20 + String(input.value).length * 9 + 'px'
                });
            })
        },
        subAmountBtnAddEventListener: function () {
            const btn = element.querySelector('.btns__remove-btn');
            const input = element.querySelector('.amount-container__input');

            btn.addEventListener('click', () => {
                const value = Number(input.value?.replace(/\s/g, "").replace(',', '.'));
                if (value === 1 || value === 0) {
                    return;
                }

                input.value = (value - 1).toLocaleString();
                changeBtnBehavior(input);
                removeElement({
                    input: input,
                    className: this.amountClassName
                });
                addElement({
                    input: input,
                    textContent: 'шт',
                    className: this.amountClassName,
                    top: '8px',
                    left: 20 + String(input.value).length * 9 + 'px'
                });
            })
        },
        amountTransparentClickAddEventListener: function () {
            const span = element.querySelector(`.${this.amountClassName}`);
            const input = element.querySelector('.amount-container__input');

            span?.addEventListener('click', (e) => {
                const target = e.target;

                if (!target.closest('.shares-form-inputs__amount-container')) {
                    return;
                }
                input.focus();
            });
        },
        priceTransparentClickAddEventListener: function () {
            const span = element.querySelector(`.${this.priceClassName}`);
            const input = element.querySelector('.price-container__input');

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