import React from 'react';
import {connect} from 'react-redux';

export class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.email
        };
    }

    onChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.saveEmail(this.state.email);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={this.state.email} onChange={this.onChange.bind(this)} />
                <button>Update Email</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEmail: (email) => {
            dispatch({
                type: 'SAVE_EMAIL',
                email
            })
        }
    }
};

const mapStateToProps = (state) => {
    return {email: state.email};
};

export const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);