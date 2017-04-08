import React, { PropTypes } from 'react';
import './ControlButtons.css';

const ControlButtons = ({onExchangeClick}) => {
    return (
        <div className="ControlButtons">
            <button
                className="btn"
                onClick={onExchangeClick}>
                Exchange
            </button>
            <button className="btn -disabled">
                To bank
            </button>
        </div>
    )
};

ControlButtons.propTypes = {
    onExchangeClick: PropTypes.func.isRequired

};

export default ControlButtons;

