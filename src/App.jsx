import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/button'
import CurrencyInput from './components/currencyInput'
import currencyApi from './services/currencyApi'
import {RefreshIcon} from './components/icon/refeshIcon'

function App() {
  const [currenciesList, setCurrenciesList] = useState([])
  const [fromCurrency, setFromCurrency] = useState('USD')  
  const [toCurrency, setToCurrency] = useState('THB')
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [targetExchangeRate, setTargetExchangeRate] = useState(0)

  const getExchangeRate = async () => {
    try {
      setLoading(true)
      const resp = currencyApi.getExchangeRate(fromCurrency, toCurrency)
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
      const resp = currencyApi.getCurrencyCodes()
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
      <div className="w-full max-w-xl mx-auto border border-[#474747] rounded-2xl">
        <div className="w-full border-b border-[#474747]">
          Currency Converter
        </div>
        <div className="w-full flex">
        <div className="text-orange-500 bg-orange-300 p-1 rounded-4xl">
          1 {fromCurrency} = {targetExchangeRate} {toCurrency}
        </div>
        <Button loading={loading} onClick={getExchangeRate}>
          <RefreshIcon spin={false} />
          Update Rate
        </Button>
        </div>
        <div className="w-full flex">
          <CurrencyInput value={amount} onChange={setAmount} onCurrencyChange={(currency) => setFromCurrency(currency)} currenciesList={currenciesList}/>
          <Button>Convert</Button>
          <CurrencyInput value={amount * targetExchangeRate} raedOnly onCurrencyChange={(currency) => setToCurrency(currency)} currenciesList={currenciesList} />
        </div>
      </div>
    </>
  )
}

export default App
