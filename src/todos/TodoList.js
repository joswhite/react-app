import uuid from 'uuid/v1'
import React from 'react';
import {connect} from 'react-redux';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            symptoms: [
                new TodoData('Cold hands'),
                new TodoData('Itching nose'),
                new TodoData('Stomach pain'),
                new TodoData('', true)
            ]
        };
    }

    handleDelete(symptomData) {
        const newSymptoms = [ ...this.state.symptoms ];
        const index = newSymptoms.findIndex((item) => symptomData.equals(item));
        newSymptoms.splice(index, 1);
        this.setState({ symptoms: newSymptoms });
    }

    handleUpdate(symptomData, name) {
        let newSymptoms = [ ...this.state.symptoms ];
        const index = newSymptoms.findIndex((item) => symptomData.equals(item));
        newSymptoms.splice(index, 1, symptomData.changeName(name));
        if (index === newSymptoms.length - 1) {
            newSymptoms = newSymptoms.concat([ new TodoData('', true) ]);
        }
        this.setState({ symptoms: newSymptoms });
    }

    render() {
        const {symptoms} = this.state;
        const symptomElements = symptoms.map(
            (symptom) =>
                <Todo handleDelete={this.handleDelete.bind(this)}
                         handleUpdate={this.handleUpdate.bind(this)}
                         key={symptom.getId()}
                         symptom={symptom}/>
        );
        return (<React.Fragment>
            <div>{symptomElements}</div>
            <div>Email: {this.props.email}</div>
        </React.Fragment>);
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: props.symptom.empty || false,
            empty: props.symptom.empty || false
        }
    }

    onDelete() {
        this.props.handleDelete(this.props.symptom);
    }

    onUpdate(event) {
        this.props.handleUpdate(this.props.symptom, event.target.value);
    }

    toggleEdit() {
        this.setState({
            editing: !this.state.editing
        });
    }

    render() {
        const {editing} = this.state;
        const {symptom} = this.props;

        let deleteOption = symptom.empty ? null : (
            <button className="ias-button ias-icon-button" onClick={this.onDelete.bind(this)} type="button">
                <i className="ias-icon ias-icon-delete_thin" />
            </button>
        );

        let options = editing ? (
            <React.Fragment>
                <button className="ias-button ias-icon-button" onClick={this.toggleEdit.bind(this)} type="button">
                    <i className="ias-icon ias-icon-check_thin" />
                </button>
                {deleteOption}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <button className="ias-button ias-icon-button" onClick={this.toggleEdit.bind(this)} type="button">
                    <i className="ias-icon ias-icon-edit_thick" />
                </button>
                {deleteOption}
            </React.Fragment>

        );

        const placeholder = symptom.empty ? 'Create New' : 'Edit Todo';
        const symptomTag = editing ? (
            <div className='ias-input-container'>
                <input id={symptom.id + '-input'} onChange={this.onUpdate.bind(this)} type='text' placeholder={placeholder} value={symptom.name}/>
                {options}
            </div>
        ) : (
            <div>
                <span>{symptom.name}</span>
                {options}
            </div>
        );

        return symptomTag;
    }
}

class TodoData {
    constructor(name, empty, id) {
        this._id = id || uuid();
        this.name = name || '';
        this.empty = empty || false;
    }

    changeName(name) {
        this.name = name;
        this.empty = false;
        return this;
        // return new TodoData(name, false, this._id);
    }

    equals(symptomData) {
        return this._id === symptomData._id;
    }

    getId() {
        return this._id;
    }
}

const mapStateToProps = ({ email }) => ({ email });

export const ConnectedTodoList = connect(mapStateToProps)(TodoList);
