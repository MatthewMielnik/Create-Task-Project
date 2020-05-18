document.addEventListener('DOMContentLoaded', function() {
	
	// set header; build foundational structure
	document.body.appendChild(document.createElement('div')).id = 'header';
	header.appendChild(document.createElement('h2')).innerHTML = "A-maze Game";
	header.appendChild(document.createElement('p')).innerHTML = "Play with a friend ...or your dog, if they're really smart.";
	
	header.appendChild(document.createElement('div')).id = 'startButton';
	startButton.appendChild(document.createElement('p'));
	startButton.querySelector('p').innerHTML = "Let's Go!";
	startButton.addEventListener( 'click', setUpMaze );
	
	document.body.appendChild(document.createElement('div')).id = 'appContainer';
	appContainer.appendChild(document.createElement('div')).id = 'app';
	
})


function setUpMaze() {

	// set header
	header.querySelector('p').innerHTML = ("Whoever is the Riddler... build your trap.<br>"+
												"Build or remove walls of your maze by selecting the squares.<br>"+
												"Double click a square to choose destination of your maze – the winner spot.");
	
	startButton.querySelector('p').innerHTML = "You're on!";
	startButton.removeEventListener( 'click', setUpMaze );
	startButton.addEventListener( 'click', playMaze );


	// call mazeBuilder method to build maze
	mazeBuilder.makeMazeBlocks();
	
	// setup keyboard cues
	app.appendChild(document.createElement('div')).id = 'cue';
	cue.appendChild(document.createElement('p')).id = 'arrow';
	arrow.innerHTML = "&#10140;";
	
}

		var mazeBuilder = {
			
			blocksRequired : (function() { return Math.pow((300 / 20), 2) })(),
			nogoBlock : '0140',
			buildWalls : function() { (!this.classList.contains('wall')) ? this.classList.add('wall') : this.classList.remove('wall') },
			setGoal : function() { (!this.classList.contains('prize')) ? this.classList.add('prize', 'prizeSetup') : this.classList.remove('prize', 'prizeSetup') },
			makeMazeBlocks : function() {

				for (let x = 0; x < this.blocksRequired; x++) {
					
					// make mazeBlock
					const mazeBlock = document.createElement('div');
					mazeBlock.className = 'mazeBlock mazeBlockSetup';
					app.appendChild(mazeBlock);
					mazeBlock.id = mazeBlock.offsetTop.toString() + mazeBlock.offsetLeft.toString();

					// identify player start block, show info; attach event listeners to blocks
					if (mazeBlock.id != this.nogoBlock) {
						mazeBlock.addEventListener( 'click', this.buildWalls );
						mazeBlock.addEventListener( 'dblclick', this.setGoal );
					} else {
						mazeBlock.classList.add('nogo');
						var infoBox = mazeBlock.appendChild(document.createElement('p'));
						infoBox.innerHTML = "The player starts here...";
						mazeBlock.addEventListener( 'mouseover', function(){ infoBox.style.display = 'inline' } );
						mazeBlock.addEventListener( 'mouseout', function(){ infoBox.style.display = 'none' } );
					}
				}
		  	}
		}


