const addShareBtnEls = document.querySelectorAll('.btn-container__btn-add');

Array.from(addShareBtnEls).forEach(btn => {
    btn.addEventListener('click', () => {
        const articleClassName = 'shares-article__shares-container';
        const rowClassName = 'shares-table__shares-item';
        const btnContainer = btn.parentElement;
        const inputContainer = btnContainer.previousElementSibling;
    
        const amountContainer = inputContainer?.querySelector('.amount-container__input');
        const priceContainer = inputContainer?.querySelector('.price-container__input');

        const amount = Number(amountContainer.value);
        const price = Number(priceContainer.value);

        const tr = exitPointsForm.addRecord(amount, price);

        let article = btnContainer?.parentElement;
        while(article.className !== articleClassName){
            article = article?.parentElement;
        }
        const tbody = article.querySelector('TBODY');
        const purchases = article?.querySelector('.table-is-empty');
        purchases?.remove();

        tbody.append(tr);

        // использование setTimeout для анимации 
        // появления элемента

        setTimeout(() => {
            tr.className = rowClassName;
        }, 0);

        //очистка форм после добавления новой строки

        amountContainer.value = '0';
        priceContainer.value = '0';
        btn.disabled = true;
        tr.querySelector('.btn-container__delete-btn').onclick = () => exitPointsForm.removeRecord(0,tr, tbody);

    });
});