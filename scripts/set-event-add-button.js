const addShareBtnElements = document.querySelectorAll('.btn-container__btn-add');

Array.from(addShareBtnElements).forEach(btn => {
    btn.addEventListener('click', () => {
        const btnContainer = btn.parentElement;
        const inputContainer = btnContainer.previousElementSibling;
    
        const amountContainer = inputContainer?.querySelector('.amount-container__input');
        const priceContainer = inputContainer?.querySelector('.price-container__input');

        const amount = Number(amountContainer.value);
        const price = Number(priceContainer.value);

        const tr = form.addShare(amount, price);

        let article = btnContainer?.parentElement;
        while(article.className !== 'shares-article__shares-container'){
            article = article?.parentElement;
        }
        const tbody = article.querySelector('TBODY');
        const purchases = article?.querySelector('.table-is-empty');
        purchases?.remove();

        tbody.append(tr);
        amountContainer.value = '0';
        priceContainer.value = '0';
        btn.disabled = true;
    });
});