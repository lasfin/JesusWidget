import initialState from '../../reducers/initialState';

const ADD_EXCHANGE_EVENT = 'ADD_EXCHANGE_EVENT';

export default function historyReducer(state = initialState.history, action) {
    switch (action.type) {
        case ADD_EXCHANGE_EVENT:
            return [
                ...state, {
                    amount: action.payload.moneyToLost,
                    currency: action.payload.moneyToLostAbbreviation,
                    status: action.payload.status
                }
            ];
        default:
            return state;
    }
}


export function addExchangeEvent(event) {
    return {
        type: ADD_EXCHANGE_EVENT,
        payload: event
    }
}
