const toggler = document.querySelector('#dropdown');


const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownList = document.querySelector('.dropdown');
const dropdownItems = document.querySelector('.items');


if(toggler.checked){
    dropdownContainer.addEventListener('click', (e) => {
        const target = e.target;
    
        if(this.className !== '.dropdown'){
            console.log('here');
            return;
        }
        
        console.log('here');
        toggler.checked = false;
    });
}