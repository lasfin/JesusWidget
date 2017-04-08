import React, { PropTypes } from 'react';
import './ExchangeHeader.css';

const ExchangeHeader = ({onGoBackClick, exchangePossible, addExchangeEvent, moneyToLostAbbreviation, moneyToLost}) => {

    function exchangeAndGoBack() {
        if (exchangePossible) {
            addExchangeEvent({moneyToLost: -moneyToLost, moneyToLostAbbreviation, status: 'FAILED' });
            onGoBackClick();
        }
    }

    return (
        <div className="ExchangeHeader">
            <button onClick={ onGoBackClick } className="goBack">Back</button>
            <button onClick={ exchangeAndGoBack }
                    className={`exchange ${exchangePossible && '-valid'}`}>
                Exchange!
            </button>
            <div className="title">Exchange</div>
        </div>
    )
};

ExchangeHeader.propTypes = {
    onGoBackClick: PropTypes.func.isRequired,
    exchangePossible: PropTypes.bool.isRequired,
    addExchangeEvent: PropTypes.func.isRequired,
    moneyToLostAbbreviation: PropTypes.string.isRequired,
    moneyToLost: PropTypes.number.isRequired

};

export default ExchangeHeader;
