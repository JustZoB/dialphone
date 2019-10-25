import React, { Component } from 'react';
import NumberHole from './numberHole';

class Spin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 73,
            startRotate: 73,
        };
    }

    start(e) {
        e.preventDefault();
        let center = 200,
            startRotate = 180 / Math.PI * Math.atan2(e.clientY - center, e.clientX - center);
        if (!(startRotate > -73 && startRotate < -73 + 53)) {
            this.setState(() => ({
                startRotate: startRotate
            }))
            $(".phone__spin").addClass("active");
        }
    }

    rotate(e) {
        if ($(".phone__spin").hasClass("active")) {
            e.preventDefault();
            let center = 200,
                rotation = 180 / Math.PI * Math.atan2(e.clientY - center, e.clientX - center) + this.state.angle - this.state.startRotate;
            if (rotation < 0) {
                rotation += 360;
            }
            return $(".phone__spin").css({"transform" : `rotate(${rotation}deg)`});
        }
    }

    stop(e) {
        e.preventDefault();
        function enterNumber(startRotate, endRotate, start) {
            if (endRotate > -40 && endRotate < -10) {
                startRotate = (startRotate < 0) ? startRotate + 360 : startRotate;
                for (let i = 1; i < 11; i++) {
                    let min = start - i * 30 < 0 ? start - i * 30 + 360 : start - i * 30,
                        max = start - i * 30 + 30 < 0 ? start - i * 30 + 390 : start - i * 30 + 30;
                    if (min > max) {
                        if ((startRotate > min && startRotate < 360) || (startRotate > 0 && startRotate < max)) {
                            enter(i);
                        }
                    } else if (startRotate > min && startRotate < max) {
                        enter(i);
                    }
                }
            }
        }
        function enter(number) {
            number = (number === 10) ? number - 10 : number;
            console.log(number);
        }
        let center = 200,
            start = 353 - 73,
            startRotate = this.state.startRotate,
            endRotate = 180 / Math.PI * Math.atan2(e.clientY - center, e.clientX - center);
        if ((startRotate !== 73) && (startRotate !== endRotate)) {
            enterNumber(startRotate, endRotate, start);
            if (startRotate > -20 && startRotate < 58) {
                $(".phone__spin").css({
                    "transform" : `rotate(${10 - 73}deg)`,
                    "transition-duration": "0.3s"
                });
                setTimeout(() => { $(".phone__spin").css({"transform" : `rotate(-${210 - 73}deg)`}) }, 300);
                setTimeout(() => { $(".phone__spin").css({"transform" : `rotate(-${360 - 73}deg)`}) }, 600);
            } else {
                $(".phone__spin").css({
                    "transform" : `rotate(${73}deg)`,
                    "transition-duration": "0.8s"
                });
            }
            setTimeout(() => { $(".phone__spin").css({"transition-duration": "0s"}).css({"transform" : `rotate(${73}deg)`}) }, 1000);
        }
        $(".phone__spin").removeClass("active");
        this.setState(() => ({
            startRotate: this.state.angle
        }))
        
    }
    
    render() {
        let holes = [];
        for (let i = 0; i < 10; i++) {
            holes.push(<NumberHole key={i} />);
        }
        return (
            <div className="phone__spin" 
                onMouseDown={ (e) => this.start(e, this) } 
                onMouseMove={ (e) => this.rotate(e, this) } 
                onMouseUp={ (e) => this.stop(e, this) }>
                {holes}
            </div>
        )
    }
}

export default Spin;
