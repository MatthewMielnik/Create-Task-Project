

function initiateApp(a) {
	
	switch (a) {
		case 'setup':
			setUpMaze();
			break;
		case 'play':
			playMaze();
			break;
		}
	
}

function setUpMaze() {

	createMaze();
	var startButton = document.getElementById('startButton');
	startButton.querySelector('p').innerHTML = "You're on!";
	startButton.setAttribute('onclick', 'initiateApp("play")');
	document.getElementById('instructions').querySelector('p').innerHTML = "Whoever is the Riddler... build your trap.<br><font size='2px' color='#a1a9b2'>Build or remove walls of your maze by selecting the squares.<br>Double click a square to choose destination of your maze – the winner spot.</font>";
	
}

function playMaze() {
	
	createMazeGoer();
	hopMazeGoer();
	createDirectionCues();
	document.getElementById('startButton').style.display = 'none';
	document.getElementById('instructions').querySelector('p').innerHTML = "Problem solver... it's your turn!<br><font size='2px' color='#a1a9b2'>Use the keyboard arrow keys to find your way out.</font>";
	
	document.getElementById('0140').classList.remove('nogo');
	var blocks = document.getElementsByClassName('mazeBlock');
	for (var i = 0; i < blocks.length; i++) {
		var block = blocks[i];
		block.removeAttribute('onclick');
		block.removeAttribute('ondblclick');
		block.style.outline = '0px';
		block.style.background = '';
	}

}

function createMaze() {

	var x;	
	for (x = 0; x < 225; x++) { 

		// mazeBlock
		var mazeBlock = document.createElement('div');
		mazeBlock.setAttribute('class', 'mazeBlock');
		app.appendChild(mazeBlock);
		mazeBlock.setAttribute('id', mazeBlock.offsetTop.toString() + mazeBlock.offsetLeft.toString());
		
		if (mazeBlock.id !== '0140') {
			mazeBlock.setAttribute('onclick', 'buildWalls('+'"'+ mazeBlock.id +'"'+')');
			mazeBlock.setAttribute('ondblclick', 'setGoal('+'"'+ mazeBlock.id +'"'+')');
		} else {
			mazeBlock.classList.add('nogo');
			mazeBlock.appendChild(document.createElement('p'));
			mazeBlock.children[0].innerHTML = "The player starts here...";
			mazeBlock.setAttribute('onmouseover', "(function(e){ e.children[0].style.display = 'inline' })(this)" );
			mazeBlock.setAttribute('onmouseout', "(function(e){ e.children[0].style.display = 'none' })(this)" );
		}
			
	}

}

function buildWalls(t) {
	
	var targetBlock = document.getElementById(t);
	if (!targetBlock.classList.contains('wall')) {
		targetBlock.classList.add('wall');
	} else {
		targetBlock.classList.remove('wall');
	}
	
}

function setGoal(t) {
	
	var targetBlock = document.getElementById(t);
	targetBlock.classList.remove('wall');
	if (!targetBlock.classList.contains('prize')) {
		targetBlock.classList.add('prize');
		targetBlock.style.background = '#FDD220';
	} else {
		targetBlock.classList.remove('prize');
		targetBlock.style.background = '';
	}
	
}

function createMazeGoer() {
	
	// mazeGoer
	var mazeGoer = document.createElement('div');
	mazeGoer.setAttribute('id', 'mazeGoer');
	app.appendChild(mazeGoer);
	
		// mazeGoer styles
		var mazeGoerBase = document.createElement('style');
		mazeGoerBase.type = 'text/css';
		var mazeGoerBaseStyles = document.createTextNode( '' +
			'#mazeGoer {' +
			'  position: absolute;'+
			'  top: 0px;'+
			'  left: 140px;'+
			'  width: 20px;'+
			'  height: 20px;'+
			'  border-radius: 10px;'+
			'  background: rgb(224,255,40);'+
			'  background: radial-gradient(circle, rgba(255,235,40,1) 0%, rgba(213,171,0,1) 100%);'+
			'}');
		mazeGoerBase.appendChild(mazeGoerBaseStyles);
		mazeGoer.appendChild(mazeGoerBase);
	
}

