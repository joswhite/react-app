import uuid from 'uuid/v1'
import React from 'react';

export default class SymptomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            symptoms: [
                new SymptomData('Cold hands'),
                new SymptomData('Itching nose'),
                new SymptomData('Stomach pain'),
                new SymptomData('', true)
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
            newSymptoms = newSymptoms.concat([ new SymptomData('', true) ]);
        }
        this.setState({ symptoms: newSymptoms });
    }

    render() {
        const {symptoms} = this.state;
        const symptomElements = symptoms.map(
            (symptom) =>
                <Symptom handleDelete={this.handleDelete.bind(this)}
                         handleUpdate={this.handleUpdate.bind(this)}
                         key={symptom.getId()}
                         symptom={symptom}/>
        );
        return <div>{symptomElements}</div>;
    }
}

class Symptom extends React.Component {
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

        const placeholder = symptom.empty ? 'Create New' : 'Edit Symptom';
        const symptomLabel = editing ? (
            <div className='ias-input-container'>
                <input id={symptom.id + '-input'} onChange={this.onUpdate.bind(this)} type='text' placeholder={placeholder} value={symptom.name}/>
            </div>
        ) : (
            <span>{symptom.name}</span>
        );

        let options = editing ? (
            <button className="ias-button ias-icon-button" onClick={this.toggleEdit.bind(this)} type="button">
                <i className="ias-icon ias-icon-check_thin" />
            </button>
        ) : (
            <button className="ias-button ias-icon-button" onClick={this.toggleEdit.bind(this)} type="button">
                <i className="ias-icon ias-icon-edit_thick" />
            </button>
        );

        let deleteOption = symptom.empty ? null : (
            <button className="ias-button ias-icon-button" onClick={this.onDelete.bind(this)} type="button">
                <i className="ias-icon ias-icon-delete_thin" />
            </button>
        );

        return (
            <div>
                {symptomLabel}
                {options}
                {deleteOption}
            </div>
        )
    }
}

class SymptomData {
    constructor(name, empty, id) {
        this._id = id || uuid();
        this.name = name || '';
        this.empty = empty || false;
    }

    changeName(name) {
        this.name = name;
        this.empty = false;
        return this;
        // return new SymptomData(name, false, this._id);
    }

    equals(symptomData) {
        return this._id === symptomData._id;
    }

    getId() {
        return this._id;
    }
}
