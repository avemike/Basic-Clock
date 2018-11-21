class Clock {
    constructor(canvasID, maxWidth, maxHeight) {
        const radius = maxHeight < maxWidth ? maxHeight/2 : maxWidth/2; 
        const centerPoint = {x: radius, y: radius};
        const id = canvasID;
        this.properties = {
            maxWidth,
            maxHeight,
            id,
            ctx: document.querySelector(`#${id}`).getContext('2d'),
            radius,
            centerPoint
        }
    }
    drawFrame () {
        const {ctx, maxHeight, maxWidth, centerPoint, radius} = this.properties;
        const points = [];

        ctx.clearRect(0, 0, maxWidth, maxHeight);
        for(let i = 0; i < 13; i++) {
            points[i] = {   
                x: centerPoint.x + Math.cos( ( 2*Math.PI / 12 * (i - 2)))  * radius,
                y: centerPoint.y + Math.sin( ( 2*Math.PI / 12 * (i - 2)))  * radius
            }
        }

        ctx.fillStyle = 'grey';
        
        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        points.map( (elem) => {
            ctx.lineTo(elem.x, elem.y);
        })
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'white';

        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        points.map( (elem) => {
            const shiftX = (elem.x - 200) * 0.03; //0.1 thickness of frame
            const shiftY = (elem.y - 200) * 0.03; 

            ctx.lineTo(elem.x - shiftX, elem.y - shiftY);
        })
        ctx.closePath();
        ctx.fill();
    }
    drawNumbers () {
        const {ctx, maxHeight, maxWidth, centerPoint, radius} = this.properties;
        const points = [];

        for(let i = 0; i < 12; i++) {
            points[i] = {   
                x: centerPoint.x + Math.cos( ( 2*Math.PI / 12 * (i - 2)))  * radius * 0.85 ,
                y: centerPoint.y + Math.sin( ( 2*Math.PI / 12 * (i - 2)))  * radius * 0.85,
                i: i+1
            }
        }

        ctx.fillStyle = "black"; 
        ctx.font="bold 20px Georgia";
        points.map( (point) => {
            if(point.i>=10) ctx.fillText(point.i, point.x -10, point.y +10); 
            else ctx.fillText(point.i, point.x, point.y + 10);
        });
    }
    drawArrows () {
        const {ctx, centerPoint, radius} = this.properties;
        const date = new Date();
        const points = [];

        const times = [
            date.getSeconds()/60,
            date.getMinutes()/60,
            date.getHours()/12
        ]

        times.map( (time) => {
            points.push({
                x: Math.cos( 2*Math.PI * time - Math.PI/2) * radius + centerPoint.x,
                y: Math.sin( 2*Math.PI * time - Math.PI/2) * radius + centerPoint.y,
            })
        })

        ctx.fillStyle = "black";
        //Drawing arrows
        for(let i=0; i<3; i++) {
            ctx.lineWidth= i+2;
            ctx.beginPath();
            ctx.moveTo(centerPoint.x, centerPoint.y);
            ctx.lineTo(points[i].x - (points[i].x - centerPoint.x)*(0.25+0.15*i), points[i].y - (points[i].y - centerPoint.x)*(0.25+0.15*i));
            ctx.stroke();        
        }
    }
    animate () {   
        const anim = () => {
            this.drawFrame();
            this.drawNumbers();
            this.drawArrows();
            window.requestAnimationFrame(anim);
        }     
        anim();
    }
} 

const clock01 = new Clock('clock', 400, 400);
clock01.animate(); 