function playMaze() {
	
	// set header
	startButton.style.display = 'none';
	header.querySelector('p').innerHTML = ("Problem solver... it's your turn!<br>"+
												"Use the keyboard arrow keys to find your way out.");
	
	// switch maze visuals and event listeneres to game mode
	document.getElementById('0140').classList.remove('nogo');
	var blocks = document.getElementsByClassName('mazeBlock');
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];
		block.removeEventListener( 'click', mazeBuilder.buildWalls );
		block.removeEventListener( 'dblclick', mazeBuilder.setGoal );
		block.innerHTML = '';
		block.classList.remove('mazeBlockSetup');
		block.classList.remove('prizeSetup');
	}
	
	// initiate mazeGoer
	app.appendChild(document.createElement('div')).id = 'mazeGoer';
	hopMazeGoer();

}

		function hopMazeGoer() {

			let hopSize = 20;
			document.onkeydown = function(event) {
				switch (event.keyCode) {
					case 37: // left
						var cD_result = collisionDetector.testHopSpace(event.keyCode, hopSize);
						if (cD_result != 'wall') {
							mazeGoer.style.left = (mazeGoer.offsetLeft - hopSize) + 'px';
							(cD_result == 'prize') ? prizeWon() : null;
						}
						hopCue(180);
						break;
					case 39: // right
						var cD_result = collisionDetector.testHopSpace(event.keyCode, hopSize);
						if (cD_result != 'wall') {
							mazeGoer.style.left = (mazeGoer.offsetLeft + hopSize) + 'px';
							(cD_result == 'prize') ? prizeWon() : null;
						}
						hopCue(0);
						break;
					case 38: // up
						var cD_result = collisionDetector.testHopSpace(event.keyCode, hopSize);
						if (cD_result != 'wall') {
							mazeGoer.style.top = (mazeGoer.offsetTop - hopSize) + 'px';
							(cD_result == 'prize') ? prizeWon() : null;
						}
						hopCue(270);
						break;
					case 40: // down
						var cD_result = collisionDetector.testHopSpace(event.keyCode, hopSize);
						if (cD_result != 'wall') {
							mazeGoer.style.top = (mazeGoer.offsetTop + hopSize) + 'px';
							(cD_result == 'prize') ? prizeWon() : null;
						}
						hopCue(90);
						break;		
			    }
			}
		}
	
		var collisionDetector = {

			mazeGoer : document.getElementById('mazeGoer'),
			testHopSpace : function(directionOfMove, hopSize) {
				
				let hopTarget = (function() {
					switch (directionOfMove) {
					/* left */	case 37: return document.getElementById( (this.mazeGoer.offsetTop).toString() + (this.mazeGoer.offsetLeft - hopSize).toString() ); break;
					/* right */	case 39: return document.getElementById( (this.mazeGoer.offsetTop).toString() + (this.mazeGoer.offsetLeft + hopSize).toString() ); break;
					/* up */	case 38: return document.getElementById( (this.mazeGoer.offsetTop - hopSize).toString() + (this.mazeGoer.offsetLeft).toString() ); break;
					/* down */	case 40: return document.getElementById( (this.mazeGoer.offsetTop + hopSize).toString() + (this.mazeGoer.offsetLeft).toString() ); break;
					}
				})();
				
				let cl = hopTarget.classList;
				switch (true) {
					/* wall */	case cl.contains('wall')	: return 'wall'; break;
					/* prize */	case cl.contains('prize')	: return 'prize'; break;
					/* open */	default						: return null
				}

  		  	}
		  
		}

		function hopCue(rotateAngle) {

			let app = document.getElementById('app');
			let cue = document.getElementById('cue');
			app.removeChild(cue);
			app.appendChild(cue);
			cue.style.transform = 'rotate(' + rotateAngle + 'deg)';
			cue.classList.add('cueAnim');
	
		}

		function prizeWon() {
	
			// winner banner and maze walls animation
			function contentsAnimations() {
	
				header.style.opacity = 0;
				mazeGoer.classList.add('winner');
		
				appContainer.appendChild(document.createElement('div')).id = 'banner';
		 		banner.appendChild(document.createElement('p')).innerHTML = "Nice Job!";
		 		banner.classList.add('bannerAnim');

				var blocks = document.getElementsByClassName('wall');
				for (let i = 0; i < blocks.length; i++) {
					let block = blocks[i];
					block.classList.add('mazeBlockAnim');
				}
		
			}
			
			// app spin animation
			function appAnimations() {
				app.classList.add('appAnim');
			}
			
			// game restart button
			function restartGame() {
				appContainer.appendChild(document.createElement('div')).id = 'restartButton';
				restartButton.appendChild(document.createElement('p'));
				restartButton.querySelector('p').innerHTML = "Let's Go Again!";
				restartButton.classList.add('rsbAnim');
				restartButton.addEventListener( 'click', function(){ location.reload() } );
			}
			
			
			// animation sequencing
			setTimeout(function() { contentsAnimations(); }, 50);
			setTimeout(function() { appAnimations(); }, 600);
			setTimeout(function() { restartGame(); }, 1800);
	
		}
