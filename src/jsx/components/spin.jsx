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
        if (!(startRotate > -73 && startRotate < -20)) {
            this.setState(() => ({
                startRotate: startRotate
            }))
            console.log(startRotate)
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

    stop() {
        if (this.state.startRotate > -20 && this.state.startRotate < 58) {
            $(".phone__spin").removeClass("active").css({
                "transform" : `rotate(-60deg)`,
                "transition-duration": "0.3s"
            });
            setTimeout(() => {
                $(".phone__spin").removeClass("active").css({
                    "transform" : `rotate(-140deg)`,
                    "transition-duration": "0.3s"
                });
            }, 300);
            setTimeout(() => {
                $(".phone__spin").removeClass("active").css({
                    "transform" : `rotate(-287deg)`,
                    "transition-duration": "0.3s"
                });
            }, 600);
        } else {
            $(".phone__spin").removeClass("active").css({
                "transform" : `rotate(73deg)`,
                "transition-duration": "0.8s"
            });
        }
        setTimeout(() => {
            $(".phone__spin").css({"transition-duration": "0s"})
        }, 700);

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
                onMouseDown={(e) => this.start(e, this)} 
                onMouseMove={(e) => this.rotate(e, this)} 
                onMouseUp={(e) => this.stop(e, this)}>
                {holes}
            </div>
        )
    }
}

export default Spin;
