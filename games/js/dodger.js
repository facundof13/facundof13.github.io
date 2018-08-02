var player;
var enemyArr = [];
var started;
var score;
var minusValue = 0;
var stop = false;

function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch');
    canvas.class('dodger');
    player = new Player();
    started = false;
}

function draw() {
    background(200, 0, 0);
    if (!started) {
        minusValue++;
    }

    if (keyCode == ENTER) {
        started = true;
        player.updateSides();
    }

    if (started) {


        background(80);
        var i = 0;
        player.show();
        if (frameCount % 5 == 0) {
            enemyArr.push(new Enemy());
        }
        if (!stop) {
            for (var j = 0; j < enemyArr.length; j++) {
                if (enemyArr[j].y > height) {
                    enemyArr.splice(j, 1);
                }
                enemyArr[j].show();
                enemyArr[j].move();
                enemyArr[j].updateSides();

                if (intersects(enemyArr[j], player)) {
                    stop = true;
                    break;
                }
            }
        }
    }

    if (!stop) {
        updateScore();
    }

    if (stop) {
        textSize(42);
        fill(255);
        text("Game Over!", 300, height / 2);


    }


}

this.Player = function() {
    this.x;
    this.y;
    this.left;
    this.right
    this.bottom;
    this.top;

    this.show = function() {
        rectMode(CENTER);
        fill(10, 10, 200);
        if (mouseX > width) {
            mouseX = width - 10;
        }
        if (mouseX < 0) {
            mouseX = 10;
        }
        if (mouseY > height) {
            mouseY = height - 10;
        }
        if (mouseY < 0) {
            mouseY = 10;
        }
        else {
        rect(mouseX, mouseY, 20, 20);
        }
    }

    this.updateSides = function() {
        this.left = mouseX - 10;
        this.right = mouseX + 10;
        this.bottom = mouseY + 10;
        this.top = mouseY - 10;
    }

}

this.Enemy = function() {
    this.x = random(width);
    this.y = 0;
    this.wi = random(20, 40);
    this.hi = random(20, 40);
    this.left;
    this.right;
    this.top;
    this.bottom;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.show = function() {
        rectMode(CENTER);
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.wi, this.hi);
    }

    this.move = function() {
        this.y += random(10, 15);
        if (this.y > height) {

        }
    }

    this.updateSides = function() {
        this.left = this.x - (this.wi / 2);
        this.right = this.x + (this.wi / 2);
        this.bottom = this.y + (this.hi / 2);
        this.top = this.y - (this.hi / 2);
    }
}

function intersects(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}

function updateScore() {
    var scoreText = document.getElementById("score");
    scoreText.innerHTML = ("Score: ") + (frameCount - minusValue);
}

function resetButton() {
    var button = document.getElementById("reset");
}