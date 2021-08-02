let currency = '$';

const section = document.querySelector('.shares-section');
const entryPointsForm = formBuilder();
const exitPointsForm = formBuilder();

const entryPointsElement = renderForm.createForm(
    'Точки входа', {
        col_1: 'кол-во акций',
        col_2: 'цена покупки',
        col_3: 'сумма'
    }, section);
const exitPointsElement = renderForm.createForm(
    'Точки выхода', {
        col_1: 'кол-во акций',
        col_2: 'цена продажи',
        col_3: 'сумма'
    }, section);
handleEventListeners();