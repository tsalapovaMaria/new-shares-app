const averagePriceCounter = function() {
    const countBoughtTotalPrice = (boughtRecords) => {
        return boughtRecords
            .map((record) => record.amount * record.price)
            .reduce((prev, curr) => prev + curr, 0)
    };

    const countBoughtAmount = (boughtRecords) => {
        return boughtRecords
            .map((record) => record.amount)
            .reduce((prev, curr) => prev + curr, 0);
    };

    const countAverage = (boughtRecords) => {
        if (!boughtRecords) {
            return 0;
        }
        
        const totalPrice = countBoughtTotalPrice(boughtRecords);
        const amount = countBoughtAmount(boughtRecords);
        const result = totalPrice / amount;

        return Number.isNaN(result) ? 0 : result;
    };

    const countAveragePrice = (boughtRecords, soldRecords) => {    
        let soldRecordIndex = soldRecords.length - 1;
        let soldRecord = soldRecords[soldRecordIndex];
    
        if (!soldRecord || !soldRecord.amount) {
            return countAverage(boughtRecords);
        }
    
        const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
    
        if (recordsBoughtEarlier.length === 0) {
            return countAverage(boughtRecords);
        }
    
        let averagePrice = 0;
        let indexModificator = 1;

        while (soldRecord && soldRecord.amount) {
            const filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
            averagePrice += countAverage(filteredBoughtRecords);
    
            soldRecordIndex = soldRecords.length - ++indexModificator;
            soldRecord = soldRecords[soldRecordIndex];
        }

        return averagePrice;
    };

    return {
        change : (entryPointsForm, exitPointsForm) => {
            const entryState = entryPointsForm.getState();
            const boughtRecords = Object
                .keys(entryState)
                .map((key) => entryState[key]);
        
            const exitState = exitPointsForm.getState();
            const soldRecords = Object
                .keys(exitState)
                .map((key) => exitState[key]);
        
            const averagePrice = countAveragePrice(boughtRecords, soldRecords);
            const outputElement = document.querySelector('.average-output-price');
        
            outputElement.textContent = (Math.trunc(averagePrice * 100) / 100).toLocaleString();
        }
    }
};

const currentPriceProfitInput = document.querySelector('.tab01 .current-price__input');
    
const profitPriceCounter = function() {
    const getCurrentPriceInputValue = () => {
        return readInputValue(currentPriceProfitInput);
    };
    
    const calculateProfit = (boughtRecords, value) => {
        const amountSum = Array.from(boughtRecords)
            .map(item => item.amount)
            .reduce((sum, amount) => sum + amount, 0);
        const totalsSum = Array.from(boughtRecords)
            .map(item => item.price * item.amount)
            .reduce((sum, price) => sum + price, 0);
    
        const profit = totalsSum - (amountSum * value);
    
        return profit > 0 ? profit : 0;
    };
    
    const profitEl = document.querySelector('.profit-value');

    return {
        change : (entryPointsForm, exitPointsForm) => {
            const value = getCurrentPriceInputValue();
            if (!value) {
                currentPriceProfitInput.textContent = '';
                return 0;
            }
        
            const entryState = entryPointsForm.getState();
            const boughtRecords = Object
                .keys(entryState)
                .map((key) => entryState[key]);
        
            const exitState = exitPointsForm.getState();
            const soldRecords = Object
                .keys(exitState)
                .map((key) => exitState[key]);
        
            const changeProfitElValue = (profit) => {
                profitEl.textContent =
                    (profit > 0) ? `+ ${profit.toLocaleString()}` :
                    (profit === 0) ? `0` :
                    `- ${Math.abs(profit).toLocaleString()}`;
            }
        
            let soldRecordIndex = soldRecords.length - 1;
            let soldRecord = soldRecords[soldRecordIndex];
        
            if (!soldRecord || !soldRecord.amount) {
                const profit = calculateProfit(boughtRecords, value);
                changeProfitElValue(profit);
                return;
            }
        
            const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
        
            if (recordsBoughtEarlier.length === 0) {
                const profit = calculateProfit(boughtRecords, value);
                changeProfitElValue(profit);
                return;
            }
        
            let profit = 0;
            let indexModificator = 1;
            while (soldRecord && soldRecord.amount) {
                const filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
                profit += calculateProfit(filteredBoughtRecords, value);
        
                soldRecordIndex = soldRecords.length - ++indexModificator;
                soldRecord = soldRecords[soldRecordIndex];
            }
            changeProfitElValue(profit);
        }
    }
};

const addProfitInputEvent = (input, entryPointsForm, exitPointsForm) => {
    input.addEventListener('input', () => {
        const value = readInputValue(input);
        if (!value) {
            return 0;
        }

        profitPriceCounter().change(entryPointsForm, exitPointsForm);
    });
};

const currentPriceAmountInput = document.querySelector('.desired-average-price-container__current-price > .current-price__input');
const desiredPriceAmountInput = document.querySelector('.desired-average-price-container__desired-price > .desired-price__input');

const addProfitInputEventListener = (entryPointsForm, exitPointsForm) => {
    addInputBlurFocusEvents(currentPriceProfitInput);
    addProfitInputEvent(currentPriceProfitInput, entryPointsForm, exitPointsForm);
};
