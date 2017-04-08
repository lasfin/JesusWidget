import React, { PropTypes, Component } from 'react';
import { changeActiveCurrency, changeCurrencyTo } from './ExchangeDuck';
import Balance from '../../components/Balance';
import CurrencySlider from '../../components/CurrencySlider';
import ExchangeHistory from '../../components/ExchangeHistory';
import ControlButtons from '../../components/ContolButtons';
import ExchangeRates from './ExchangeRates';
import { connect } from 'react-redux';

class ExchangeMain extends Component {

    constructor() {
        super();
        let tabs = ['balance', 'exchange'];

        this.state = {
            activeTab: tabs[0],
            tabs
        };

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(tabName) {
        this.setState({
            activeTab: tabName
        })
    }

    render() {
        return (
            <div className="App">
                { this.state.activeTab === this.state.tabs[0] ?
                    <div>
                        <Balance
                            activeCurrency={this.props.activeCurrency}
                            money={this.props.money}
                        />
                        <CurrencySlider
                            currency={this.props.activeCurrency}
                            availableCurrencies={this.props.availableCurrencies}
                            onDotClick={this.props.changeActiveCurrency}
                            showTitle={true}
                        />
                        <ControlButtons
                            onExchangeClick={ () => { this.changeTab(this.state.tabs[1]) } }
                        />
                        <ExchangeHistory
                            history={this.props.history}
                            availableCurrencies={this.props.availableCurrencies}
                        />
                    </div>
                    :
                    <ExchangeRates
                        onGoBackClick={ () => { this.changeTab(this.state.tabs[0]) } }
                    />
                }
            </div>
        )
    }
}


ExchangeMain.propTypes = {
    activeCurrency: PropTypes.object.isRequired,
    availableCurrencies: PropTypes.array.isRequired,
    money: PropTypes.object.isRequired,
    history: PropTypes.array.isRequired,
    changeActiveCurrency: PropTypes.func.isRequired,
    changeCurrencyTo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    activeCurrency: state.exchange.currency,
    availableCurrencies: state.exchange.availableCurrencies,
    money: state.exchange.money,
    history: state.history
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveCurrency: (currency) => { dispatch(changeActiveCurrency(currency)) },
    changeCurrencyTo: (currency) => { dispatch(changeCurrencyTo(currency)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeMain);
