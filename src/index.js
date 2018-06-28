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
    todos: [
        { id: uuid(), name: 'Check work email' },
        { id: uuid(), name: 'Learn React' }
    ],
    /*email: 'j@elena.com'*/
};

/*todos: {
    'A': {name: 'Check work email'},
    'B': {name: 'Learn React'}
},*/

const store = createStore((state, action) => {
    let index;
    let todos;
    switch (action.type) {
        case NEW_TODO:
            todos = state.todos.concat({ id: uuid(), name: '', new: true });
            return {...state, todos};
        case EDIT_TODO:
            todos = [...state.todos];
            index = findTodoIndex(todos, action.todo);
            if (index !== -1) {
                let todo = { id: action.todo.id, name: action.name };
                todos.splice(index, 1, todo);
            }
            // return {
            //     ...state,
            //     todos: {
            //         ...state.todos,
            //         [action.todoId]: action.name
            //     }
            // }
            return {...state, todos};
        case DELETE_TODO:
            todos = [...state.todos];
            index = findTodoIndex(todos, action.todo);
            if (index !== -1) {
                todos.splice(index, 1);
            }
            return {...state, todos};
        default:
            return state;
    }
}, initialState);

function findTodoIndex(todos, todo) {
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id === todo.id) {
            return index;
        }
    }
    return -1;
}

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
