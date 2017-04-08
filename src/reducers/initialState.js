const CURRENCIES = [
    { abbreviation: 'USD', full: 'dollar' },
    { abbreviation: 'EUR', full: 'euro' },
    { abbreviation: 'GBP', full: 'british pound' }
];

export default {

    exchange: {
        currency: CURRENCIES[0],
        currencyTo: CURRENCIES[1],
        availableCurrencies: CURRENCIES,
        money: {
            'USD': 315.5,
            'EUR': 100
        },
        rates: {},
        loadingRates: false,
        loaded: false
    },

    history: [
        {
            amount: 315.5,
            currency: 'USD',
            status: 'SUCCESS'
        },
        {
            amount: 110,
            currency: 'EUR',
            status: 'SUCCESS'
        },
        {
            amount: -10,
            currency: 'EUR',
            status: 'SUCCESS'
        }
    ]
}
