import './header.css';
const Header = ({usd, eur}) => {

    return (
        <div className="header">
            <div className='currency-bord'>
                <div className='currency-lable'>{usd.cc}: {(usd.rate).toFixed(2)}</div>
            <div className='currency-lable'>{eur.cc}: {(eur.rate).toFixed(2)}</div>
            </div> 
        </div>
    )
}

export default Header;