let currency = '$';

const section = document.querySelector('.shares-section');

const formRender = renderForm();

const entryPointsForm = formBuilder();
const exitPointsForm = formBuilder();

formRender.createForm(
    'Точки входа', {
        col_1: 'кол-во акций',
        col_2: 'цена покупки',
        col_3: 'сумма'
    }, section, entryPointsForm);
formRender.createForm(
    'Точки выхода', {
        col_1: 'кол-во акций',
        col_2: 'цена продажи',
        col_3: 'сумма'
    }, section, exitPointsForm);

//добавляем в subscribers функции изменения и подсчета средней цены и профита
//во вкладке "Среднее"
entryPointsForm.subscribe(() => changeAveragePrice(entryPointsForm, exitPointsForm));
entryPointsForm.subscribe(() => changeProfitEl(entryPointsForm));

//добавляем в subscribers функции расчета и изменения количества акций к покупке 
//во вкладке "Усреднение позиций"
entryPointsForm.subscribe(() => changeAmountEl(entryPointsForm, exitPointsForm));

exitPointsForm.subscribe(() => changeAmountEl(entryPointsForm, exitPointsForm));
exitPointsForm.subscribe(() => changeAveragePrice(entryPointsForm, exitPointsForm));


addProfitInputEventListener(entryPointsForm, exitPointsForm);
addPosAveragingEvent(entryPointsForm, exitPointsForm);