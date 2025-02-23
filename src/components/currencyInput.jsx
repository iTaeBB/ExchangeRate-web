import PropTypes from 'prop-types';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import "flag-icons/css/flag-icons.min.css";

const CurrencyInput = ({ currenciesList, currency, onCurrencyChange, onChange, value, raedOnly }) => {
    const [options, setOptions] = useState([]) ;

    const handleSelectChange = (selectedOption) => {
        onCurrencyChange(selectedOption.value);
    };
    const handleChangeValue = (event) => {
        console.log(event.target.value)
        onChange(event.target.value);
    };

    useEffect(() => {
        const clist = currenciesList.map((currency) => ({
            value: currency.code,
            label: (
                <div className="flex items-center gap-1">
                    <span className={`fi fi-${currency.code.slice(0, 2).toLowerCase()} w-1.5`}></span>
                    {/* <img src={currency.icon} alt={currency.code} className="w-3 h-3 mr-1" /> */}
                    {currency.code}
                </div>
            ),
        }))

        setOptions(clist)
    }, [currenciesList]);

    return (
        <div className="flex space-y-2 w-full border border-gray-300">
            <input 
                type="number"
                value={value}
                readOnly={raedOnly}
                onChange={handleChangeValue} 
                className="w-[60%]"
            />
            <Select 
                value={options.find(option => option.value === currency)}
                onChange={handleSelectChange}
                options={options}
                className="w-[40%]"
                isSearchable
            />
        </div>
    );
};

CurrencyInput.propTypes = {
    currenciesList: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    raedOnly: PropTypes.bool,
    onCurrencyChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CurrencyInput;