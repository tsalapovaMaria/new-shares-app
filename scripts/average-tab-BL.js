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

    const countPriceWhileSoldExist = (boughtRecords, soldRecords) => {    
        let soldRecordIndex = soldRecords.length - 1;
        let soldRecord = soldRecords[soldRecordIndex];
    
        if (!(soldRecord && soldRecord.amount)) {
            return countAverage(boughtRecords);
        }
    
        const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
    
        if (recordsBoughtEarlier.length === 0) {
            return countAverage(boughtRecords);
        }
    
        let indexModificator = 1;
        let filteredBoughtRecords;

        //фильтровать массив с купленными акциями
        //ПОКА проходим по массиву с проданными акциями
        while (soldRecord && soldRecord.amount) {
            filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
            
            if(!filteredBoughtRecords){
                return 0;
            }
    
            soldRecordIndex = soldRecords.length - ++indexModificator;
            soldRecord = soldRecords[soldRecordIndex];
        }

        if(filteredBoughtRecords.length === 1){
            return filteredBoughtRecords[0].price;
        } else {
            return countAverage(filteredBoughtRecords);
        }
    };

    return {
        count : (entryPointsForm, exitPointsForm) => {
            const entryState = entryPointsForm.getState();
            const boughtRecords = Object
                .keys(entryState)
                .map((key) => entryState[key]);
        
            const exitState = exitPointsForm.getState();
            const soldRecords = Object
                .keys(exitState)
                .map((key) => exitState[key]);
        
            return countPriceWhileSoldExist(boughtRecords, soldRecords);
        }
    }
};

const profitPriceCounter = function() {    
    const calculateProfit = (boughtRecords, value) => {
        const amountSum = Array.from(boughtRecords)
            .map(item => item.amount)
            .reduce((sum, amount) => sum + amount, 0);
        const totalsSum = Array.from(boughtRecords)
            .map(item => item.price * item.amount)
            .reduce((sum, price) => sum + price, 0);
    
        const profit = totalsSum - (amountSum * value);
    
        return profit;
    };    

    return {
        count : (value, entryPointsForm, exitPointsForm) => {        
            const entryState = entryPointsForm.getState();
            const boughtRecords = Object
                .keys(entryState)
                .map((key) => entryState[key]);
        
            const exitState = exitPointsForm.getState();
            const soldRecords = Object
                .keys(exitState)
                .map((key) => exitState[key]);
                
            let soldRecordIndex = soldRecords.length - 1;
            let soldRecord = soldRecords[soldRecordIndex];
        
            if (!soldRecord || !soldRecord.amount) {
                const profit = calculateProfit(boughtRecords, value);
                return profit;
            }
        
            const recordsBoughtEarlier = boughtRecords.filter(boughtRecord => boughtRecord.id < soldRecord.id);
        
            if (recordsBoughtEarlier.length === 0) {
                const profit = calculateProfit(boughtRecords, value);
                return profit;
            }
        
            let profit = 0;
            let indexModificator = 1;

            while (soldRecord && soldRecord.amount) {
                const filteredBoughtRecords = getFilteredBoughtRecords(boughtRecords, soldRecord);
                
                if(!filteredBoughtRecords){
                    return 0;
                }

                profit += calculateProfit(filteredBoughtRecords, value);
        
                soldRecordIndex = soldRecords.length - ++indexModificator;
                soldRecord = soldRecords[soldRecordIndex];
            }
            return profit;
        }
    }
};
