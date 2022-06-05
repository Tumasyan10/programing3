class kerparner {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }

}

class Grass extends kerparner {

    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        }
    }
}


class GrassEater extends kerparner {
    constructor(x, y) {
        super(x, y)
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCordinates();
        return super.chooseCell(char);
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);

            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(1);
        let exact = random(found)

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class kerparnerErkrord extends kerparner {

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCordinates();
        return super.chooseCell(char);
    }


}
class Fire extends kerparnerErkrord {//xotn e utum

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater1 = new Fire(x, y);
            matrix[y][x] = 3;
            fireArr.push(eater1);

            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(1);
        let exact = random(found)

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < fireArr.length; i++) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }

}

class Water extends kerparnerErkrord {//utum e Fire-in

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater2 = new Water(x, y);
            matrix[y][x] = 4;
            waterArr.push(eater2);

            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(3);
        let exact = random(found)

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < fireArr.length; i++) {
                if (fireArr[i].x == x && fireArr[i].y == y) {
                    fireArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < waterArr.length; i++) {
            if (waterArr[i].x == this.x && waterArr[i].y == this.y) {
                waterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }

}


class Saruyc extends kerparnerErkrord {// Water-in sarqum e saruyc 

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater3 = new Saruyc(x, y);
            matrix[y][x] = 5;
            ujexArr.push(eater3);

            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(4);
        let exact = random(found)

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < waterArr.length; i++) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < saruycArr.length; i++) {
            if (saruycArr[i].x == this.x && saruycArr[i].y == this.y) {
                saruycArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class Lava extends kerparnerErkrord {//Fire-y sarqum e lava

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater4 = new Lava(x, y);
            matrix[y][x] = 5;
            saruycArr.push(eater4);

            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(3);
        let exact = random(found)

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < fireArr.length; i++) {
                if (fireArr[i].x == x && fireArr[i].y == y) {
                    fireArr.splice(i, 1)
                }
            }

            matrix[y][x] = 6
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 6
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < lavaArr.length; i++) {
            if (lavaArr[i].x == this.x && lavaArr[i].y == this.y) {
                lavaArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}


