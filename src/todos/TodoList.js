import { NEW_TODO, EDIT_TODO, DELETE_TODO } from '../action-types';
import React from 'react';
import {connect} from 'react-redux';

export class TodoList extends React.Component {
    render() {
        const {todos} = this.props;
        const todoElements = todos.map(
            (todo) => <Todo key={todo.id} todo={todo}/>
        );
        return (<React.Fragment>
            <div>{todoElements}</div>
            <div>Email: {this.props.email}</div>
        </React.Fragment>);
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: false,
            editing: false,
            empty: false
        }
    }

    onDelete() {
        this.props.deleteTodo(this.props.todo);
    }

    onUpdate(event) {
        this.props.editTodo(this.props.todo, event.target.value);
    }

    // TODO: add new

    onToggleComplete() {
        this.setState({
            completed: !this.state.completed
        })
    }

    toggleEdit() {
        this.setState({
            editing: !this.state.editing
        });
    }

    render() {
        const {editing} = this.state;
        const {todo} = this.props;

        let completeOption = this.state.completed ? (
            <button className="ias-button ias-icon-button" onClick={this.onToggleComplete.bind(this)} type="button">
                <i className="ias-icon ias-icon-close_thin" />
            </button>
        ): (
            <button className="ias-button ias-icon-button" onClick={this.onToggleComplete.bind(this)} type="button">
                <i className="ias-icon ias-icon-check_thin" />
            </button>
        );

        let deleteOption = todo.empty ? null : (
            <button className="ias-button ias-icon-button" onClick={this.onDelete.bind(this)} type="button">
                <i className="ias-icon ias-icon-delete_thin" />
            </button>
        );

        let options = editing ? (
            <React.Fragment>
                <button className="ias-button ias-icon-button" onClick={this.toggleEdit.bind(this)} type="button">
                    <i className="ias-icon ias-icon-save_thick" />
                </button>
                {deleteOption}
            </React.Fragment>
        ) : (
            <React.Fragment>
                {deleteOption}
            </React.Fragment>

        );

        const placeholder = todo.empty ? 'Create New' : 'Edit Todo';
        const todoTag = editing ? (
            <div className='ias-input-container'>

                <input id={todo.id + '-input'} onChange={this.onUpdate.bind(this)} type='text' placeholder={placeholder} value={todo.name}/>
                {options}
            </div>
        ) : (
            <div>
                {completeOption}
                <span className = "todo-item" onClick={this.toggleEdit.bind(this)}>{todo.name}</span>
                {options}
            </div>
        );

        return todoTag;
    }
}

const mapDispatchToProps = (dispatch) => ({
    newTodo: (name) => {
        dispatch({ type: NEW_TODO, name });
    },
    editTodo: (todo, name) => {
        dispatch({ type: EDIT_TODO, todo, name });
    },
    deleteTodo: (todo) => {
        dispatch({ type: DELETE_TODO, todo });
    }
});

const mapStateToProps = ({ todos }) => ({ todos });

export const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
