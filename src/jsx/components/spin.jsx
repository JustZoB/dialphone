import React, { Component } from 'react';
import NumberHole from './numberHole';

class Spin extends Component {
    render() {
        return (
            <div className="phone__spin">
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
                <NumberHole />
            </div>
        )
    }
}

export default Spin;
