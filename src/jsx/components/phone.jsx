import React from 'react';
import Stop from './stop';
import Spin from './spin';
import Numbers from './numbers';

const Phone = () => {
    return (
        <div className="phone">
            <Stop />
            <Numbers />
            <Spin />
        </div>
    )
}

export default Phone;
