const toggler = document.querySelector('#dropdown');

const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownList = document.querySelector('.dropdown');
const dropdownItems = document.querySelector('.items');

const dropdownLabels = dropdownItems.querySelectorAll('LABEL');


let wasChecked = false;


dropdownList.addEventListener('click', () => {
    const toggleFunc = () => {    
        const currentCurrency = document.querySelector('.current-container__value').textContent;
    
        const label = Array.from(dropdownLabels).find(label => label.textContent === currentCurrency);
        
        if(isChecked && label.className === ''){
            label.className += ' active-currency';
        }
        if(!isChecked && label.className !== ''){
            label.className = '';
        }
    }

    const isChecked = toggler.checked;

    toggleFunc();

    if (wasChecked && isChecked) {
        toggler.checked = false;
    }
    wasChecked = isChecked;

});