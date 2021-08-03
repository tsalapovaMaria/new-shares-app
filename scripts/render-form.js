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

            // const createTableContainer = () => {

            //     const table = createElement('TABLE', {
            //         className: tableClassName
            //     }, [tHead, tBody]);

            //     return createElement('DIV', {
            //         className: tableContainerClassName
            //     }, [table]);
            // }

            const createFormContainer = () => {
                const formSharesClassName = 'shares-form-container__shares-form';

                const formInputsClassName = 'shares-form__shares-form-inputs';

                const btnContainerClassName = 'shares-form__btn-container';
                const addRowBtnClassName = 'btn-container__btn-add';

                const createAmountContainer = () => {
                    const amountContainerClassName = 'shares-form-inputs__amount-container';
                    const amountInputClassName = 'amount-container__input';

                    const btnsContainerClassName = 'amount-container__btns';
                    const removeBtnClassName = 'btns__remove-btn';
                    const addBtnClassName = 'btns__add-btn';

                    const removeBtn = createElement('BUTTON', {
                        className: removeBtnClassName,
                        type: 'button'
                    });
                    const addBtn = createElement('BUTTON', {
                        className: addBtnClassName,
                        type: 'button'
                    });

                    const btnsContainer = createElement('DIV', {
                        className: btnsContainerClassName
                    }, [removeBtn, addBtn]);

                    const amountInput = createElement('INPUT', {
                        type: 'text',
                        className: amountInputClassName,
                        placeholder: '0 шт'
                    });
                    amountInput.required = true;

                    return createElement('DIV', {
                        className: amountContainerClassName
                    }, [amountInput, btnsContainer]);
                };

                const createPriceContainer = () => {
                    const priceContainerClassName = 'shares-form-inputs__price-container';
                    const priceInputClassName = 'price-container__input';

                    const priceInput = createElement('INPUT', {
                        type: 'text',
                        className: priceInputClassName,
                        placeholder: '0 $'
                    });

                    return createElement('DIV', {
                        className: priceContainerClassName
                    }, [priceInput]);
                };

                const amountContainer = createAmountContainer();
                const priceContainer = createPriceContainer();

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

            }

            const tHead = setThead(col_1, col_2, col_3);
            const tBody = setTableBody();
            const table = setTable(tHead, tBody);
            const tableContainer = setTableContainer(table);

            const formContainer = createFormContainer();

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