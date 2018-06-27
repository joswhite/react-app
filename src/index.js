import './index.css';
import {App} from './App';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import uuid from 'uuid/v1'

const initialState = {
    email: 'j@elena.com',
    todos: [ { id: uuid(), name: 'Check work email', completed: false } ]
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
