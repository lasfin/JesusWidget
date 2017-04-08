import React from 'react';
import ExchangeMain from './containers/exchange/ExchangeMain';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './common.css';

const App = () => {
    return (
        <Provider store={ configureStore() }>
            <ExchangeMain/>
        </Provider>
    )
};

export default App;
