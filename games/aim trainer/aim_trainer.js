var circleArray = [];
var counter = 0;
var seconds = 180;
var strikes = 0;
var playing = false;
var lost = false;


function setup() {
	var canvas = createCanvas(640, 480);
	canvas.parent('sketch');
}

function draw() {
	background(51);
	textSize(20);
	stroke(0);
	fill(255, 180);
	text("Score: " + counter, 50, 40);
	text("Strikes: " + strikes, width - 55, 40);
	
	if (strikes >= 3) 
		lost = true;

	if(!playing && !lost) {
		startText();
		if(keyIsPressed) {
			playing = true;
		}
	}

	if (lost) {
		playing = false;
		gameOverText();
	}

	if (playing && !lost) {
		if (circleArray.length > 0) {
			for (var i = circleArray.length - 1; i >= 0; i--) {
				circleArray[i].show();
				circleArray[i].grow();

				if (circleArray[i].radius > 50) {
					circleArray[i].shrink();
				}
				if (abs(circleArray[i].radius) <= 5) {
					popCircle(i);
					strikes++;
				}
			}
		} else {
			pushCircle();
		}
		increaseDifficulty();
	}
	restartGame();
}

this.Circle = function() {
	this.radius = random(5, 36);
	this.x = random(width);
	this.y = random(height);

	this.show = function() {
		stroke(255);
		ellipse(this.x, this.y, this.radius);
	}

	this.grow = function() {
		this.radius += 0.5;
	}

	this.shrink = function() {
		this.radius *= -1;
	}
}

function mouseClicked() {
	for (var i = circleArray.length - 1; i >= 0; i--) {
		var distance = dist(mouseX, mouseY, circleArray[i].x, circleArray[i].y);
		if (distance < abs(circleArray[i].radius / 2)) {
			popCircle(i);
			counter++;
		}

	}
}

function pushCircle() {
	var circle = new Circle();
	circleArray.push(circle);
}

function popCircle(i) {
	circleArray.splice(i, 1);
}

function increaseDifficulty() {

	if (frameCount % seconds == 0) {
		pushCircle();
	}
	if ((counter > 39 || frameCount > 3600) && seconds >= 60) {
		seconds = 30;
	}
	if ((counter > 29 || frameCount > 2700) && seconds >= 90) {
		seconds = 60;
	}
	if ((counter > 19 || frameCount > 1800) && seconds >= 120) {
		seconds = 90;
	}
	if ((counter > 9 || frameCount > 900) && seconds >= 180) {
		seconds = 120;
	}
}

function startText() {
	textAlign(CENTER);
	text("Click on the circles. Miss 3 circles and you lose.", width/2, height/2);
	text("Press any key to begin.", width/2, height * 2 / 3);
}

function gameOverText() {
	text("Game Over!", width/2, height/2);
	text("Press any key to play again.", width/2, height * 2 / 3);
}

function restartGame() {
	if (!playing && lost) {
		if (keyIsPressed) {
			strikes = 0;
			counter = 0;
			seconds = 180;
			playing = true;
			lost = false;
			circleArray.splice(0, 1);
		}
	}
}