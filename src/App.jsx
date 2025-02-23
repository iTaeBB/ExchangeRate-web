import { useEffect, useState } from 'react'
import './App.css'
import CurrencyInput from './components/currencyInput'
import currencyApi from './services/currencyApi'
import {RefreshIcon} from './components/icon/refeshIcon'

function App() {
  const [currenciesList, setCurrenciesList] = useState([])
  const [fromCurrency, setFromCurrency] = useState('USD')  
  const [toCurrency, setToCurrency] = useState('THB')
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [targetExchangeRate, setTargetExchangeRate] = useState(0)

  const getExchangeRate = async () => {
    try {
      setLoading(true)
      const resp = await currencyApi.getExchangeRate(fromCurrency, toCurrency)
      if (resp) {
        setTargetExchangeRate( resp.rate )
      }
    } catch (error) {
      alert('Error fetching exchange rate:', error)
    } finally {
      setLoading(false)
    }

  }

  const getCurrencyCodes = async () => {
    try {
      const resp = await currencyApi.getCurrencyCodes()
      if (resp) {
        setCurrenciesList( resp.currencies || [] )
      }
    } catch (error) {
      alert('Error fetching currency codes:', error)
    }
  }

  useEffect(() => {
    getCurrencyCodes();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getExchangeRate();
    // eslint-disable-next-line
  }, [fromCurrency, toCurrency])

  return (
    <>
      <div className="w-full max-w-2xl mx-auto border border-[#474747] rounded-2xl">
        <div className="w-full border-b border-[#474747] p-2 text-start font-bold text-xl">
          <h1>Currency Converter</h1>
        </div>
        <div className="w-full flex p-2 gap-2">
          <div className="text-orange-500 bg-orange-300 rounded-4xl p-2">
            <p>1 {fromCurrency} = {targetExchangeRate} {toCurrency}</p>
          </div>
          <button className='text-white bg-orange-500 flex gap-1 rounded-4xl p-2 disabled:opacity-70' onClick={getExchangeRate} disabled={loading}>
            <RefreshIcon spin={loading} />
            <span>Update Rate</span>
          </button>
        </div>
        <div className="w-full flex p-2 gap-1">
          <CurrencyInput value={amount} currency={fromCurrency} onChange={setAmount} onCurrencyChange={(currency) => setFromCurrency(currency)} currenciesList={currenciesList}/>
          Convert
          <CurrencyInput value={amount * targetExchangeRate} currency={toCurrency} raedOnly onCurrencyChange={(currency) => setToCurrency(currency)} currenciesList={currenciesList} />
        </div>
      </div>
    </>
  )
}

export default App
