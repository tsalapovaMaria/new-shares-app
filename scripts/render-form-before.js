const renderForm = {    
    createForm : (
        title, {
            col_1,
            col_2,
            col_3
        } = {},
        mountEl) => {
        const wrapperClassName = 'shares-section__shares-article';
    
        const containerTitleClassName = 'shares-article__title';
        const containerClassName = 'shares-article__shares-container';
    
        const createThead = () => {
            const rowClassName = 'shares-table__shares-header';
            const colClassName = 'shares-header__col-title';
    
            const amountColClassName = 'shares-header__amount';
            const priceColClassName = 'shares-header__price';
            const totalPriceColClassName = 'shares-header__total-price';
            const btnColClassName = 'shares-header__delete-btn';
    
            const amountThDiv = createElement('DIV', {
                textContent: col_1
            });
            const amountTh = createElement('TH', {
                className: `${colClassName} ${amountColClassName}`
            }, [amountThDiv]);
    
            const priceThDiv = createElement('DIV', {
                textContent: col_2
            });
            const priceTh = createElement('TH', {
                className: `${colClassName} ${priceColClassName}`
            }, [priceThDiv]);
    
            const totalPriceThDiv = createElement('DIV', {
                textContent: col_3
            });
            const totalPriceTh = createElement('TH', {
                className: `${colClassName} ${totalPriceColClassName}`
            }, [totalPriceThDiv]);
    
            const btnPriceTh = createElement('TH', {
                className: `${colClassName} ${btnColClassName}`
            }, []);
    
    
            const theadRow = createElement('TR', {
                className: rowClassName
            }, [amountTh, priceTh, totalPriceTh, btnPriceTh]);
    
            return createElement('THEAD', {}, [theadRow]);
        }
    
        const createTbody = () => {
            const emptyTableClassName = 'empty-table';
            const div = createElement('DIV', {
                className: 'table-is-empty',
                textContent: 'нет покупок'
            });
            return createElement('TBODY', {
                className: emptyTableClassName
            }, [div]);
        }
    
        const createTableContainer = () => {
            const tableContainerClassName = 'shares-container__table-container';
            const tableClassName = 'table-container__shares-table';
    
            const table = createElement('TABLE', {
                className: tableClassName
            }, [tHead, tBody]);
    
            return createElement('DIV', {
                className: tableContainerClassName
            }, [table]);
        }
    
        const createFormContainer = (title) => {
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
    
        const tHead = createThead();
        const tBody = createTbody();
        const tableContainer = createTableContainer();
    
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
    createTableRow : (amount, price, totalPrice) => {
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
};