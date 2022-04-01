const canvas=document.getElementById('canva');
const ctx=canvas.getContext('2d');
canvas.width= window.innerWidth
canvas.height=window.innerHeight
const image= new Image()
image.src='cvara.png'
let particles=[];
const mouse={
    x:null,
    y:null,
    radius:150


}
let cords= null;

function imaga(){
    
    
    ctx.drawImage(image, 0,0)
    cords=ctx.getImageData(0,0, canvas.width, canvas.height)
        
    
    
    
}

window.addEventListener('load',function(){
    imaga();
})



 window.addEventListener('resize',function(){
    canvas.width= window.innerWidth
    canvas.height=window.innerHeight
    // ctx.drawImage(image, 0,0)
    imaga();
    init();
     
    
 })
 imaga()

     
     console.log(cords)



window.addEventListener('mousemove',function(e){
    mouse.x=e.x;
    mouse.y=e.y;
    

})

class Particle{
    constructor (x,y){
        this.x=x;
        this.y=y;
        this.size=3
        this.basex=this.x;
        this.basey= this.y
        this.density=Math.random()*32+1

    }
    draw(){
        ctx.fillStyle='white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size,0, Math.PI*2)
        ctx.closePath()
        ctx.fill()


    }
    update(){
        let dx= mouse.x-this.x
        let dy= mouse.y-this.y
        let dist= Math.sqrt(dx*dx + dy*dy)
        let forceDrctX = dx/dist
        let forceDrctnY = dy/dist
        let maxDist=mouse.radius
        let force=(maxDist-dist)/maxDist
        let directionX=force* forceDrctX*this.density
        let directiony=force* forceDrctnY*this.density
        if(dist < maxDist){
            this.x -= directionX;
            this.y -= directiony
        }
        else{
            if(this.x !== this.basex){
                let dx= this.x-this.basex
                this.x -=dx/10
            }

            if(this.y !== this.basey){
                let dy = this.y-this.basey
                this.y -=dy/10
            }
            
        }
    }
}

function init(){
    particles=[]
    
    for( let i=0; i<1000; i++){

    let x= Math.random()*canvas.width
    let y= Math.random()* canvas.height
        
        particles.push(new Particle(x,y))
    
}
// for( let y=0, y2=cords.height;y<y2;y++){
//     for(let x=0, x2=cords.width; x<x2;x++){
//         if(cords.data[(y*4*cords.width)+(x+4)+3]>128){
//             let positionX=x;
//             let possitionY=y;
//             particles.push(new Particle(positionX, possitionY))
//         }
//     }
// }




    }
    init()

    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(image, 0,0)

        for (i =0; i<particles.length; i++){
            particles[i].draw()
            particles[i].update()

        }
        requestAnimationFrame(animate)
    }
    animate()
    