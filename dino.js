

//quadro
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//o bicho, dinossauro
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}


//cactu varios tamanhos
let cactusArray = [];
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d") ; //usado para desenhar no quadro
    
    //draw primeiro dinossauro
    // context.fillStyle= "green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);
    
    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }
    
    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";
    
    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";
    
    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";



    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); //1000 milisegundos = 1 segundo
}

//parei em 16:04 no video

function update() {
    requestAnimationFrame(update);

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

}

function placeCactus() {


}