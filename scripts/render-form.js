const renderForm = {    
    createTableRow : (amount, price, totalPrice) => {
        const trClassName = 'shares-table__shares-item-add';
        const tdClassName = 'shares-item__value';

        const amountTdClassName = 'shares-item__amount';
        const priceTdClassName = 'shares-item__price';
        const totalPriceTdClassName = 'shares-item__total-price';
        const removeRowBtnTdClassName = 'shares-item__btn-container';

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
            textContent: totalPrice
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