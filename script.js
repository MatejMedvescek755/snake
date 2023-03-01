var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

canvas.height = 500
canvas.width = 500

class Snake{
    headX = 0
    headY = 0
    constructor(headX, headY){
        this.headX = headX
        this.headY = headY
    }
    length = 0
    head = new Head(this.headX, this.headY)
    tail = Array()

    draw(){
        ctx.strokeRect(this.head.x, this.head.y, 10,10)
        this.tail.forEach((el)=>{
            ctx.strokeRect(el.x,el.y,10,10)
        })
    }    

    add(way){
        switch(way){
            case "right":
                if(this.tail.length > 0){
                    temp = this.tail[this.tail.length-1]
                    this.tail.push(new Tail(temp.x-15,temp.y))
                }else{
                    this.tail.push(new Tail(this.head.x-15, this.head.y))
                }
                break
            case "left":
                if(this.tail.length > 0){
                    temp = this.tail[this.tail.length-1]
                    this.tail.push(new Tail(temp.x-15,temp.y))
                }else{
                    this.tail.push(new Tail(this.head.x-15, this.head.y))
                }
                break
            case "up":
                break
            case "down":
                break
            default:

        }
        this.tail.push(new Tail())
    }

    move(way){
        switch(way){
            case "right":
                //x+=10
                if(this.tail.length > 0){
                    this.tail[0].setCord(this.head.x, this.head.y)
                    this.copyTail()
                }
                this.head.setCord(this.head.x+10,this.head.y)
                break
            case "left":
                //x-=10
                if(this.tail.length > 0){
                    this.tail[0].setCord(this.head.x, this.head.y)
                    this.copyTail()
                }
                this.head.setCord(this.head.x-10,this.head.y)
                break
            case "up":
                //y-=10
                if(this.tail.length > 0){
                    this.tail[0].setCord(this.head.x, this.head.y)
                    this.copyTail()
                }
                this.head.setCord(this.head.x,this.head.y-10)
                break
            case "down":
                //y+=10
                if(this.tail.length > 0){
                    this.tail[0].setCord(this.head.x, this.head.y)
                    this.copyTail()
                }
                this.head.setCord(this.head.x,this.head.y+10)
                break
            default:
            
        }
    }

    copyTail(){
        for(i = 1 ; i != this.tail.length; i++){
            this.tail[i].setCord(this.tail[i-1].x,this.tail[i-1].x)   
        }
    }
}

class Food{
    x = 10
    y = 10
    newCord(){
        x = Math.random()*490+10
        y =Math.random()*490+10
    }

    draw(){
        newCord()
        ctx.strokeRect(this.x, this.y, 10, 10)
    }
}

class Head{
    constructor(x,y,speedX, speedY){
        this.x = x
        this.y = y
        this.speedX = speedX
        this.speedY = speedY
    }
    
    setCord(x,y){
        this.x = x
        this.y = y
    }
}

class Tail{
    constructor(x,y){
        this.x = x
        this.y = y
    }

    setCord(x,y){
        this.x = x
        this.y = y
    }   

}

player = new Snake(50,50)
food = new Food()

var way = "right"
limiter = true;


function move(){
    clear()
    player.draw()
    if(limiter){
        player.move(way)
    }
    limiter = !limiter
    if(!border()){
        window.requestAnimationFrame(move)
    }
}

var border = () =>{
    if(player.head.x+10 > 500 || player.head.x < 0 || player.head.y+10 > 500 || player.head.y < 0){
        console.error("hit the wall");
        alert("game over")
        return true
    }
    return false
}

window.requestAnimationFrame(move)

function clear(){
    ctx.clearRect(0,0,500,500)
}

document.addEventListener("keydown", (e)=>{
    console.log(e.keyCode)
    switch(e.keyCode){
        case 40:
            way = "down"
            break;
        case 83:
            way = "down"
            break;
        case 39:
            way="right"
            break;
        case 68:
            way="right"
            break;
        case 37:
            way="left"
            break;
        case 65:
            way="left"
            break;
        case 38:
            way="up"
            break;
        case 87:
            way="left"
            break;
        default:
    }
    console.log(way)
})
