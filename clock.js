class Clock {
    constructor(canvasID, maxWidth, maxHeight) {
        this.properties = {
            maxWidth,
            maxHeight,
            id: canvasID,
        }
    }
    drawFrame () {
        const ctx = document.querySelector(`#${this.properties.id}`).getContext('2d');        
        const {maxHeight, maxWidth} = this.properties;
        const radius = maxHeight < maxWidth ? maxHeight/2 : maxWidth/2;
        const centerPoint = {x: radius, y: radius};        
        const points = [];

        //fill space with white 
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, maxWidth, maxHeight);
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
        const ctx = document.querySelector(`#${this.properties.id}`).getContext('2d');        
        const {maxHeight, maxWidth} = this.properties;
        const radius = maxHeight < maxWidth ? maxHeight/2 : maxWidth/2;
        const centerPoint = {x: radius, y: radius};     
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
        const ctx = document.querySelector(`#${this.properties.id}`).getContext('2d');        
        const {maxHeight, maxWidth} = this.properties;
        const radius = maxHeight < maxWidth ? maxHeight/2 : maxWidth/2;
        const centerPoint = {x: radius, y: radius};

        const date = new Date();
        const points = [];
        const times = [
            date.getHours()%12/12,
            date.getMinutes()/(60),
            date.getSeconds()/(60)
        ]
        console.log(times[0]);
        times.map( (time) => {
            points.push({
                x: Math.cos( 2*Math.PI * time - Math.PI/2) * radius + centerPoint.x,
                y: Math.sin( 2*Math.PI * time - Math.PI/2) * radius + centerPoint.y,
            })
        })

        //Small
        ctx.lineWidth = 2;
        ctx.beginPath();

        ctx.moveTo(centerPoint.x, centerPoint.y);
        ctx.lineTo(points[2].x - (points[2].x - centerPoint.x)*0.25, points[2].y - (points[2].y - centerPoint.x)*0.25);
        ctx.stroke();

        //Medium
        ctx.lineWidth = 3;
        ctx.beginPath();

        ctx.moveTo(centerPoint.x, centerPoint.y);
        ctx.lineTo(points[1].x - (points[1].x - centerPoint.x)*0.33, points[1].y - (points[1].y - centerPoint.x)*0.33);
        ctx.stroke();

        //Big
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.lineColor = 'blue';
        ctx.lineStyle = 'blue';

        ctx.moveTo(centerPoint.x, centerPoint.y);
        ctx.lineTo(points[0].x - (points[0].x - centerPoint.x)*0.40, points[0].y - (points[0].y - centerPoint.x)*0.40);
        ctx.stroke();
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