const form = {
    state: [{
            amount: 2,
            price: 20,
            total: 40
        },
        {
            amount: 5,
            price: 10,
            total: 50
        }
    ],
    subscriber: () => {},
    createForm: (title) => {
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
                textContent: 'кол-во акций'
            });
            const amountTh = createElement('TH', {
                className: `${colClassName} ${amountColClassName}`
            }, [amountThDiv]);

            const priceThDiv = createElement('DIV', {
                textContent: 'цена покупки'
            });
            const priceTh = createElement('TH', {
                className: `${colClassName} ${priceColClassName}`
            }, [priceThDiv]);

            const totalPriceThDiv = createElement('DIV', {
                textContent: 'сумма'
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

        const createFormContainer = () => {
            const formContainerClassName = 'shares-container__shares-form-container';
            const formSharesClassName = 'shares-form-container__shares-form';

            const formInputsClassName = 'shares-form__shares-form-inputs';

            const btnContainerClassName = 'shares-form__btn-container';
            const addRowBtnClassName = 'btn-container__btn-add';

            const createAmountContainer = () => {
                const amountContainerClassName = 'shares-form-inputs__amount-container';
                const amountInputClassName = 'amount-container__input';
                const amountsClassName = 'amount-container__amounts';

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
                    placeholder: '1 шт'
                });
                amountInput.required = true;

                const amount = createElement('SPAN', {
                    className: amountsClassName,
                    textContent: 'шт'
                });

                return createElement('DIV', {
                    className: amountContainerClassName
                }, [amountInput, amount, btnsContainer]);
            };

            const createPriceContainer = () => {
                const priceContainerClassName = 'shares-form-inputs__price-container';
                const priceInputClassName = 'price-container__input';
                const currencyClassName = 'price-container__currency';

                const priceInput = createElement('INPUT', {
                    type: 'text',
                    className: priceInputClassName,
                    placeholder: '215,3 $'
                });
                // const currencyElement = createElement('SPAN', {
                //     className: currencyClassName,
                //     dataAttr: currency
                // });

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

        document.querySelector('.shares-section').append(wrapper);
        return wrapper;
    },
    addShare: (price, amount) => {
        const createTableRow = () => {
            const trClassName = 'shares-table__shares-item';
            const tdClassName = 'shares-item__value';

            const amountTdClassName = 'shares-item__first-value';
            const priceTdClassName = 'shares-item__sec-value';
            const totalPriceTdClassName = 'shares-item__third-value';
            const removeRowBtnTdClassName = 'shares-item__forth-value';

            const btnClassName = 'btn-container__delete-btn';

            const amountSpan = createElement('SPAN', {
                textContent: amount
            });
            const priceSpan = createElement('SPAN', {
                dataAttr: currency,
                textContent: price
            });
            const totalPriceSpan = createElement('SPAN', {
                dataAttr: currency,
                textContent: `${amount * price}`
            });
            const removeRowBtn = createElement('BUTTON', {
                className: btnClassName,
                textContent: `&#x2715`
            });

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
        }

        this.state.push({
            amount: amount,
            price: price,
            total: `${amount} * ${price}`
        });

        return createTableRow();
    },
    removeShare: () => {
        return 2;
    }
}

const state = form.state;

Object.defineProperty(form, 'state', {
    configurable: false,
    get() {
        return state;
    }
})