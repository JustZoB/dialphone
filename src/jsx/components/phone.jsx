import React, { Component } from 'react';
import BackCircle from './backCircle';
import CentralCircle from './centralCircle';
import Spin from './spin';

class Phone extends Component {
    render() {
        return (
            <div className="phone"><BackCircle /><Spin /><CentralCircle /> </div>
        )
    }
}

export default Phone;
