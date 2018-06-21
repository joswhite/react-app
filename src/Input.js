import React from 'react';

export default ({ id, handleChange, label, value }) => {
    const labelElement = label ? <label htmlFor={id}>{label}</label> : null;
    return (
        <div className='ias-input-container'>
            {labelElement}
            <input id={id} onChange={handleChange} type='text' value={value}/>
        </div>
    )
}
