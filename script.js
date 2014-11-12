// Object Definitions
function Block(x, y, number) {
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.number = number;
	this.isAnimating = false;
}

Block.prototype = {
	constructor: Block, draw:function(){
		context.fillStyle = "black";
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = "white"
		context.fillText(this.number, (this.x + this.width/4), (this.y + this.height - this.height/4));
	},
	animate:function(keyID) {
		if(keyID == 68) {
			if(this.number === " ") {
				//esquerda
				for(var i = 0; i < 600; i++) {
					this.x-=0.01;
				}
			}
			else {
				//direita
				for(var i = 0; i < 600; i++) {
					this.x+=0.1;
				}
			}
		}
		context.fillStyle = "black";
		context.fillRect(x, y, this.width, this.height);
		context.fillStyle = "white"
		context.fillText(this.number, (this.x + this.width/4), (this.y + this.height - this.height/4));
	},
	swap:function(index1, index2) {
		var b = blocks[index1[0]][index1[1]];
		blocks[index1[0]][index1[1]] = blocks[index2[0]][index2[1]];
		blocks[index2[0]][index2[1]] = b;
	}
}
// End of object definitions



// Setups
window.requestAnimFrame = (function(){ 
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    || 
            function(callback){ 
            	window.setTimeout(callback, 1000 / 60); 
            }; 
    })();

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.font = "italic 26pt Tahoma";
var requestId;
var win = false;

var blocks = [[],[],[]];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", " "];
for(var i = 0, y = 10; i < 3; i++, y+=60) {
	for(var j = 0, x = 10; j < 3; j++, x+=60) {
		var z = Math.floor((Math.random() * numbers.length));
		blocks[i][j] = new Block(x, y, numbers[z]);
		numbers.splice(z, 1);
	}
}
window.requestAnimFrame(draw);
// End of setups



// Game loop
function draw() {
	if(!win) {
    	requestId = window.requestAnimFrame(draw);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    //checkAnimations();
    drawBlocks(blocks);
    win = endGame();
    if(win) {
    	drawBlocks(blocks);
    	alert("Você venceu, parabéns!");
    	window.cancelAnimationFrame(requestId);
    }
}
// End of game loop



// Functions
function drawBlocks(b) {
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			if(b[i][j].number === " ") {
				continue;
			}
			b[i][j].draw();
		}
	}
}

function searchEmptyBlock(b) {
	var found = false;
	var index = [];
	for(var i = 0; i < 3 && !found; i++) {
		for(var j = 0; j < 3 && !found; j++) {
			if(b[i][j].number === " ") {
				found = true;
				index[0] = i;
				index[1] = j;
			}
		}
	}
	return index;
}

function endGame() {
	var solved = true;
	var values = ["1", "2", "3", "4", "5", "6", "7", "8", " "];
	for(var i = 0, k = 0; i < 3 && solved === true; i++) {
		for(var j = 0; j < 3 && solved === true; j++, k++) {
			if(blocks[i][j].number !== values[k]) {
				solved = false;
			}
		}
	}
	return solved;
}
// End of functions



// Events 
window.addEventListener("keydown", function(e) {
		var index = searchEmptyBlock(blocks);
		var i = index[0], j = index[1];
		var keyID = e.keyCode || e.which;
		var aux = blocks[i][j].number;
		if(keyID == 68 && index[1] != 0) {
			blocks[i][j].number = blocks[i][j-1].number;
			blocks[i][j-1].number = aux;
		}
		if(keyID == 65) {
			blocks[i][j].number = blocks[i][j+1].number;
			blocks[i][j+1].number = aux;
		}
		if(keyID == 87) {
			blocks[i][j].number = blocks[i+1][j].number;
			blocks[i+1][j].number = aux;
		}
		if(keyID == 83) {
			blocks[i][j].number = blocks[i-1][j].number;
			blocks[i-1][j].number = aux;
		}

		window.requestAnimFrame(draw);
	});
/*
window.addEventListener("keyup", function(e) {
		var keyID = e.keyCode || e.which;
		if(keyID == 68) {
			isRightKey = false;
		}
		if(keyID == 65) {
			isLeftKey = false;
		}
		if(keyID == 87) {
			isUpKey = false;
		}
		if(keyID == 83) {
			isDownKey = false;
		}
	});
*/
// End of events

