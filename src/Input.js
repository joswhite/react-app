import React from 'react';

export class Input extends React.Component {

    render() {
        const {id, label, handleChange, value} = this.props;
        return (
            <div className='ias-input-container'>
                <label htmlFor={id}>{label}</label>
                <input id={id} onChange={handleChange} type='text' value={value}/>
            </div>
        );
    }
}