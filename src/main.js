import {useState} from 'react';
const Main = ({currencyAll}) => {

    const [firstCurrency, setFirstCurrency] = useState(currencyAll[0]);
    const [secondCurrency, setSecondCurrency] = useState(currencyAll[0]);
    const [firstAmount, setFirstAmount] = useState(1);
    const [secondAmount, setSecondAmount] = useState(1);

    const setCurrencyForFirst = (id) => {
        const item =  currencyAll.find(el => el.r030 === id);
        setSecondAmount((firstAmount * item.rate / secondCurrency.rate).toFixed(2))
        setFirstCurrency(item);
    }

    const setCurrencyForSecond = (id) => {
        const item =  currencyAll.find(el => el.r030 === id);
        setSecondAmount((firstAmount * firstCurrency.rate / item.rate).toFixed(2));
        setSecondCurrency(item);
    }

    const recalculationForSecond = (value) => {
        if (value === 0) value = '' ; 
        setSecondAmount(value * firstCurrency.rate / secondCurrency.rate);
        setFirstAmount(value.toFixed(2));
    }
   
    const recalculationForFirst = (value) => {
        if (value === 0) value = ''
        console.log(value);
        setFirstAmount((value * secondCurrency.rate / firstCurrency.rate).toFixed(2));
        setSecondAmount(value.toFixed(2));
    }

    const options = (arr) => {
        return arr.map((currency) => {
            return (<option key={currency.r030} value={currency.r030}>{currency.cc}:{currency.txt}</option>)
        }) ; 
    }
    
    return (
        <>
            <div>
                <input min={1} value={firstAmount} type="number" 
                    onChange={(e)=>{recalculationForSecond(+e.target.value)}}/>
                <select name="currency" 
                    onChange={(e) => {setCurrencyForFirst(+e.target.value)}}>
                    {options(currencyAll)}
                </select>
            </div>
            
            <div>
                <input min={1} value={secondAmount} type="number" 
                    onChange={(e)=>{recalculationForFirst(+e.target.value)}}/>
                <select name="currency" 
                    onChange={(e) => {setCurrencyForSecond(+e.target.value)}}>
                    {options(currencyAll)}
                </select>
            </div>
        </>
    )
}

export default Main