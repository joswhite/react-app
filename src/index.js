import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

const initialState = {
    email: 'j@elena.com'
};
const store = createStore((state, action) => {
    if (action.type === 'SAVE_EMAIL') {
        return {
            email: action.email
        };
    }
    return state;
}, initialState);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