function createDirectionCues() {
	
	// cue
	var cue = document.createElement('div');
	cue.setAttribute('id', 'cue');
	app.appendChild(cue);
	
		// cue styles
		var cueBase = document.createElement('style');
		cueBase.type = 'text/css';
		var cueBaseStyles = document.createTextNode( '' +
			'#cue {' +
			'  position: absolute;'+
			'  top: 100px;'+
			'  left: 400px;'+
			'  width: 50px;'+
			'  height: 50px;'+
			'  text-align: center;'+
			'  padding-top: 0.15em;'+
			'  opacity: 0;'+
			'}');
		cueBase.appendChild(cueBaseStyles);
		cue.appendChild(cueBase);
	
		var cueAnimation = document.createElement('style');
		cueAnimation.type = 'text/css';
		var cueAnimationStyles = document.createTextNode( '' +
			'#cue.anim {' +
			'  animation: pop 0.5s;'+
			'}' +
			'@keyframes pop {'+
			'  0% { opacity:0; }'+
			'  50% { opacity:1; }'+
			'  100% { opacity:0; }'+
			'}');
		cueAnimation.appendChild(cueAnimationStyles);
		cue.appendChild(cueAnimation);
	
	
	// arrow
	var arrow = document.createElement('span');
	arrow.setAttribute('id', 'arrow');
	arrow.innerHTML = "&#10140;";
	cue.appendChild(arrow);

	
		// arrow styles
		var arrowBase = document.createElement('style');
		arrowBase.type = 'text/css';
		var arrowBaseStyles = document.createTextNode( '' +
			'#arrow {' +
			'  position: relative;'+
			'  font-size: 3em;'+
			'  color: #d1d1e0;'+
			'}');
		arrowBase.appendChild(arrowBaseStyles);
		arrow.appendChild(arrowBase);
		
}

function hopMazeGoer() {
	
	var mazeGoer = document.getElementById('mazeGoer');
	var hopSize = 20;
	
	document.onkeydown = function(event) {
		switch (event.keyCode) {
			case 37: // left
				var wallLocation = document.getElementById( (mazeGoer.offsetTop).toString() + (mazeGoer.offsetLeft - hopSize).toString() );
				if (!wallLocation.classList.contains('wall')) {
					mazeGoer.style.left = (mazeGoer.offsetLeft - hopSize) + 'px';
					if (wallLocation.classList.contains('prize')) { prizeWon() };
				}
				hopCue(180);
				break;
			case 39: // right
				var wallLocation = document.getElementById( (mazeGoer.offsetTop).toString() + (mazeGoer.offsetLeft + hopSize).toString() );
				if (!wallLocation.classList.contains('wall')) {
					mazeGoer.style.left = (mazeGoer.offsetLeft + hopSize) + 'px';
					if (wallLocation.classList.contains('prize')) { prizeWon() };
				}
				hopCue(0);
				break;
			case 38: // up
				var wallLocation = document.getElementById( (mazeGoer.offsetTop - hopSize).toString() + (mazeGoer.offsetLeft).toString() );
				if (!wallLocation.classList.contains('wall')) {
		            mazeGoer.style.top = (mazeGoer.offsetTop - hopSize) + 'px';
					if (wallLocation.classList.contains('prize')) { prizeWon() };
				}
				hopCue(270);
				break;
			case 40: // down
				var wallLocation = document.getElementById( (mazeGoer.offsetTop + hopSize).toString() + (mazeGoer.offsetLeft).toString() );
				if (!wallLocation.classList.contains('wall')) {
		            mazeGoer.style.top = (mazeGoer.offsetTop + hopSize) + 'px';
					if (wallLocation.classList.contains('prize')) { prizeWon() };
				}
				hopCue(90);
				break;
	    }
	}
	
}

function prizeWon() {
	
	var mazeGoer = document.getElementById('mazeGoer');
	
	setTimeout(function() {
		mazeGoer.classList.add('winner');
		
		// banner
		var banner = document.createElement('div');
		banner.setAttribute('id', 'banner');
		banner.innerHTML = "Nice Job!";
		banner.classList.add('anim');
		banner.style.animationName = 'pop';
		appContainer.appendChild(banner);
		
			// banner styles
			var bannerBase = document.createElement('style');
			bannerBase.type = 'text/css';
			var bannerBaseStyles = document.createTextNode( '' +
				'#banner {' +
				'  position: relative;'+
				'  top: -220px;'+
				'  text-align: center;'+
				'  text-align: center;'+
				'  font-family: Arial, Helvetica, sans-serif;'+
				'  color: #FDD220;'+
				'  font-size: 5em;'+
				'  font-weight: bold;'+
				'  opacity: 0;'+
				'}');
			bannerBase.appendChild(bannerBaseStyles);
			banner.appendChild(bannerBase);
			
			var bannerAnimation = document.createElement('style');
			bannerAnimation.type = 'text/css';
			var bannerAnimationStyles = document.createTextNode( '' +
				'#banner.anim {' +
				'  animation: pop 0.8s;'+
				'}' +
				'@keyframes pop {'+
				'  0% { opacity:0; transform:scale(1,1); }'+
				'  50% { opacity:1; transform:scale(2,2); }'+
				'  100% { opacity:0; transform:scale(1,1); }'+
				'}');
			bannerAnimation.appendChild(bannerAnimationStyles);
			banner.appendChild(bannerAnimation);
		
	}, 50);
	
}

function hopCue(rotateAngle) {
	
	var app = document.getElementById('app');
	var cue = document.getElementById('cue');
	app.removeChild(cue);
	app.appendChild(cue);
	cue.style.transform = 'rotate('+rotateAngle+'deg)';
	cue.style.transformOrigin = '0% 50%';
	cue.classList.add('anim');
	cue.style.animationName = 'pop';
	
}



