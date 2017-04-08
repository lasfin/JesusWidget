import initialState from '../../reducers/initialState';
import config from '../../common/config';
import axios from 'axios';

const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
const CHANGE_CURRENCY_TO = 'CHANGE_CURRENCY_TO';
const REQUEST_RATES = 'REQUEST_RATES';
const REQUEST_RATES_SUCCESS = 'REQUEST_RATES_SUCCESS';

export default function exchangeReducer(state = initialState.exchange, action) {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {
                ...state,
                currency: action.payload,
                currencyTo: action.payload === state.currencyTo ? state.currency : state.currencyTo
            };
        case CHANGE_CURRENCY_TO: {
            return {
                ...state,
                currencyTo: action.payload,
                currency: action.payload === state.currency ? state.currencyTo : state.currency
            }
        }
        case REQUEST_RATES : {
            return {
                ...state,
                loadingRates: true
            }
        }
        case REQUEST_RATES_SUCCESS: {
            return {
                ...state,
                loadingRates: false,
                rates: action.payload,
                loaded: true
            }
        }
        default:
            return state;
    }
}


export function changeActiveCurrency(currency) {
    return {
        type: CHANGE_CURRENCY,
        payload: currency
    }
}

export function changeCurrencyTo(currency) {
    return {
        type: CHANGE_CURRENCY_TO,
        payload: currency
    }
}

export function requestRates() {
    return {
        type: REQUEST_RATES
    }
}

export function fetchRates() {
    return function (dispatch) {
        dispatch(requestRates());
        return axios.get(config.api.latest + config.appId)
            .then((response) => {
                dispatch(loadRatesSuccess(response.data.rates));
                setTimeout(() => {
                    dispatch(fetchRates());
                }, config.exchangeRequestTimeout);
            })
            .catch((error) => {
                console.error(error);
            })
    };
}

export function loadRatesSuccess(data) {
    return {
        type: REQUEST_RATES_SUCCESS,
        payload: data
    };
}