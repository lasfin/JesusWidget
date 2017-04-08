import React, { PropTypes } from 'react';
import './ExchangeDescription.css';

const ExchangeDescription = ({text}) => {

    return (
        <div className="ExchangeDescription">
            {text}
        </div>
    )
};

ExchangeDescription.propTypes = {
    text: PropTypes.string.isRequired
};

export default ExchangeDescription;
