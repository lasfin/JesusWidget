import React, { PropTypes, Component } from 'react';
import ExchangeHeader from '../../components/ExchangeManager/ExchangeHeader';
import ExchangeDescription from '../../components/ExchangeManager/ExchangeDescription';
import CurrencySlider from '../../components/CurrencySlider';
import Spinner from '../../components/ExchangeManager/Spinner';
import { changeActiveCurrency, changeCurrencyTo, fetchRates } from './ExchangeDuck';
import { addExchangeEvent } from '../history/historyDuck';
import { connect } from 'react-redux';
import fx from 'money';
class ExchangeRates extends Component {

    constructor() {
        super();
        this.state = {
            moneyToLost: 0,
            moneyToGet: 0
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
    }


    componentDidMount() {
        if (!Object.keys(this.props.rates).length) {
            this.props.fetchRates();
        }
    }

    onInputChange() {
        this.setNewValue(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setNewValue(nextProps);
    }


    setNewValue(props) {
        if (Object.keys(props.rates).length) {
            let moneyToLost = this.inputFrom ? parseFloat(this.inputFrom.value) : 0;
            fx.rates = props.rates;

            this.setState({
                moneyToLost,
                moneyToGet: parseFloat(fx.convert(moneyToLost, {
                    from: props.currency.abbreviation,
                    to: props.currencyTo.abbreviation
                }).toFixed(2))
            });
        }

    }

    render() {
        return (
            <div className="ExchangeManager">
                { !this.props.loaded ?
                    <Spinner/>
                    :
                    <div>
                        <ExchangeHeader
                            onGoBackClick={ this.props.onGoBackClick }
                            exchangePossible={
                                this.props.money[this.props.currency.abbreviation] >= this.state.moneyToLost
                                && this.state.moneyToLost > 0
                            }
                            addExchangeEvent={ this.props.addExchangeEvent }
                            moneyToLost={ this.state.moneyToLost }
                            moneyToLostAbbreviation={ this.props.currency.abbreviation }
                        />

                        <ExchangeDescription
                            text={`You have:${this.props.currency.full}
                                 ${this.props.money[this.props.currency.abbreviation] || 0}`}
                        />

                        <input
                            ref={(input) => { this.inputFrom = input; }}
                            type="number"
                            step="10"
                            min="0"
                            max="5000"
                            className="exchangeInput"
                            onChange={ this.onInputChange }
                        />

                        <CurrencySlider
                            currency={ this.props.currency }
                            availableCurrencies={ this.props.availableCurrencies }
                            onDotClick={ this.props.changeActiveCurrency }
                            showTitle={ false }
                        />

                        <ExchangeDescription text={`Change to: ${this.props.currencyTo.full}`} />

                        <input type="text" className="exchangeInput" readOnly
                               value={ this.state.moneyToGet ? this.state.moneyToGet : '' }
                        />

                        <CurrencySlider
                            currency={ this.props.currencyTo }
                            availableCurrencies={ this.props.availableCurrencies }
                            onDotClick={ this.props.changeCurrencyTo }
                            showTitle={ false }
                        />
                    </div>
                }

            </div>
        )
    }
}


ExchangeRates.propTypes = {
    currency: PropTypes.object.isRequired,
    currencyTo: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    availableCurrencies: PropTypes.array.isRequired,
    money: PropTypes.object.isRequired,
    changeActiveCurrency: PropTypes.func.isRequired,
    changeCurrencyTo: PropTypes.func.isRequired,
    onGoBackClick: PropTypes.func.isRequired,
    addExchangeEvent: PropTypes.func.isRequired,
    rates: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    currency: state.exchange.currency,
    currencyTo: state.exchange.currencyTo,
    availableCurrencies: state.exchange.availableCurrencies,
    money: state.exchange.money,
    loaded: state.exchange.loaded,
    rates: state.exchange.rates
});

const mapDispatchToProps = (dispatch) => ({
    fetchRates: () => { dispatch(fetchRates()) },
    changeActiveCurrency: (currency) => { dispatch(changeActiveCurrency(currency)) },
    changeCurrencyTo: (currency) => { dispatch(changeCurrencyTo(currency)) },
    addExchangeEvent: (data) => { dispatch(addExchangeEvent(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRates);
