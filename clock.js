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
                x: centerPoint.x + Math.cos( ( 2*Math.PI / 12 * (i - 2)))  * radius,
                y: centerPoint.y + Math.sin( ( 2*Math.PI / 12 * (i - 2)))  * radius
            }
        }

        ctx.fillStyle = "grey";
        
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
    animate () {        
        // Obramowanie
        this.drawFrame();
        this.drawNumbers();
    }
} 

const clock01 = new Clock('clock', 400, 400);
clock01.animate(); 