import React from 'react';
import './App.css';
import '@microfocus/ux-ias/dist/ux-ias.css'
import '@microfocus/ias-icons/dist/ias-icons.css'
import { ConnectedTodoList } from './todos/TodoList';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Joseph'
        };
    }
    render() {

        return (
            <React.Fragment>
                <h1>{this.state.name}'s To Do List</h1>
                <ConnectedTodoList />
            </React.Fragment>
        );
    }
}
