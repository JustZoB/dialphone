import React from 'react';
import Stop from './stop';
import Spin from './spin';
import CentralCircle from './centralCircle';
import Numbers from './numbers';

const Phone = () => {
    return (
        <div className="phone">
            <Stop />
            <Spin />
            <CentralCircle />
            <Numbers />
        </div>
    )
}

export default Phone;
