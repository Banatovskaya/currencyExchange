const Header = ({usd, eur}) => {

    return (
        <>
            <div>{usd.cc}: {usd.rate}</div>
            <div>{eur.cc}: {eur.rate}</div>
        </> 
    )
}

export default Header;