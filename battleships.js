const VERTICAL = 0;
const HORIZONTAL = 1;
const CARRIER = 5;
const BATTLESHIP = 4;
const CRUISER = 3;
const SUBMARINE = 3;
const DESTROYER = 2;

document.addEventListener("DOMContentLoaded", function(){


	let ctx = document.getElementById("canvas").getContext("2d");
	ctx.strokeStlye = "black";

	console.log(ctx.canvas.width);
	console.log(ctx.canvas.height);

	let grid = new Array(11);
	for(let i=0; i < grid.length; i++){
		grid[i] = new Array(8);
	}

	for(let i=0; i < ctx.canvas.width; i+=100){
		ctx.moveTo(i,0);
		ctx.lineTo(i,800);
		ctx.stroke();
	}
	for(let j=0; j < ctx.canvas.height; j+=100){
		ctx.moveTo(0,j);
		ctx.lineTo(1000,j);
		ctx.stroke();
	}

	//assign ship positions:
	//carrier 5
	//battleship 4
	//cruiser 3
	//submarine 3
	//destroyer 2

	ctx.fillStyle = "red";
	let ships = [CARRIER, BATTLESHIP, CRUISER, SUBMARINE, DESTROYER];
	let positions = [];
	for(let i=0; i < ships.length; i++){
		//TODO check for intersection
		let orientation = getRandomInt(VERTICAL, HORIZONTAL+1);
		//we adjust random placement to be within region where ship will not overflow the map 
		//with its orientation by subtracting its length from the grid length
		if(orientation === VERTICAL){

			//check that ship is not intersecting any others, and keep rolling the dice til it isnt
			let p = getPosition([getRandomInt(0,10), getRandomInt(0,8-ships[i])], ships[i], VERTICAL);
			while(!checkShipPosition(positions, p)){
				p = getPosition([getRandomInt(0,10), getRandomInt(0,8-ships[i])], ships[i], VERTICAL);
			}
			positions.push(p);

			placeShip(
				ctx,
				p[0],//[getRandomInt(0,10), getRandomInt(0,8-ships[i])],
				ships[i],
				VERTICAL
			);
		}else{
			//check that ship is not intersecting any others, and keep rolling the dice til it isnt
			let p = getPosition([getRandomInt(0,10-ships[i]),getRandomInt(0,8)], ships[i], HORIZONTAL);
			while(!checkShipPosition(positions, p)){
				p = getPosition([getRandomInt(0,10-ships[i]),getRandomInt(0,8)], ships[i], HORIZONTAL);
			}
			positions.push(p);

			placeShip(
				ctx,
				p[0],//[getRandomInt(0,10-ships[i]),getRandomInt(0,8)],
				ships[i],
				HORIZONTAL
			);
		}
	}
	console.log(positions);

});

function placeShip(ctx, start, size, orientation){
	console.log(start);
	for(let i=0; i < size; i++){
		let xp = orientation === VERTICAL ? start[0]*100 + 50 : (start[0]+i)*100 + 50;
		let yp = orientation === VERTICAL ? (start[1]+i)*100 + 50 : start[1]*100 + 50;
		console.log(xp);
		console.log(yp);
		ctx.beginPath();
		ctx.arc(xp, yp, 45, 0, 2*Math.PI);
		ctx.fill();
	}
}

function getPosition(start, size, orientation){
	console.log("getPosition()");
	console.log(start);
	console.log(size);
	let pos = [];
	pos.push(start);
	for(let i=0; i < size; i++){
		if(orientation === VERTICAL){
			pos.push([start[0], start[1]+i]);
		}else{
			pos.push([start[0], start[1]]);
		}
	}
	return pos;
}

//not efficient but there are only 5 ships
function checkShipPosition(positions, pos){

	for(let i=0; i < positions.length; i++){
		for(j=0; j < positions[i].length; j++){
			let p = positions[i][j];
			for(k=0; k < pos.length; k++){
				if(p[0] === pos[k][0] && p[1] === pos[k][1]){
					return false;
				}
			}
		}
	}
	return true;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
