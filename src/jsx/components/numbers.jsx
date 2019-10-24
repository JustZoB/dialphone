import React, { Component } from 'react';
import Number from './number';

class Numbers extends Component {
    render() {
        let nums = [];
        for (let i = 1; i < 11; i++) {
            let num = (i === 10) ? 0 : i;
            nums.push(<Number key={num} number={num} />);
        }
        return (
            <div className="phone__numbers">{nums}</div>
        )
    }
}

export default Numbers;
