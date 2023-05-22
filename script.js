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
                    this.tail.push(new Tail(temp.x+15,temp.y))
                }else{
                    this.tail.push(new Tail(this.head.x+15, this.head.y))
                }
                break
            case "up":
                if(this.tail.length > 0){
                    temp = this.tail[this.tail.length-1]
                    this.tail.push(new Tail(temp.x,temp.y+15))
                }else{
                    this.tail.push(new Tail(this.head.x, this.head.y+15))
                }
                break
            case "down":
                if(this.tail.length > 0){
                    temp = this.tail[this.tail.length-1]
                    this.tail.push(new Tail(temp.x,temp.y-15))
                }else{
                    this.tail.push(new Tail(this.head.x, this.head.y-15))
                }
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
                    this.copyTail()
                    this.tail[0].setCord(this.head.x-15, this.head.y)
                }
                this.head.setCord(this.head.x+2,this.head.y)
                break
            case "left":
                //x-=10
                if(this.tail.length > 0){
                    this.copyTail()
                    this.tail[0].setCord(this.head.x+15, this.head.y)
                }
                this.head.setCord(this.head.x-2,this.head.y)
                break
            case "up":
                //y-=10
                if(this.tail.length > 0){
                    this.copyTail()
                    this.tail[0].setCord(this.head.x, this.head.y-15)
                }
                this.head.setCord(this.head.x,this.head.y-2)
                break
            case "down":
                //y+=10
                if(this.tail.length > 0){
                    this.copyTail()
                    this.tail[0].setCord(this.head.x, this.head.y+15)
                }
                this.head.setCord(this.head.x,this.head.y+2)
                break
            default:
            
        }
    }

    copyTail(){
        for(var i = this.tail.length-1 ; i >= 0; i--){
                if(i == 0){
                    this.tail[0].setCord(this.head.x,this.head.y)
                }else{
                    this.tail[i].setCord(this.tail[i-1].x,this.tail[i-1].y)
                }
            }
        // switch(way){
        //     case "right":
        //         for(var i = this.tail.length-1 ; i >= 0; i--){
        //             if(i == 0){
        //                 this.tail[0].setCord(this.head.x-15,this.head.y)
        //             }else{
        //                 this.tail[i].setCord(this.tail[i-1].x-15,this.tail[i-1].y)
        //             }
        //         }
        //         break;
        //     case "left":
        //         for(var i = this.tail.length-1 ; i >= 0; i--){
        //             if(i == 0){
        //                 this.tail[0].setCord(this.head.x+15,this.head.y)
        //             }else{
        //                 this.tail[i].setCord(this.tail[i-1].x+15,this.tail[i-1].y)
        //             }
        //         }
        //         break;
        //     case "up":
        //         for(var i = this.tail.length-1 ; i >= 0; i--){
        //             if(i == 0){
        //                 this.tail[0].setCord(this.head.x,this.head.y+15)
        //             }else{
        //                 this.tail[i].setCord(this.tail[i-1].x,this.tail[i-1].y+15)
        //             }
        //         }
        //         break;
        //     case "down":
        //         for(var i = this.tail.length-1 ; i >= 0; i--){
        //             if(i == 0){
        //                 this.tail[0].setCord(this.head.x,this.head.y-15)
        //             }else{
        //                 this.tail[i].setCord(this.tail[i-1].x,this.tail[i-1].y-15)
        //             }
        //         }
        //         break;
        //     default:
        //         console.error("way undefined")
        // }
    }

    
}

class Food{
    x = 250
    y = 250
    checker = true
    newCord(){
        this.x = Math.floor(Math.random()*10)*50
        this.y =Math.floor(Math.random()*10)*50
    }
    draw(){
        ctx.strokeRect(this.x, this.y, 10, 10)
        this.checker = true
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

var player = new Snake(50,50)
var food = new Food()
console.log(food)
var way = "right"
limiter = true;
console.log(player.tail)

function move(){
    clear()
    
    player.draw()
    player.move(way)
    food.draw()
    if(Math.abs(player.head.x-food.x) < 10 && Math.abs(player.head.y-food.y) < 10){
        console.log("hit")
        food.newCord()
        player.add()
    }
    if(!border()){
        window.requestAnimationFrame(move)
    }
}

var border = () =>{
    if(player.head.x+10-2 > 500 || player.head.x < 0 || player.head.y+10-2 > 500 || player.head.y < 0){
        console.error("hit the wall");
        //alert("game over")
        return true
    }
    return false
}
window.requestAnimationFrame(move)

function clear(){
    ctx.clearRect(0,0,500,500)
}

document.addEventListener("keydown", (e)=>{
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
            way="up"
            break;
        default:
    }
})

/*
add so you cant turn 180 degs 

*/