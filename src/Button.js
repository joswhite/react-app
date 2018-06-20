import React from 'react';

export default ({ handleClick, title} ) => (
    <button className='ias-button' onClick={handleClick}>
        {title}
    </button>
)

export class Button extends React.Component {
    render() {
        const {handleClick, title} = this.props;
        return (
            <button className='ias-button' onClick={handleClick}>
                {title}
            </button>
        );
    }
}