import React from 'react';

export default ({ handleClick, title }) => (
    <button className='ias-button' onClick={handleClick}>
        {title}
    </button>
)
