const amountToBuyCounter = () => {
    const calculateAmount = (userValuesEntered, boughtRecords, soldRecords) => {
        const [desiredPrice, currentPrice] = userValuesEntered;
    
        const entryAmountSum = Array.from(boughtRecords).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        const exitAmountSum = Array.from(soldRecords).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    
        const restAmountSum = entryAmountSum - exitAmountSum;
    
        const priceEntrySum = Array.from(boughtRecords).map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    
        return ((restAmountSum * priceEntrySum) - (desiredPrice * restAmountSum)) / (desiredPrice - currentPrice);
    };
    return {
        count : (userValuesEntered, entryPointsForm, exitPointsForm) => {
            const entryState = entryPointsForm.getState();
            const boughtRecords = Object
                .keys(entryState)
                .map((key) => entryState[key]);
        
            const exitState = exitPointsForm.getState();
            const soldRecords = Object
                .keys(exitState)
                .map((key) => exitState[key]);
        
            return calculateAmount(userValuesEntered, boughtRecords, soldRecords);
        }        
    }
}
