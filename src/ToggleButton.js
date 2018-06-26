import React from 'react';
import {connect} from 'react-redux';

export class ToggleButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggled: false
        };
    }

    handleClick() {
        this.setState({
            toggled: !this.state.toggled
        });
    }

    render() {
        const buttonText = (this.state.toggled ? 'Emailed: ' : 'Email: ') + this.props.email;

        return (
            <button onClick={this.handleClick.bind(this)}>{buttonText}</button>
        )
    }
}

const mapStateToProps = ({email}) => {
    return { email };
};

export const ConnectedToggleButton =
    connect(mapStateToProps)(ToggleButton);