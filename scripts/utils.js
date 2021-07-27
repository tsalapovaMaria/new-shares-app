const changeCurrency = (inputValue) => {
    switch (inputValue) {
        case 'usd':
            currency = '$';
            break;
        case 'eur':
            currency = '€';
            break;
        case 'rub':
            currency = '₽';
            break;
    }
};

const changePlaceholderCurrency = () => {
    Array.from(priceInputs).forEach(
        input => {
            input.placeholder = '215,3 ' + currency;
        }
    );
};

const changeCurrencyElements = () => {
    const currencyElements = document.querySelectorAll('[data-currency]');

    Array.from(currencyElements).forEach(
        element => {
            element.dataset.currency = currency;
        }
    );
};

const changePriceInputs = () => {
    Array.from(tableSpanElements).forEach(
        span => {
            span.dataset.currency = currency;
        }
    );
};

const readInputValue = (input) => {
    let value = Number(input.value.replace(/\s/g, '').replace(',', '.'));
    if (value !== value || value === 0) {
        value = 1;
    }
    input.value = value.toLocaleString();
}

const createElement = (tag, {
    className,
    dataAttr,
    textContent,
    placeholder,
    type
} = {}, children = []) => {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }
    if (dataAttr) {
        element.dataset.currency = dataAttr;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (placeholder) {
        element.placeholder = placeholder;
    }
    if (type) {
        element.type = type;
    }
    if (children.length !== 0) {
        children.forEach(child => element.append(child));
    }
    return element;
};

const createTableRow = (tbody) => {

    const amountChild = createElement('SPAN');
    const priceChild = createElement('SPAN', {
        dataAttr: currency
    });
    const totalPriceChild = createElement('SPAN', {
        dataAttr: currency
    });
    const deleteBtnChild = createElement('BUTTON', {
        className: btnClassName,
        textContent: '╳'
    });

    const amount = createElement('TD', {
        className: `${tdClassName} ${amountClassName}`
    }, [amountChild]);
    const price = createElement('TD', {
        className: `${tdClassName} ${priceClassName}`
    }, [priceChild]);
    const totalPrice = createElement('TD', {
        className: `${tdClassName} ${totalPriceClassName}`
    }, [totalPriceChild]);
    const deleteBtn = createElement('TD', {
        className: `${tdClassName} ${deleteBtnClassName}`
    }, [deleteBtnChild]);

    const tableRow = createElement('TR', {
        className: trClassName
    }, [amount, price, totalPrice, deleteBtn]);
    tbody.append(tableRow);
};

const addElement = ({
    input,
    textContent,
    className,
    top,
    left
} = {}) => {
    const wrapperElement = input.parentElement;
    const element = document.createElement('span');

    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = `${textContent}`;
    }
    if (top) {
        element.style.top = top;
    }
    if (left) {
        element.style.left = left;
    }
    wrapperElement.append(element);

    element.addEventListener('click', (e) => {
        if (!e.target.closest(`.${input.parentElement.className}`)) {
            return;
        }
        input.focus();
    });
    return element;
};

const removeElement = ({
    input,
    className
} = {}) => {
    const element = input.parentElement.querySelector(`.${className}`);
    if (element) {
        element.remove();
    }
};

const removeShare = (currentRow) => {
    const currentTbody = currentRow.parentElement;
    const removedRowClassName = 'shares-table__shares-item-remove';

    currentRow.className += ` ${removedRowClassName}`;

    setTimeout(() => {
        currentRow.remove();
        if (currentTbody.children.length === 0) {
            const element = createElement('DIV', 'table-is-empty');
            element.textContent = 'НЕТ ПОКУПОК';
            currentTbody.append(element);

            element.style.left = currentTbody.offsetWidth / 2 - element.offsetWidth / 2 + 'px';
            currentTbody.className = 'empty-table';
            element.className = 'table-is-empty';
        }
    }, 250);
}

const addBtnsEventRemoveShare = (btn, tr) => {
    btn.addEventListener('click', () =>
        removeShare(tr)
    );
}