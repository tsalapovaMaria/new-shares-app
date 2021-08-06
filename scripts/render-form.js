const renderForm = () => {
    //изменение поведения кнопки "Добавить"
    const changeBtnBehavior = (input) => {
        const inputContainer = input.parentElement;
    
        const inputSiblingContainer =
            (inputContainer.nextElementSibling) ?
            inputContainer.nextElementSibling :
            inputContainer.previousElementSibling;
    
        const inputSibling = inputSiblingContainer.querySelector('INPUT');
    
        const formContainer = inputContainer.parentElement;
    
        const value = (input.className.includes('price')) ? leadPriceToValid(input.value) : leadAmountToValid(input.value);
        const siblingValue = (inputSibling.className.includes('price')) ? leadPriceToValid(inputSibling.value) : leadAmountToValid(inputSibling.value);
    
        const isUnderZero = (value < 0) && (siblingValue < 0);
        const isZero = value && siblingValue;
        const isValueNaN = value !== value;
        const isSiblingValueNaN = siblingValue !== siblingValue;
    
        if (!formContainer.nextElementSibling) {
            return;
        }
    
        const addRowBtn = formContainer.nextElementSibling.querySelector('.btn-container__btn-add');
        addRowBtn.disabled = !isUnderZero && (!isValueNaN || !isSiblingValueNaN) && !isZero;
    };

    // функции для создания названия формы
    const createFormTitle = (title) => {
        return createElement('H2', {
            textContent: title,
            className: 'shares-article__title'
        });
    };

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
        return createElement('TH', {
            className: `${colClassName} shares-header__delete-btn`
        }, []);
    };

    //функции для создания шапки таблицы
    const createThRow = ({
        amountTh,
        priceTh,
        totalPriceTh,
        btnTh
    }) => {
        return createElement('TR', {
            className: 'shares-table__shares-header'
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
    const createNoShoppingElement = (textContent) => {
        return createElement('DIV', {
            className: 'table-is-empty',
            textContent: textContent
        });
    };

    //функции для создания тела таблицы
    const createTableBody = (noShoppingEl) => {
        return createElement('TBODY', {
            className: 'empty-table'
        }, [noShoppingEl]);
    };

    //функции для создания таблицы
    const createTable = (tHead, tBody) => {
        return createElement('TABLE', {
            className: 'table-container__shares-table'
        }, [tHead, tBody]);
    };

    //функция для создания контейнера, содержащего таблицу
    const createTableContainer = (table) => {
        return createElement('DIV', {
            className: 'shares-container__table-container'
        }, [table]);
    };

    //функции для создания формы ввода пользователем количества покупок/продаж

    //функции для создания кнопки "+" (увеличение количества)
    const createMoreAmountBtn = () => {
        return createElement('BUTTON', {
            className: 'btns__add-btn',
            type: 'button'
        });
    };

    //функция для создания события кнопке
    const moreAmountBtnsEventListener = (moreAmountBtn, formContainer) => {
        const symbolWidth = 9;
        const paddingLeft = 20;
        const spaceBetweenElements = 5;

        const amountClassName = 'amount-container__amounts';
        const amountInputClassName = 'amount-container__input';
        moreAmountBtn.addEventListener('click', () => {
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

    //функция для создания события кнопке
    const lessAmountBtnsEventListener = (lessAmountBtn, formContainer) => {
        const symbolWidth = 9;
        const paddingLeft = 17;
        const spaceBetweenElements = 5;

        const amountClassName = 'amount-container__amounts';
        const amountInputClassName = 'amount-container__input';
        lessAmountBtn.addEventListener('click', () => {
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
        if (input.className === priceInputClassName) {
            span.dataset.currency = currency;
        }
        return span;
    };
    const focusInput = (input, className) => {
        removeElement({
            input: input,
            className: className
        });
    };

    const createAmountSpan = (input, {
        top,
        left,
        textContent,
        className
    }) => {
        return blurInput(input, {
            top: top,
            left: left,
            textContent: textContent,
            className: className
        });
    };

    const transparentClick = (e, input, className) => {
        const target = e.target;

        if (!target.closest(`.${className}`)) {
            return;
        }
        input.focus();
    };

    const spanEventListener = (span, input, containerClassName) => {
        if (!span) {
            return;
        }
        span.addEventListener('click', (e) => transparentClick(e, input, containerClassName));
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

            const span = createAmountSpan(input, {
                top: top,
                left: left,
                className: amountClassName,
                textContent: 'шт'
            });

            const containerClassName = 'shares-form-inputs__amount-container';
            spanEventListener(span, input, containerClassName);
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

    //добавление обработчиков для поля ввода стоимости
    const priceInputEventListener = (input) => {
        const priceClassName = 'price-container__currency';
        const symbolWidth = 9;

        const top = 0;

        input.addEventListener('blur', () => {
            const inputLength = input.offsetWidth;

            readInputValue(input);
            const inputValueLength = input.value.length;

            const left = (inputValueLength * symbolWidth) / 2 - inputLength / 2;

            const span = blurInput(input, {
                top: top,
                left: left,
                textContent: '',
                className: priceClassName
            });
            const containerClassName = 'shares-form-inputs__price-container';
            spanEventListener(span, input, containerClassName);
        });

        input.addEventListener('focus', () => {
            focusInput(input, priceClassName);
        });

        input.addEventListener('input', () => {
            changeBtnBehavior(input);
        });

    };

    //функция создания контейнера для полей ввода
    const createFormInputs = (amountContainer, priceContainer) => {
        const formInputsClassName = 'shares-form__shares-form-inputs';

        return createElement('DIV', {
            className: formInputsClassName
        }, [amountContainer, priceContainer]);
    };

    //функция создания кнопки "Добавить"
    const createAddBtn = () => {
        const addRowBtnClassName = 'btn-container__btn-add';

        const addBtn = createElement('BUTTON', {
            className: addRowBtnClassName,
            type: 'submit',
            textContent: 'Добавить'
        });
        addBtn.disabled = true;

        return addBtn;
    };

    //функция создания контейнера для кнопки
    const createAddBtnContainer = (btn) => {
        const btnContainerClassName = 'shares-form__btn-container';
        return createElement('DIV', {
            className: btnContainerClassName
        }, [btn]);
    };

    const clickAddBtn = ({
        article,
        form,
        container,
        tbody,
        amountInput,
        priceInput,
        noShoppingElText
    }) => {
        const rowClassName = 'shares-table__shares-item';

        const amount = leadAmountToValid(amountInput.value);
        const price = leadPriceToValid(priceInput.value);

        const trId = form.addRecord(amount, price);

        const totalPrice = amount * price;

        const tr = createTableRow(trId, form, tbody, amount, price, totalPrice, noShoppingElText);

        const noShoppingEl = article.querySelector('.table-is-empty'); 
        if (noShoppingEl) {
            noShoppingEl.remove();
        }

        tbody.append(tr);

        // использование setTimeout для анимации 
        // появления элемента

        setTimeout(() => {
            tr.className = rowClassName;
        }, 0);

        //очистка форм после добавления новой строки
        const currencyEl = container.querySelector('.price-container__currency');
        const amountEl = container.querySelector('.amount-container__amounts');

        amountInput.value = '0';
        priceInput.value = '0';
        amountEl.style.left = '29px';
        currencyEl.style.left = '-64px';
    };
    const addBtnEventListener = ({
        article,
        form,
        btn,
        container,
        tbody,
        amountInput,
        priceInput,
        noShoppingElText
    }) => {
        btn.addEventListener('click', () => {
            clickAddBtn({
                article: article,
                form: form,
                container: container,
                tbody: tbody,
                amountInput: amountInput,
                priceInput: priceInput,
                noShoppingElText: noShoppingElText
            });

            btn.disabled = true;
        });
    };

    //функция создания контейнера формы
    const createFormShare = (formInputs, btnContainer) => {
        const formSharesClassName = 'shares-form-container__shares-form';

        return createElement('DIV', {
            className: formSharesClassName
        }, [formInputs, btnContainer]);
    };

    // функция создания контейнера формы
    const createFormContainer = (formContainer) => {
        const shareFormClassName = 'shares-container__shares-form-container';
        return createElement('DIV', {
            className: shareFormClassName
        }, [formContainer]);
    };

    //функция создания контейнера для таблицы и контейнера формы
    const createSharesContainer = (tableContainer, shareFormContainer) => {
        const containerClassName = 'shares-article__shares-container';

        return createElement('DIV', {
            className: containerClassName
        }, [tableContainer, shareFormContainer]);
    };

    //функция создания обёртки для всей формы
    const createArticle = (formTitle, sharesContainer) => {
        const articeClassName = 'shares-section__shares-article';

        return createElement('DIV', {
            className: articeClassName
        }, [formTitle, sharesContainer]);
    };


    //ФУНКЦИИ ДЛЯ СОЗДАНИЯ НОВОЙ СТРОКИ В ТАБЛИЦЕ
    const createCellSpan = (value) => {
        const valueString = value.toLocaleString();
        return createElement('SPAN', {
            textContent: valueString
        });
    };

    const createRemoveRowBtn = (span) => {
        const btnClassName = 'btn-container__delete-btn';
        return createElement('BUTTON', {
            className: btnClassName
        }, [span]);
    };

    const removeRowBtnClick = (trId, form, tr, tbody, textContent) => {
        const removedRowClassName = 'shares-table__shares-item-remove';
        form.removeRecord(trId);

        tr.className += ` ${removedRowClassName}`;

        setTimeout(() => {
            tr.remove();

            // ЕСЛИ в таблице нет данных (пусто)
            // ТОГДА добавить новый элемент, указывающий, что таблица пуста
            if (tbody.children.length !== 0) {
                return;
            }

            const noShoppingEl = createNoShoppingElement(textContent);
            tbody.append(noShoppingEl);
        }, 250);

    };

    const removeRowBtnEventListener = (trId, form, tr, tbody, btn, textContent) => {
        btn.addEventListener('click', () => removeRowBtnClick(trId, form, tr, tbody, textContent));
    };

    const createTableDiv = (tdClassName, currentTdClassName, span) => {
        return createElement('TD', {
            className: `${tdClassName} ${currentTdClassName}`
        }, [span]);
    };

    const createTableRow = (trId, form, tbody, amount, price, totalPrice, textContent) => {
        const trClassName = 'shares-table__shares-item-add';
        const tdClassName = 'shares-item__value';

        const amountTdClassName = 'shares-item__amount';
        const priceTdClassName = 'shares-item__price';
        const totalPriceTdClassName = 'shares-item__total-price';
        const removeRowBtnTdClassName = 'shares-item__btn-container';

        const amountSpan = createCellSpan(amount);
        const priceSpan = createCellSpan(price);
        priceSpan.dataset.currency = currency;
        const totalPriceSpan = createCellSpan(totalPrice);
        totalPriceSpan.dataset.currency = currency;

        const removeRowBtnSpan = createElement('SPAN');
        removeRowBtnSpan.innerHTML = '&#x2715';

        const removeRowBtn = createRemoveRowBtn(removeRowBtnSpan);

        const amountTd = createTableDiv(tdClassName, amountTdClassName, amountSpan);
        const priceTd = createTableDiv(tdClassName, priceTdClassName, priceSpan);
        const totalPriceTd = createTableDiv(tdClassName, totalPriceTdClassName, totalPriceSpan);
        const removeRowBtnTd = createTableDiv(tdClassName, removeRowBtnTdClassName, removeRowBtn);

        const tr = createElement('TR', {
            className: trClassName
        }, [amountTd, priceTd, totalPriceTd, removeRowBtnTd]);
        removeRowBtnEventListener(trId, form, tr, tbody, removeRowBtn, textContent);

        return tr;
    };

    return {
        createForm: (
            title, {
                col_1,
                col_2,
                col_3
            } = {},
            mountEl, form) => {

            const tHead = setThead(col_1, col_2, col_3);

            const noShoppingElText = title === 'Точки входа' ? 'нет покупок' : 'нет продаж';
            const noShoppingEl = createNoShoppingElement(noShoppingElText);
            const tBody = createTableBody(noShoppingEl);

            const table = createTable(tHead, tBody);

            const tableContainer = createTableContainer(table);

            const moreAmountBtn = createMoreAmountBtn();
            const lessAmountBtn = createLessAmountBtn();

            const amountBtnsContainer = createBtnsContainer(lessAmountBtn, moreAmountBtn);
            const amountInput = createAmountInput();

            const amountContainer = createAmountContainer(amountInput, amountBtnsContainer);

            const priceInput = createPriceInput();
            const priceContainer = createPriceContainer(priceInput);

            const formInputs = createFormInputs(amountContainer, priceContainer);

            const addBtn = createAddBtn();
            const btnContainer = createAddBtnContainer(addBtn);

            const formContainer = createFormShare(formInputs, btnContainer);

            moreAmountBtnsEventListener(moreAmountBtn, formContainer);
            lessAmountBtnsEventListener(lessAmountBtn, formContainer);

            amountInputEventListeners(amountInput);
            priceInputEventListener(priceInput);

            const shareFormContainer = createFormContainer(formContainer);

            const sharesContainer = createSharesContainer(tableContainer, shareFormContainer);

            const formTitle = createFormTitle(title);

            const article = createArticle(formTitle, sharesContainer);

            addBtnEventListener({
                article: article,
                form: form,
                btn: addBtn,
                container: formContainer,
                tbody: tBody,
                amountInput: amountInput,
                priceInput: priceInput,
                noShoppingElText: noShoppingElText,
                noShoppingEl: noShoppingEl
            });

            mountEl.append(article);
            return article;
        }
    }
};