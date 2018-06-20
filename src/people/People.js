import React from 'react';

export class PeopleList extends React.Component {
    /*constructor(props) {
        super(props);   // The way you set the initial state of a componenyt
    }*/

    render() {
        const list = this.props.people.map((person) => {
            return (
                <tr key={person.id}>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.email}</td>
                    <td>{person.ipAddress}</td>
                </tr>
            )
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        )
    }
}