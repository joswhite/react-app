import './index.css';
import { NEW_TODO, EDIT_TODO, DELETE_TODO } from './action-types';
import {App} from './App';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import uuid from 'uuid/v1';

const initialState = {
    email: 'j@elena.com',
    todos: [
        { id: uuid(), name: 'Check work email', completed: false },
        { id: uuid(), name: 'Learn React', completed: false }
    ]
};
const store = createStore((state, action) => {
    let index;
    let todos;
    switch (action.type) {
        case NEW_TODO:
            todos = state.todos.concat({ id: uuid(), name: '', completed: false});
            return {email: state.email, todos};
        case EDIT_TODO:
            todos = [...state.todos];
            index = findTodoIndex(todos, action.todo);
            if (index) {
                todos[index].name = action.name;
            }
            return {email: state.email, todos};
        case DELETE_TODO:
            todos = [...state.todos];
            index = findTodoIndex(todos, action.todo);
            if (index) {
                todos.splice(index, 1);
            }
            return {email: state.email, todos};
        default:
            return state;
    }
}, initialState);

function findTodoIndex(todos, todo) {
    return 0;
}

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
