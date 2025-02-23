import PropTypes from 'prop-types';
import Select from 'react-select';
import { useState, useEffect } from 'react';

const CurrencyInput = ({ currenciesList, currency, onCurrencyChange, onChange, value, raedOnly }) => {
    const [options, setOptions] = useState([]) ;

    const handleSelectChange = (selectedOption) => {
        onCurrencyChange(selectedOption.value);
    };

    useEffect(() => {
        const clist = currenciesList.map((currency) => ({
            value: currency.code,
            label: (
                <div className="flex items-center">
                    <img src={currency.icon} alt={currency.code} className="w-6 h-6 mr-2" />
                    {currency.code}
                </div>
            ),
        }))

        setOptions(clist)
    }, [currenciesList]);

    return (
        <div className="flex flex-col space-y-2">
            <input 
                type="number"
                value={value}
                readOnly={raedOnly}
                onChange={onChange} 
                className="border border-gray-300 p-2 rounded"
            />
            <Select 
                value={options.find(option => option.value === currency)}
                onChange={handleSelectChange}
                options={options}
                className="border border-gray-300 p-2 rounded"
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