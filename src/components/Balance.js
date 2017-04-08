import React, { PropTypes } from 'react';
import './Balance.css';

const Balance = ({activeCurrency, money}) => {

    let available = money[activeCurrency.abbreviation] || 0;

    return (
        <div className="Balance">
            <span className="count">{available}</span>
        </div>
    )
};

Balance.propTypes = {
    activeCurrency: PropTypes.object.isRequired,
    money: PropTypes.object.isRequired
};

export default Balance;
