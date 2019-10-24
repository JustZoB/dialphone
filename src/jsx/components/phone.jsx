import React, { Component } from 'react';
import CentralCircle from './centralCircle';
import Numbers from './numbers';
import Spin from './spin';

class Phone extends Component {
    render() {
        return (
            <div className="phone">
                <Spin />
                <CentralCircle />
                <Numbers />
            </div>
        )
    }
}

export default Phone;
