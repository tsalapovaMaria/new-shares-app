const renderForm = () => {
    // функции для создания названия формы
    const createFormTitle = (title) => {
        const className = 'shares-article__title';

        return createElement('H2', {
            textContent: title,
            className: className
        });
    };

    const setFormTitle = (title) => {
        return createFormTitle(title);
    }

    //функции для создания колонок в шапке таблицы
    const colClassName = 'shares-header__col-title';

    const createAmountHead = (col_1) => {
        const amountColClassName = 'shares-header__amount';
        const amountThDiv = createElement('DIV', {
            textContent: col_1
        });
        return createElement('TH', {
            className: `${colClassName} ${amountColClassName}`
        }, [amountThDiv]);
    };

    const createPriceHead = (col_2) => {
        const priceColClassName = 'shares-header__price';
        const priceThDiv = createElement('DIV', {
            textContent: col_2
        });
        return createElement('TH', {
            className: `${colClassName} ${priceColClassName}`
        }, [priceThDiv]);
    };

    const createTotalPriceHead = (col_3) => {
        const totalPriceColClassName = 'shares-header__total-price';
        const totalPriceThDiv = createElement('DIV', {
            textContent: col_3
        });
        return createElement('TH', {
            className: `${colClassName} ${totalPriceColClassName}`
        }, [totalPriceThDiv]);
    };

    const createBtnHead = () => {
        const btnColClassName = 'shares-header__delete-btn';
        return createElement('TH', {
            className: `${colClassName} ${btnColClassName}`
        }, []);
    };

    //функции для создания шапки таблицы
    const createThRow = ({
        amountTh,
        priceTh,
        totalPriceTh,
        btnTh
    }) => {
        const rowClassName = 'shares-table__shares-header';
        return createElement('TR', {
            className: rowClassName
        }, [amountTh, priceTh, totalPriceTh, btnTh]);
    };

    const createThead = (thRow) => {
        return createElement('THEAD', {}, [thRow]);
    };

    const setThRow = (col_1, col_2, col_3) => {
        const amountTh = createAmountHead(col_1);
        const priceTh = createPriceHead(col_2);
        const totalPriceTh = createTotalPriceHead(col_3);
        const btnTh = createBtnHead();

        return createThRow({
            amountTh: amountTh,
            priceTh: priceTh,
            totalPriceTh: totalPriceTh,
            btnTh: btnTh
        });
    };

    const setThead = (col_1, col_2, col_3) => {
        const row = setThRow(col_1, col_2, col_3);
        return createThead(row);
    };

    //функция для создания элемента, указывающего на отсутствие строк в таблице
    const createNoShoppingElement = () => {
        return createElement('DIV', {
            className: 'table-is-empty',
            textContent: 'нет покупок'
        });
    };

    //функции для создания тела таблицы
    const createTableBody = (noShoppingEl) => {
        const emptyTableClassName = 'empty-table';
        return createElement('TBODY', {
            className: emptyTableClassName
        }, [noShoppingEl]);
    };
    const setTableBody = () => {
        const noShoppingEl = createNoShoppingElement();
        return createTableBody(noShoppingEl);
    };

    //функции для создания таблицы
    const createTable = (tHead, tBody) => {
        const tableClassName = 'table-container__shares-table';
        return createElement('TABLE', {
            className: tableClassName
        }, [tHead, tBody]);
    };
    const setTable = (tHead, tBody) => {
        return createTable(tHead, tBody);
    };

    //функция для создания контейнера, содержащего таблицу
    const createTableContainer = (table) => {
        const tableContainerClassName = 'shares-container__table-container';
        return createElement('DIV', {
            className: tableContainerClassName
        }, [table]);
    };
    const setTableContainer = (table) => {
        return createTableContainer(table);
    };

    //функции для создания формы ввода пользователем количества покупок/продаж

    //функции для создания кнопки "+" (увеличение количества)
    const createMoreAmountBtn = () => {
        const moreBtnClassName = 'btns__add-btn';
        return createElement('BUTTON', {
            className: moreBtnClassName,
            type: 'button'
        });
    };
    const setMoreAmountBtn = () => {
        const btn = createMoreAmountBtn();

        return btn;
    };

    //функция для создания события кнопке
    const moreAmountBtnsEventListener = (btn, formContainer) => {
        const symbolWidth = 9;
        const paddingLeft = 17;
        const spaceBetweenElements = 5;

        const amountClassName = 'amount-container__amounts';
        const amountInputClassName = 'amount-container__input';
        btn.addEventListener('click', () => {
            const input = formContainer.querySelector(`.${amountInputClassName}`);

            const value = leadAmountToValid(input.value);
            const inputValueLength = value.length;

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
                left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
            });
        });
    };

    //функция для создания кнопки "-" (уменьшение количества)
    const createLessAmountBtn = () => {
        const lessBtnClassName = 'btns__remove-btn';
        return createElement('BUTTON', {
            className: lessBtnClassName,
            type: 'button'
        });
    };
    const setLessAmountBtn = () => {
        const btn = createLessAmountBtn();

        return btn;
    };

    //функция для создания события кнопке
    const lessAmountBtnsEventListener = (btn, formContainer) => {
        const symbolWidth = 9;
        const paddingLeft = 17;
        const spaceBetweenElements = 5;

        const amountClassName = 'amount-container__amounts';
        const amountInputClassName = 'amount-container__input';
        btn.addEventListener('click', () => {
            const input = formContainer.querySelector(`.${amountInputClassName}`);

            const value = leadAmountToValid(input.value);
            if (value === 1 || value === 0) {
                return;
            }
            const inputValueLength = value.length;

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
                left: paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements + 'px'
            });
        });
    };

    const createBtnsContainer = (lessAmountBtn, moreAmountBtn) => {
        const btnsContainerClassName = 'amount-container__btns';

        return createElement('DIV', {
            className: btnsContainerClassName
        }, [lessAmountBtn, moreAmountBtn]);
    };

    const setBtnsContainer = (lessAmountBtn, moreAmountBtn) => {
        return createBtnsContainer(lessAmountBtn, moreAmountBtn);
    };

    //функции для создания поля ввода количества    
    const createAmountInput = () => {
        const amountInputClassName = 'amount-container__input';
        const amountInput = createElement('INPUT', {
            type: 'text',
            className: amountInputClassName,
            placeholder: '0 шт'
        });
        amountInput.required = true;
        return amountInput;
    };

    const setAmountInput = () => {
        return createAmountInput();
    };

    //создание событий для input "количества"
    const priceInputClassName = 'price-container__input';
    const blurInput = (input, {
        top,
        left,
        textContent,
        className,
    }) => {
        readInputValue(input);
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
    };
    const focusInput = (input, className) => {
        removeElement({
            input: input,
            className: className
        });
    };

    const amountInputEventListeners = (input) => {
        const amountClassName = 'amount-container__amounts';

        const symbolWidth = 9;
        const paddingLeft = 17;
        const spaceBetweenElements = 5;

        const top = 8;

        input.addEventListener('blur', () => {
            const value = readInputValue(input);
            const inputValueLength = String(value).length;
            const left = paddingLeft + inputValueLength * symbolWidth + spaceBetweenElements;

            blurInput(input, {
                top: top,
                left: left,
                textContent: 'шт',
                className: amountClassName
            });
        });

        input.addEventListener('focus', () => {
            focusInput(input, amountClassName);
        });

        input.addEventListener('input', () => {
            changeBtnBehavior(input);
        });
    };

    //функция для создания контейнера формы "количество"
    const createAmountContainer = (input, btnsContainer) => {
        const amountContainerClassName = 'shares-form-inputs__amount-container';

        return createElement('DIV', {
            className: amountContainerClassName
        }, [input, btnsContainer]);
    };

    const setAmountContainer = (input, btnsContainer) => {
        return createAmountContainer(input, btnsContainer);
    };

    //функция создания поля ввода стоимости
    const createPriceInput = () => {
        const priceInputClassName = 'price-container__input';

        return createElement('INPUT', {
            type: 'text',
            className: priceInputClassName,
            placeholder: '0 $'
        });
    };

    const createPriceContainer = (input) => {
        const priceContainerClassName = 'shares-form-inputs__price-container';

        return createElement('DIV', {
            className: priceContainerClassName
        }, [input]);
    };

    const setPriceContainer = (input) => {
        return createPriceContainer(input);
    };

    const priceInputEventListener = (input) => {
        const priceClassName = 'price-container__currency';
        const symbolWidth = 9;

        const top = 0;

        input.addEventListener('blur', () => {
            const inputLength = input.offsetWidth;
            
            readInputValue(input);
            const inputValueLength = input.value.length;

            const left = (inputValueLength * symbolWidth) / 2 - inputLength / 2;

            blurInput(input, {
                top: top,
                left: left,
                textContent: '',
                className: priceClassName
            });
        });

        input.addEventListener('focus', () => {
            focusInput(input, priceClassName);
        });

        input.addEventListener('input', () => {
            changeBtnBehavior(input);
        });

    }

    return {
        createForm: (
            title, {
                col_1,
                col_2,
                col_3
            } = {},
            mountEl) => {
            const wrapperClassName = 'shares-section__shares-article';
            const containerTitleClassName = 'shares-article__title';
            const containerClassName = 'shares-article__shares-container';

            const tHead = setThead(col_1, col_2, col_3);
            const tBody = setTableBody();

            const table = setTable(tHead, tBody);

            const tableContainer = setTableContainer(table);

            const moreAmountBtn = setMoreAmountBtn();
            const lessAmountBtn = setLessAmountBtn();

            const amountBtnsContainer = setBtnsContainer(lessAmountBtn, moreAmountBtn);
            const amountInput = setAmountInput();

            const amountContainer = setAmountContainer(amountInput, amountBtnsContainer);

            const priceInput = createPriceInput();
            const priceContainer = setPriceContainer(priceInput);

            const createFormContainer = () => {
                const formSharesClassName = 'shares-form-container__shares-form';

                const formInputsClassName = 'shares-form__shares-form-inputs';

                const btnContainerClassName = 'shares-form__btn-container';
                const addRowBtnClassName = 'btn-container__btn-add';

                const formInputs = createElement('DIV', {
                    className: formInputsClassName
                }, [amountContainer, priceContainer]);

                const addBtn = createElement('BUTTON', {
                    className: addRowBtnClassName,
                    type: 'submit',
                    textContent: 'Добавить'
                });
                addBtn.disabled = true;

                const btnContainer = createElement('DIV', {
                    className: btnContainerClassName
                }, [addBtn]);

                return createElement('DIV', {
                    className: formSharesClassName
                }, [formInputs, btnContainer]);

            };

            const formContainer = createFormContainer();

            moreAmountBtnsEventListener(moreAmountBtn, formContainer);
            lessAmountBtnsEventListener(lessAmountBtn, formContainer);

            amountInputEventListeners(amountInput);
            priceInputEventListener(priceInput);

            const shareFormClassName = 'shares-container__shares-form-container';
            const shareFormContainer = createElement('DIV', {
                className: shareFormClassName
            }, [formContainer]);


            const container = createElement('DIV', {
                className: containerClassName
            }, [tableContainer, shareFormContainer]);

            const containerTitle = createElement('H2', {
                textContent: title,
                className: containerTitleClassName
            });

            const wrapper = createElement('DIV', {
                className: wrapperClassName
            }, [containerTitle, container]);

            mountEl.append(wrapper);
            return wrapper;
        },
        createTableRow: (amount, price, totalPrice) => {
            const trClassName = 'shares-table__shares-item-add';
            const tdClassName = 'shares-item__value';

            const amountTdClassName = 'shares-item__amount';
            const priceTdClassName = 'shares-item__price';
            const totalPriceTdClassName = 'shares-item__total-price';
            const removeRowBtnTdClassName = 'shares-item__btn-container';

            const btnClassName = 'btn-container__delete-btn';


            const amountString = amount.toLocaleString();
            const priceString = price.toLocaleString();
            const totalString = totalPrice.toLocaleString();

            const amountSpan = createElement('SPAN', {
                textContent: amountString
            });
            const priceSpan = createElement('SPAN', {
                dataAttr: currency,
                textContent: priceString
            });
            const totalPriceSpan = createElement('SPAN', {
                dataAttr: currency,
                textContent: totalString
            });
            const removeRowBtnSpan = createElement('SPAN');
            removeRowBtnSpan.innerHTML = '&#x2715';
            const removeRowBtn = createElement('BUTTON', {
                className: btnClassName
            }, [removeRowBtnSpan]);

            const amountTd = createElement('TD', {
                className: `${tdClassName} ${amountTdClassName}`
            }, [amountSpan]);
            const priceTd = createElement('TD', {
                className: `${tdClassName} ${priceTdClassName}`
            }, [priceSpan]);
            const totalPriceTd = createElement('TD', {
                className: `${tdClassName} ${totalPriceTdClassName}`
            }, [totalPriceSpan]);
            const removeRowBtnTd = createElement('TD', {
                className: `${tdClassName} ${removeRowBtnTdClassName}`
            }, [removeRowBtn]);

            const tr = createElement('TR', {
                className: trClassName
            }, [amountTd, priceTd, totalPriceTd, removeRowBtnTd]);

            return tr;
        },
    }
};