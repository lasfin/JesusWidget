import React, { PropTypes, Component } from 'react';
import find from 'lodash/find';
import './ExchangeHistory.css';

class ExchangeHistory extends Component {

    constructor(props) {
        super(props);
        let history = this.props.history;
        this.state = {
            history: history.map((event) => this.extentHistory(event, this.props.availableCurrencies)).reverse()
        }
    }

    extentHistory(event, availableCurrencies) {
        let currency = find(availableCurrencies, {abbreviation: event.currency});
        return Object.assign(event, { full: currency.full, abbreviation: currency.abbreviation });
    }

    render() {
        return (
            <div className="ExchangeHistory">
                <ul className="list">
                    { this.state.history.map((event, index) => {
                        return (
                            <li key={index}>
                                { event.amount } { event.full }
                                { event.status === 'SUCCESS' ?
                                    <span className="label -success">success</span>
                                    :
                                    <span className="label -failed">failed</span>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

ExchangeHistory.propTypes = {
    history: PropTypes.array.isRequired
};

export default ExchangeHistory;

