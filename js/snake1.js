let canvas = document.getElementById('snake');
let nanduxuanze = document.getElementById('nanduxuanze');
let gameOver = document.getElementById('gameOver');
let controlArea = document.getElementById('controlArea');
let control = document.getElementById('control');
let success = document.getElementById('success');
let ctx = canvas.getContext('2d');
let snakeLen = 6;
let nuit = 20;
let snakeBody = [];
let speed = 200;
let status = 'right';
let foodAxis = {
    x:'',
    y:''
}
// ctx.moveTo(0,0);
// ctx.lineTo(300,200);
function drawBox(){
    //画横线
for(let i = 0;i < 260; i++){
    if(i%20==0){
        ctx.moveTo(0,i);
        ctx.lineTo(360,i);
        ctx.stroke()
    }
}
for(let i = 0;i < 360; i++){
    if(i%20==0){
        ctx.moveTo(i,0);
        ctx.lineTo(i,260);
        ctx.stroke()
    }
}
}
//初始蛇坐标
for(let i = 0;i < snakeLen; i++){
    let obj = {
        x : i*20,
        y : 0,
    }
    snakeBody.push(obj)
}
snakeBody.reverse();
function drawSnake(){
    ctx.clearRect(0,0,360,260)
    drawBox()
    drawFood(foodAxis)
    snakeBody.forEach((item,index)=>{
        if(index==0){
            ctx.fillStyle = "red"
        }else{
            ctx.fillStyle = "black"
        }
        ctx.fillRect(item.x,item.y,20,20)
    })
}

function isRight(){
    let item = snakeBody[0];
    let mark = true
    if((item.x<0||item.x>360)||(item.y<0||item.y>260)){
        mark = false
    }else{
        mark = true
    }
    snakeBody.forEach((item,index)=>{
        snakeBody.forEach((item1,index1)=>{
            if(index!==index1){
                if(item.x==item1.x&&item.y==item1.y){
                    mark = false
                }
            }
        })
    })
    return mark
}
function isEatFood(){

}
drawSnake()
function moveLeft(){
    status=='right'?'':status = 'left'
}
function moveRight(){
    status=='left'?'':status = 'right'
}
function moveDown(){
    status=='up'?'':status = 'down'
}
function moveUp(){
    status=='down'?'':status = 'up'
}
function addFood(){
    let x = parseInt(Math.random()*17);
    let y = parseInt(Math.random()*12)
    foodAxis.x = x
    foodAxis.y = y
    let isFood = snakeBody.some(item=>{
        return item.x==foodAxis.x*20&&item.y==foodAxis.y*20
    })
    if(isFood){
        addFood()
    }else{
        drawFood(foodAxis)
    }
}
function drawFood(obj){
    ctx.fillStyle = '#blue'
    ctx.fillRect(obj.x*20,obj.y*20,20,20);
}
function moveFood(){
    foodAxis = {
        x:'',
        y:''
    }
    addFood()
}
addFood()
function gospeed(speed,num){
    showEle('snake');
    noneEle('nanduxuanze','gameOver')
    let timerMove = setInterval(()=>{
        if(snakeBody.length==num){
            showGameSuccess()
        }
        if(status == 'right'){
            snakeBody[0].x+20==foodAxis.x*20&&snakeBody[0].y==foodAxis.y*20?moveFood():snakeBody.pop()
            let ary = [];
            let obj = {
                x:snakeBody[0].x+20,
                y:snakeBody[0].y
            };
            ary.push(obj);
            snakeBody = ary.concat(snakeBody)
            isRight()?drawSnake():showGameOver()
        }else if(status == 'left'){
            snakeBody[0].x-20==foodAxis.x*20&&snakeBody[0].y==foodAxis.y*20?moveFood():snakeBody.pop()
            let ary = [];
            let obj = {
                x:snakeBody[0].x-20,
                y:snakeBody[0].y
            };
            ary.push(obj);
            snakeBody = ary.concat(snakeBody)
            isRight()?drawSnake():showGameOver()
        }else if(status == 'up'){
            snakeBody[0].x==foodAxis.x*20&&snakeBody[0].y-20==foodAxis.y*20?moveFood():snakeBody.pop()
            let ary = [];
            let obj = {
                x:snakeBody[0].x,
                y:snakeBody[0].y-20
            };
            ary.push(obj);
            snakeBody = ary.concat(snakeBody)
            isRight()?drawSnake():showGameOver()
        }else if(status == 'down'){
            snakeBody[0].x==foodAxis.x*20&&snakeBody[0].y+20==foodAxis.y*20?moveFood():snakeBody.pop()
            let ary = [];
            let obj = {
                x:snakeBody[0].x,
                y:snakeBody[0].y+20
            };
            ary.push(obj);
            snakeBody = ary.concat(snakeBody)
            isRight()?drawSnake():showGameOver()
        }
    },speed)
    function showGameOver(){
        clearInterval(timerMove)
        showEle('gameOver');
        noneEle('nanduxuanze','snake')
    }
    function showGameSuccess(){
        clearInterval(timerMove)
        showEle('success');
        noneEle('nanduxuanze','snake','gameOver')
    }
}
function resumeGame(){
    window.location.reload()
}
function showEle(...arg) {
    console.log(arg)
    arg.forEach((item) => {
        console.log(window[item]);
        window[item].style.display = 'block'
    })
}
function noneEle(...arg) {
    console.log(arg)
    arg.forEach((item) => {
        console.log(window[item]);
        window[item].style.display = 'none'
    })
}
function keyDown(e){
    if(e.keyCode==40 && status !='up'){
        status='down'
    }else if(e.keyCode==38 && status !='down'){
        status='up'
    }else if(e.keyCode==37 && status !='right'){
        status='left'
    }else if(e.keyCode==39 && status !='left'){
        status='right'
    }
}
let xxx = controlArea.offsetLeft;
let yyy = controlArea.offsetTop;
function touchSatrtFunc(e){
    e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = e.touches[0];   //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    startX = x;
    startY = y;
    oL = control.offsetLeft;                                 //可拖动元素距离页面左侧的距离
    oT = control.offsetTop;                                  //可拖动元素距离页面顶部的距离
    sL = x - oL;           //获取页面触点距离div左侧的距离
    sT = y - oT;           //获取页面触点距离div顶部的距离
    console.log(touch,x,y,oL,oT,sL,sT)
}
function touchMoveFunc(e){
    e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = e.touches[0];   //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    let top = y-yyy;
    let left = x-xxx;
    if(y-yyy<=15){
        top=15
    }else if(y-yyy>85){
        top=85
    }
    if(x-xxx<=15){
        left=15
    }else if(x-xxx>85){
        left=85
    }
    if(left<50){
        if(Math.abs(left-50)>Math.abs(top-50) && status!=='right'){
            status = 'left'
        }else if(top<=50 && status!=='down'){
            status = 'up'
        }else if(top>=50 && status!=='up'){
            status = 'down'
        }
    }
    if(left>50){
        if(Math.abs(left-50)>Math.abs(top-50) && status!=='left'){
            status = 'right'
        }else if(top<=50 && status!=='down'){
            status = 'up'
        }else if(top>=50 && status!=='up'){
            status = 'down'
        }
    }
    console.log(status)
    control.style.top = top + 'px';
    control.style.left = left + 'px';
}
function touchEndFunc(){
    control.style.top = 50 + 'px';
    control.style.left = 50 + 'px';
}
control.addEventListener("touchstart",touchSatrtFunc,false);
control.addEventListener("touchmove",touchMoveFunc,false);
control.addEventListener("touchend",touchEndFunc,false);
document.addEventListener('keydown',keyDown)