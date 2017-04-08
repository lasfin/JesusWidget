import { combineReducers } from 'redux';
import exchangeReducer from '../containers/exchange/ExchangeDuck';
import historyReducer from '../containers/history/historyDuck';

const rootReducer = combineReducers({
    exchange: exchangeReducer,
    history: historyReducer
});

export default rootReducer;