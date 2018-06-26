import React from 'react';
import './App.css';
import '@microfocus/ux-ias/dist/ux-ias.css'
import '@microfocus/ias-icons/dist/ias-icons.css'
import {ConnectedForm} from './Form';
import {ConnectedToggleButton} from './ToggleButton';

export class App extends React.Component {
    render() {

        return (
            <React.Fragment>
                <ConnectedToggleButton />
                <ConnectedForm />
            </React.Fragment>
        );
    }
}
