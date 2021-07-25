const closeBtnElements = document.querySelectorAll('.btn-container__delete-btn');

Array.from(closeBtnElements).forEach((btn, id) => {
    btn.addEventListener('click', () => {
        const currentRow = trElements[id];
        const currentTbody = currentRow.parentElement;
        console.log(currentTbody);

        currentRow.style.transition = '0.3s all';
        currentRow.style.transform = 'scale(0)';

        setTimeout(() => {
            currentRow.remove();
            if(currentTbody.children.length === 0){
                const element = createNewElement('DIV', 'table-is-empty');
                element.textContent = 'НЕТ ПОКУПОК';
                currentTbody.append(element);

                element.style.left = currentTbody.offsetWidth / 2 - element.offsetWidth / 2 + 'px';
                currentTbody.className = 'empty-table';
            }
        }, 250);
    });
});