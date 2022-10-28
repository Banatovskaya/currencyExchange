import './main.css';
import {useState} from 'react';
const Main = ({currencyAll}) => {

    const [firstCurrency, setFirstCurrency] = useState(currencyAll[0]);
    const [secondCurrency, setSecondCurrency] = useState(currencyAll[0]);
    const [firstAmount, setFirstAmount] = useState(1);
    const [secondAmount, setSecondAmount] = useState(1);

    const setCurrencyForFirst = (id) => {
        const item =  currencyAll.find(el => el.r030 === id);
        setSecondAmount(+(firstAmount * item.rate / secondCurrency.rate).toFixed(4));
        setFirstCurrency(item);
    }

    const setCurrencyForSecond = (id) => {
        const item =  currencyAll.find(el => el.r030 === id);
        setSecondAmount(+(firstAmount * firstCurrency.rate / item.rate).toFixed(4));
        setSecondCurrency(item); 
    }  
    //when the amount is changing in any input conversion occurs in both directions
    //when the currency-name is changing, the amount of currency is changing only in second input
    //because it is more comfortable for user
    

    const recalculationForSecond = (value) => {
            setSecondAmount(+(value * firstCurrency.rate / secondCurrency.rate).toFixed(4));
            setFirstAmount(+value.toFixed(4));
    }
   
    const recalculationForFirst = (value) => {
            setFirstAmount(+(value * secondCurrency.rate / firstCurrency.rate).toFixed(4));
            setSecondAmount(+value.toFixed(4));
    }

    const options = (arr) => {
        return arr.map((currency) => {
            return (<option key={currency.r030} value={currency.r030}>{currency.cc}:{currency.txt}</option>);
        }) ; 
    }
    
    return (
        <div className='main'>
            <div className='currency-wrap container'>
                <div className='currency-wrap__item'>
                    <input className='currency-wrap__amount' min={1} value={firstAmount!==0?firstAmount:''} type="number" 
                        onChange={(e)=>{recalculationForSecond(+e.target.value)}}/>
                    <select className='currency-wrap__select' name="currency" 
                        onChange={(e) => {setCurrencyForFirst(+e.target.value)}}>
                        {options(currencyAll)}
                    </select>
                </div>
                <div className='currency-wrap__item'>
                    <input className='currency-wrap__amount' min={1} value={secondAmount!==0?secondAmount:''} type="number" 
                        onChange={(e)=>{recalculationForFirst(+e.target.value)}}/>
                    <select className='currency-wrap__select' name="currency" 
                        onChange={(e) => {setCurrencyForSecond(+e.target.value)}}>
                        {options(currencyAll)}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Main