import React, { Component } from 'react';
class Number extends Component {
    render() {
        return (
            <span className="phone__number">{this.props.number}</span>
        )
    }
}

export default Number;
