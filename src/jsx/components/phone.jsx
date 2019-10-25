import React, { Component } from 'react';
import CentralCircle from './centralCircle';
import Numbers from './numbers';
import Spin from './spin';
import Stop from './stop';

class Phone extends Component {
    render() {
        return (
            <div className="phone">
                <Stop />
                <Spin />
                <CentralCircle />
                <Numbers />
            </div>
        )
    }
}

export default Phone;
