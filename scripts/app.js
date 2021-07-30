let currency = '$';

const section = document.querySelector('.shares-section');
const entryPointsForm = new FormBuilder();
const exitPointsForm = new FormBuilder();

const entryPoints = entryPointsForm.createForm(
    'Точки входа', {
        col_1: 'кол-во акций',
        col_2: 'цена покупки',
        col_3: 'сумма'
    }, section);
const exitPoints = exitPointsForm.createForm(
    'Точки выхода', {
        col_1: 'кол-во акций',
        col_2: 'цена продажи',
        col_3: 'сумма'
    }, section);