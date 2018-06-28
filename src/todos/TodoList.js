import PropTypes from 'prop-types';
import { NEW_TODO, EDIT_TODO, DELETE_TODO } from '../action-types';
import React from 'react';
import {connect} from 'react-redux';

export class TodoList extends React.Component {
    onAdd() {
        this.props.newTodo();
    }

    // onAdd2 = () => {
    //     return true;
    // };

    render() {
        const {todos} = this.props;
        const todoElements = todos.map(
            (todo) => <ConnectedTodo key={todo.id} todo={todo}/>
        );
        return (
            <React.Fragment>
                <div>{todoElements}</div>
                <button className="ias-button ias-icon-button" onClick={this.props.newTodo} type="button">
                    <i className="ias-icon ias-icon-new_thin" />
                </button>
            </React.Fragment>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.array,
    newTodo: PropTypes.func.isRequired,
};

class Todo extends React.Component {
    constructor(props) {
        super(props);

        const isNew = this.props.todo.new || false;
        this.state = {
            completed: false,
            editing: isNew,
            new: isNew
        }
    }

    onDelete() {
        this.props.deleteTodo(this.props.todo);
    }

    onUpdate(event) {
        this.props.editTodo(this.props.todo, event.target.value);
    }

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
        const {editing, completed} = this.state;
        const {todo} = this.props;

        // let icon = completed ? 'close' : 'check';

        let completeOption = completed ? (
            <button className="ias-button ias-icon-button" onClick={this.onToggleComplete.bind(this)} type="button">
                <i className="ias-icon ias-icon-close_thin" />
            </button>
        ): (
            <button className="ias-button ias-icon-button" onClick={this.onToggleComplete.bind(this)} type="button">
                <i className="ias-icon ias-icon-check_thin" />
            </button>
        );

        let deleteOption = todo.new ? null : (
            <button className="ias-button ias-icon-button" onClick={this.onDelete.bind(this)} type="button">
                <i className="ias-icon ias-icon-delete_thin" />
            </button>
        );

        let options = editing && (todo.name !== '') ? (
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

        const placeholder = todo.new ? 'Create New' : 'Edit Todo';
        const textStyle = completed ? { textDecoration: 'line-through' } : {};
        const todoTag = editing ? (
            <div className="ias-input-container">
                <input id={todo.id + '-input'} onChange={this.onUpdate.bind(this)} type='text' placeholder={placeholder} value={todo.name}/>
                {options}
            </div>
        ) : (
            <div>
                {completeOption}
                <span className="todo-item" style={textStyle} onClick={this.toggleEdit.bind(this)}>{todo.name}</span>
                {options}
            </div>
        );

        return todoTag;
    }
}

const mapDispatchToProps = (dispatch) => ({
    newTodo: () => dispatch({ type: NEW_TODO }),
    editTodo: (todo, name) => dispatch({ type: EDIT_TODO, todo, name }),
    deleteTodo: (todo) => dispatch({ type: DELETE_TODO, todo }) // access to dispatch promise w/ redux thunk
});

const ConnectedTodo = connect(null, mapDispatchToProps)(Todo);

const mapStateToProps = function({ todos }) {
    return {todos};
};

export const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
