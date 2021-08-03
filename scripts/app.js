let currency = '$';

const section = document.querySelector('.shares-section');

const formRender = renderForm();

const entryPointsElement = formRender.createForm(
    'Точки входа', {
        col_1: 'кол-во акций',
        col_2: 'цена покупки',
        col_3: 'сумма'
    }, section);
const exitPointsElement = formRender.createForm(
    'Точки выхода', {
        col_1: 'кол-во акций',
        col_2: 'цена продажи',
        col_3: 'сумма'
    }, section);

const entryPointsForm = formBuilder();
const exitPointsForm = formBuilder();

handleEventListeners(entryPointsForm, entryPointsElement);

handleEventListeners(exitPointsForm, exitPointsElement);