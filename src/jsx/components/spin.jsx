import React, { Component } from 'react';
import NumberHole from './numberHole';

class Spin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            angle: 73,
            startRotate: 73,
        };
    }

    getAngle(x, y) {
        let center = 200;

        return 180 / Math.PI * Math.atan2(y - center, x - center)
    }

    start(e) {
        e.preventDefault();
        let startRotate = this.getAngle(e.clientX, e.clientY);
        if (!(startRotate > -this.state.angle && startRotate < -this.state.angle + 53)) {
            this.setState(() => ({
                active: true,
                startRotate: startRotate
            }))
        }
    }

    rotate(e) {
        if (this.state.active) {
            e.preventDefault();
            let rotation = this.getAngle(e.clientX, e.clientY) + this.state.angle - this.state.startRotate;
            if (rotation < 0) {
                rotation += 360;
            }

            return $(".phone__spin").css({"transform" : `rotate(${rotation}deg)`});
        }
    }

    stop(e) {
        e.preventDefault();

        function enter(number) {
            number = (number === 10) ? number - 10 : number;
            console.log(number);
        }

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
        
        function rotateToStart(spin, startRotate, angle) {
            if (startRotate > -20 && startRotate < 58) {
                spin.css({
                    "transform" : `rotate(${10 - angle}deg)`,
                    "transition-duration": "0.3s"
                });
                setTimeout(() => { spin.css({"transform" : `rotate(-${210 - angle}deg)`}) }, 300);
                setTimeout(() => { spin.css({"transform" : `rotate(-${360 - angle}deg)`}) }, 600);
            } else {
                spin.css({
                    "transform" : `rotate(${angle}deg)`,
                    "transition-duration": "0.8s"
                });
            }
            setTimeout(() => { spin.css({"transition-duration": "0s"}).css({"transform" : `rotate(${angle}deg)`}) }, 1000);
        }

        let spin = $(".phone__spin"),
            start = 353 - this.state.angle,
            startRotate = this.state.startRotate,
            endRotate = this.getAngle(e.clientX, e.clientY);
            
        if ((startRotate !== this.state.angle) && (startRotate !== endRotate)) {
            enterNumber(startRotate, endRotate, start);
            rotateToStart(spin, startRotate, this.state.angle)
        }
        this.setState(() => ({
            active: false,
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
                onMouseUp={ (e) => this.stop(e, this) }
            >
                {holes}
            </div>
        )
    }
}

export default Spin;
