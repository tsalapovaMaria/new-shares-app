const addEventListeners = ({
    form = null,
    element
}) => {
    const amountClassName = 'amount-container__amounts';
    const amountInputClassName = 'amount-container__input';

    const priceClassName = 'price-container__currency';
    const priceInputClassName = 'price-container__input';


    return {
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
    }).amountTransparentClickAddEventListener();

    addEventListeners({
        form: form,
        element: element
    }).priceTransparentClickAddEventListener();

}