

function initiateApp() {
	
	createMazeGoer();
	createDirectionCues();
	startButton.style.display = "none";
	hopMazeGoer();
	
}


function createMazeGoer() {
	
	// mazeGoer
	var mazeGoer = document.createElement('div');
	mazeGoer.setAttribute('id', 'mazeGoer');
	appContainer.appendChild(mazeGoer);
	
		// mazeGoer styles
		var mazeGoerBase = document.createElement('style');
		mazeGoerBase.type = 'text/css';
		var mazeGoerBaseStyles = document.createTextNode( '' +
			'#mazeGoer {' +
			'  position: absolute;'+
			'  top: 200px;'+
			'  left: 400px;'+
			'  width: 20px;'+
			'  height: 20px;'+
			'  border-radius: 10px;'+
			'  background-color: #cc33ff;'+
			'}');
		mazeGoerBase.appendChild(mazeGoerBaseStyles);
		mazeGoer.appendChild(mazeGoerBase);
	
}

function createDirectionCues() {
	
	// cue
	var cue = document.createElement('div');
	cue.setAttribute('id', 'cue');
	appContainer.appendChild(cue);
	
		// cue styles
		var cueBase = document.createElement('style');
		cueBase.type = 'text/css';
		var cueBaseStyles = document.createTextNode( '' +
			'#cue {' +
			'  position: relative;'+
			'  top: 100px;'+
			'  left: 700px;'+
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
				mazeGoer.style.left = (mazeGoer.offsetLeft - hopSize) + 'px';
				hopCue(180);
				break;
			case 39: // right
	            mazeGoer.style.left = (mazeGoer.offsetLeft + hopSize) + 'px';
				hopCue(0);
				break;
			case 38: // up
	            mazeGoer.style.top = (mazeGoer.offsetTop - hopSize) + 'px';
				hopCue(270);
				break;
			case 40: // down
	            mazeGoer.style.top = (mazeGoer.offsetTop + hopSize) + 'px';
				hopCue(90);
				break;
	    }
	}
	
}


function hopCue(rotateAngle) {
	
	var appContainer = document.getElementById('appContainer');
	var cue = document.getElementById('cue');
	appContainer.removeChild(cue);
	appContainer.appendChild(cue);
	cue.style.transform = 'rotate('+rotateAngle+'deg)';
	cue.style.transformOrigin = '0% 50%';
	cue.classList.add('anim');
	cue.style.animationName = 'pop';
	
}
