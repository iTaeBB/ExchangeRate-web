import PropTypes from 'prop-types';
import {RefreshIcon} from './icon/refeshIcon';   

const Button = ({ color = 'blue', rounded = 'md', children, loading }) => {
    const baseClasses = `px-4 py-2 font-semibold text-white`;
    const colorClass = `bg-${color}-500 hover:bg-${color}-700`;
    const roundedClass = `rounded-${rounded}`;

    return (
        <button className={`${baseClasses} ${colorClass} ${roundedClass}`}>
            {loading ? (
                <RefreshIcon spin />
            ) : (
                children
            )}
        </button>
    );
};
Button.propTypes = {
    color: PropTypes.string,
    rounded: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default Button;