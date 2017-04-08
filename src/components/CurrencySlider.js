import React, { PropTypes } from 'react';
import './CurrencySlider.css';

const CurrencySlider = ({ currency, availableCurrencies, onDotClick, showTitle }) => {
    return (
        <div className="CurrencySlider">

            { showTitle &&
                <div className="title">{ currency.abbreviation } - { currency.full }</div>
            }

            <div className="dots-wrap">
                <div className="dots">
                    { availableCurrencies.map((item, index) => {
                        return (
                            <div key={index}
                                 className={`slider-dot ${item.abbreviation === currency.abbreviation ?
                                     'active' : ''}`}
                                 onClick={() => { onDotClick(item) }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

CurrencySlider.propTypes = {
    currency: PropTypes.object.isRequired,
    availableCurrencies: PropTypes.array.isRequired,
    onDotClick: PropTypes.func.isRequired,
    showTitle: PropTypes.bool
};

export default CurrencySlider;





