import React from 'react';
import './App.css';
import '@microfocus/ux-ias/dist/ux-ias.css'
import Button from './Button';
import {Input} from './Input';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Joseph White'
        };
    }

    setName(e) {
        this.setState({
            username: e.target.value
        });
    }

    resetName() {
        this.setState({
            username: 'Default User'
        });
    }

    render() {
        const {username} = this.state;
        return (
            <div>
                <h2>Hello {username}!</h2>
                <Button handleClick={this.resetName.bind(this)} title='Reset Name'></Button>
                <Input id='name' handleChange={this.setName.bind(this)} label='Name' value={username}/>
            </div>
        )
    }
}
