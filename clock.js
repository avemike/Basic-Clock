class Clock {
    constructor(canvasID, maxWidth, maxHeight) {
        this.properties = {
            maxWidth,
            maxHeight,
            id: canvasID,
            date: new Date()
        }
    }
    getSeconds () {
        return this.properties.date.getHours()*3600 + this.properties.date.getMinutes()*60 + this.properties.date.getSeconds();
    }
    drawFrame () {
        const ctx = document.querySelector(`#${this.properties.id}`).getContext('2d');        
        const {maxHeight, maxWidth} = this.properties;
        const radius = maxHeight < maxWidth ? maxHeight/2 : maxWidth/2;
        const centerPoint = {x: radius, y: radius};        
        const points = [];

        for(let i = 0; i < 13; i++) {
            points[i] = {   
                x: centerPoint.x - Math.cos( ( 2*Math.PI / 12 * i))  * radius ,
                y: centerPoint.y + Math.sin( ( 2*Math.PI / 12 * i))  * radius
            }
        }

        ctx.fillStyle = "black";
        
        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        points.map( (elem) => {
            ctx.lineTo(elem.x, elem.y);
        })
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        points.map( (elem) => {
            const shiftX = elem.x - 200;
            const shiftY = elem.y - 200; 

            ctx.lineTo(elem.x - shiftX*0.1, elem.y - shiftY*0.1);
        })
        ctx.closePath();
        ctx.fill();

    }
    animate () {        
        // Obramowanie
        this.drawFrame();
    }
} 

const clock01 = new Clock('clock', 400, 400);
clock01.animate(); 