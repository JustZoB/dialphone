import React, { Component } from 'react';

class Spin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            angle: 0,
            startRotate: 0,
        };
    }

    getAngle(x, y) {
        let center = 200;

        return 180 / Math.PI * Math.atan2(y - center, x - center)
    }

    start(e) {
        e.preventDefault();
        let startRotate = this.getAngle(e.clientX, e.clientY);
        if (!((startRotate > -77  && startRotate < 0) || (startRotate > 0  && startRotate < 17))) {
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

            return $(".spin").css({"transform" : `rotate(${rotation}deg)`});
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
                    let step = 25,
                        coordinates = start - i * step,
                        min = coordinates < 0 ? coordinates + 360 : coordinates,
                        max = coordinates + step < 0 ? coordinates + step + 360 : coordinates + step;
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
        
        function rotateToStart(spin, angle) {
            spin.css({
                "transform" : `rotate(${angle}deg)`,
                "transition-duration": "0.8s"
            });
            setTimeout(() => { spin.css({"transition-duration": "0s"}) }, 1000);
        }

        let spin = $(".spin"),
            start = 360 - 83,
            startRotate = this.state.startRotate,
            endRotate = this.getAngle(e.clientX, e.clientY);
        
        if ((startRotate !== this.state.angle) && (startRotate !== endRotate)) {
            enterNumber(startRotate, endRotate, start);
            rotateToStart(spin, this.state.angle)
        }
        this.setState(() => ({
            active: false,
            startRotate: this.state.angle
        }))
    }
    
    render() {
        return (
            <img className="spin"
                src="./img/spin.png"
                onMouseDown={ (e) => this.start(e, this) } 
                onMouseMove={ (e) => this.rotate(e, this) } 
                onMouseUp={ (e) => this.stop(e, this) }
            />
        )
    }
}

export default Spin;
