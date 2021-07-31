let currency = '$';

const section = document.querySelector('.shares-section');
const entryPointsForm = formBuilder();
const exitPointsForm = formBuilder();

const entryPointsElement = createForm(
    'Точки входа', {
        col_1: 'кол-во акций',
        col_2: 'цена покупки',
        col_3: 'сумма'
    }, section);
const exitPointsElement = createForm(
    'Точки выхода', {
        col_1: 'кол-во акций',
        col_2: 'цена продажи',
        col_3: 'сумма'
    }, section);

addEventListeners({form: exitPointsForm, element: exitPointsElement}).amountInputAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).amountInputAddEventListener();

addEventListeners({form: exitPointsForm, element: exitPointsElement}).priceInputAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).priceInputAddEventListener();

addEventListeners({form: exitPointsForm, element: exitPointsElement}).addShareBtnsAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).addShareBtnsAddEventListener();

addEventListeners({form: exitPointsForm, element: exitPointsElement}).addAmountBtnAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).addAmountBtnAddEventListener();

addEventListeners({form: exitPointsForm, element: exitPointsElement}).subAmountBtnAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).subAmountBtnAddEventListener();

addEventListeners({form: exitPointsForm, element: exitPointsElement}).amountTransparentClickAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).amountTransparentClickAddEventListener();

addEventListeners({form: exitPointsForm, element: exitPointsElement}).priceTransparentClickAddEventListener();
addEventListeners({form: entryPointsForm, element: entryPointsElement}).priceTransparentClickAddEventListener();