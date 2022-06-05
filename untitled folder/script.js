var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var fireArr = []
var waterArr = []
var saruycArr = []
var lavaArr = []
var side = 20;

function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount, fireCount, waterCount, saruycCount, lavaCount) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grassCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let i = 0; i < grassEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let i = 0; i < fireCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let i = 0; i < waterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 4;
        }
        for (let i = 0; i < saruycCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 5;
        }
        for (let i = 0; i < lavaCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 6;
        }
    }
    matrixGenerator(20, 25, 10, 9, 7, 5, 6)

    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                let eater1 = new Fire(x, y);
                fireArr.push(eater1);
            }
            else if (matrix[y][x] == 4) {
                let eater2 = new Water(x, y);
                waterArr.push(eater2);
            }
            else if (matrix[y][x] == 5) {
                let eater3 = new Saruyc(x, y);
                saruycArr.push(eater3);
            }
            else if (matrix[y][x] == 6) {
                let eater4 = new Lava(x, y);
                lavaArr.push(eater4);
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill(255, 0, 0);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("cyan");
            }
            else if (matrix[y][x] == 6) {
                fill(150, 0, 0);
            }
            rect(x * side, y * side, side, side);

        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const eater = grassEaterArr[i];
        eater.eat();
    }
    for (let i = 0; i < fireArr.length; i++) {
        fireArr[i].eat();
    }
    for (let i = 0; i < waterArr.length; i++) {
        waterArr[i].eat();
    }
    for (let i = 0; i < saruycArr.length; i++) {
        saruycArr[i].eat();
    }
    for (let i = 0; i < lavaArr.length; i++) {
        lavaArr[i].eat();
    }
}