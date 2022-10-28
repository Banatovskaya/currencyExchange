import Header from "./Header/header";
import Main from "./Main/main";
import {useState, useEffect} from 'react';
import './App.css';

function App() {

	const [dataAll, setDataAll] = useState([]);
	const [date] = useState(setDate);
	const [loadingStatus, setLoadingStatus] = useState('idle');
	const uah = {r030: 980, txt: 'Українська гривня', rate: 1, cc: 'UAH', exchangedate: '24.08.1991'};

	useEffect(() => {
		getAllCurrency(date)
	}, []);

	//we can't take API Course for the current date because in current date API NBU after 16-00 set exchange rate next day 
	// we need API with exact DATE 
	const getAllCurrency = async (date) => {
		setLoadingStatus('loading')
		const data = fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json?valcode=EUR&date=${date}`)
			.then((res) => {
				if (res.status === 201 || res.status === 200){			
					return res.json()
				} else {
				setLoadingStatus('error')
				throw new Error(`Could not loading, status: ${res.status}`);
				}
			})
		   .catch((err) => {
			setLoadingStatus('error');
			throw err;
		})
		const dataForState = await data;
		dataForState.unshift(uah); //add hrivna object
	    setDataAll( dataForState);
		setLoadingStatus("loaded");
    };
	
	//we need exact DATE, because in current API NBU after 16-00 set exchange rate next day
    function setDate() {	
		const dataCurrency = new Date();
		const YYYY = dataCurrency.getFullYear();
		const MM = addZero(dataCurrency.getMonth() + 1);
		const DD = addZero(dataCurrency.getDate());
		const date = String(YYYY) + MM + DD;
		return date;
	};

	function addZero(num) {
		if (num < 10) {
			return "0" + num;
		} else return num;
	}
	
	if (loadingStatus === "idle"){
		return <h1>wait</h1>
	};

	if (loadingStatus === "loading"){
		return <h1>loading</h1>
	};

	if (loadingStatus === "error"){
		return <h1>err</h1>
	};

	const findCurrencyByCode = (id) => {
        return  dataAll.find(el => el.r030 === id)
    };
	
	const eur = findCurrencyByCode(978);
	const usd = findCurrencyByCode(840);
	
	return (
		<>
			<Header usd={usd} eur={eur} />
			<Main currencyAll={dataAll} loadingStatus={loadingStatus} />
		</>
	);
};
	
export default App;
