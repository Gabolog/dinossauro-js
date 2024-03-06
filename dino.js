

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

// fisica
let velocityX = -8; // velocidade do cactus movendo para esquerda
let velocityY = 0; 
let gravity = .4;

let gamerOver = false;
let score = 0;



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
    document.addEventListener("keydown", moveDino);
}


function update() {
    requestAnimationFrame(update);
    if (gamerOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); // aplica gravidade pro dino.y pra que ele n exceda pro chão
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);


    //cactu
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height  );

        if(detectCollision(dino, cactus)) {
            gamerOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    //pontos
    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score,5 ,20);
}

function moveDino(e){
    if (gamerOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        // pulo
        velocityY = -10;
    }
    else if(e.code == "ArrowDown" && dino.y == dinoY ) {
        //abaixar
    }

}

function placeCactus() {

    //colocar Cactus
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    let placeCactusChance = Math.random(); //0 - 0.9999...

    if(placeCactusChance > .90) { //10% cac3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    
    else if  (placeCactusChance >.70) { //30 % cac2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);

    }
    else if  (placeCactusChance >.50) { //50 % cac1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);

    }

    if (cactusArray.length > 5) {
        cactusArray.shift(); //remover primeiro objeto da array pra que não cresça constantemente e sobrecarregar


    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && //canto do topo da esquerda do a nao alcança o topo do canto direito do b
           a.x + a.width > b.x && // o topo direito do a passa pelo canto topo esquerdo do b
           a.y < b.y + b.height && //o topo esquerdo do a nao alcança o canto inferior esquerdo do b
           a.y +a.height > b.y; // o canto esquerdo inferior do a nao alcança o superior do canto esquerdo do b
}