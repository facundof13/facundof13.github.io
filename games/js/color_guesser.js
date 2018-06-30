var r, g, b;
var list = [];
var rand;
var canClick;
var correct;
var score;

function setup() {
    var canvas = createCanvas(400, 400);
	canvas.parent('sketch');
    reset();
    correct = false;
    canClick = true;
    score = 0;
}

function draw() {
    background(0);
    instructions();
    colorToGuess();
    showScore();
    for (var i = 0; i < list.length; i++) {
        list[i].show();
    }
    if (canClick && mouseIsPressed) {
        if (getChoice() < 5) {
            var choice = getChoice();
            canClick = false;
            correct = correctChoice(choice);
        }
    }
    if (correct) {
        feedbackToText(true);
        hideWrongs();
        showResetText();
        if (keyIsPressed) {
            score++;
            reset();
        }
    } else if (!correct && !canClick) {
        feedbackToText(false);
        hideWrongs();
        showResetText();
        if (keyIsPressed) {
            reset();
        }
    }
}
this.Blob = function(x) {
    this.x = x;
    this.y = 200;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.width = 75;
    this.show = function() {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.width);
    }
}

function instructions() {
    fill(180);
    textAlign(CENTER);
    textSize(20);
    stroke(1);
    text("Guess the color that matches the RGB:", width / 2, 40);
}

function colorToGuess() {
    var txt = "" + r + ", " + g + ", " + b;
    fill(180);
    textAlign(CENTER);
    textSize(32);
    stroke(1);
    text(txt, width / 2, 100);
}

function feedbackToText(correct) {
    if (correct) {
        txt = "Correct!";
        fill(0, 200, 0);
    } else if (!correct) {
        txt = "Wrong!";
        fill(200, 0, 0);
    }
    textSize(40);
    stroke(1);
    text(txt, width / 2, 280);
}

function showResetText() {
    var txt = "Press any key to play again";
    fill(180);
    textAlign(CENTER);
    textSize(20);
    stroke(1);
    text(txt, width / 2, 380)
}

function showScore() {
    var txt = "Score: " + score;
    fill(180);
    textAlign(CENTER);
    textSize(32);
    stroke(1);
    text(txt, width / 2, 332);
}

function getChoice() {
    if (mouseY >= 175 && mouseY <= 226) {
        if (mouseX >= 18 && mouseX <= 58) {
            return 0;
        } else if (mouseX >= 99 && mouseX <= 138) {
            return 1;
        } else if (mouseX >= 179 && mouseX <= 216) {
            return 2;
        } else if (mouseX >= 257 && mouseX <= 299) {
            return 3;
        } else if (mouseX >= 336 && mouseX <= 382) {
            return 4;
        } else return 5;
    }
}

function correctChoice(choice) {
    if (choice == rand) return true;
    else return false;
}

function reset() {
    r = floor(random(1, 256));
    g = floor(random(1, 256));
    b = floor(random(1, 256));
    rand = floor(random(5));
    newColors();
}

function newColors() {
    var location = 40;
    canClick = true;
    correct = false;
    for (var i = 0; i < 5; i++) {
        if (i == rand) {
            list[i] = new Blob(location);
            list[i].r = r;
            list[i].g = g;
            list[i].b = b;
        } else {
            list[i] = new Blob(location);
            list[i].r = floor(random(1, 256));
            list[i].g = floor(random(1, 256));
            list[i].b = floor(random(1, 256));
        }
        location += 80;
    }
}

function hideWrongs() {
    for (var i = 0; i < list.length; i++) {
        if (i != rand) {
            list[i].r = 0;
            list[i].g = 0;
            list[i].b = 0;
        }
    }
}
//print the rgb of a random color
//print 5 different colors
//have the user pick which color is which