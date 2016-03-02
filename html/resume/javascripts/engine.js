
/**************** GameObject *************************************************/
function runGame(){}

/**************** GameObject *************************************************/
function GameObject() {
	this.name = 'gameObject';
	this.components = [];
	this.script = function() {}
}

GameObject.prototype.type = 'gameObject';

GameObject.prototype.render = function() {
	
}

GameObject.prototype.addComponent = function(component) {
	this.components.push(component);
	return component;
}

GameObject.prototype.getComponentByName = function(name) {
	var comp = this.components;
	var len = comp.length;
	for(var i = 0; i < len; i++) {
		if(comp[i].name == name) return comp[i];
	}
	return null;
}

GameObject.prototype.getComponentByType = function(type) {
	var comp = this.components;
	var len = comp.length;
	for(var i = 0; i < len; i++) {
		if(comp[i].type == type) return comp[i];
	}
	return null;
}

GameObject.findByName = function(name, obj) {
	if(!obj) obj = window;
	if(obj instanceof Array) {
		var len = obj.length;
		for(var i = 0; i < len; i++) {
			if(obj[i] instanceof GameObject && obj[i].name == name) return obj[i]; 
		}
	}else {
		for(var i in obj) {
			if(obj[i] instanceof GameObject && obj[i].name == name) return obj[i]; 
		}
	}
	return null;
}

/**************** Audio *************************************************/
function Audio(path) {
	this.name = 'audio';
	this.sourceLink = path || '';
	this.autoplay = false;
	this.loop = false;
	this.startTime = 0;
	this.html = document.createElement("audio");
	//document.body.appendChild(newObj);
}

Audio.prototype.type = 'audio';

Audio.prototype.play = function() {
	var html = this.html;
	html.src = this.sourceLink;
	html.loop = this.loop;
	html.currentTime = this.startTime;
	html.play();
}

Audio.prototype.replay = function() {
	this.stop();
	this.play();
}

Audio.prototype.stop = function() {
	var html = this.html;
	html.currentTime = this.startTime;
}

/**************** Texture *************************************************/
function Texture(path) {
	this.name = 'texture';
	this.sourceLink = path || '';
	this.width = 10;
	this.height = 10;
	this.html = document.createElement("img");
	//document.body.appendChild(newObj);
}

Texture.prototype.type = 'texture';

Texture.prototype.play = function() {
	var html = this.html; 
	html.src = this.sourceLink;
	html.loop = this.loop;
	html.currentTime = 0;
	html.play();
}

Texture.prototype.stop = function() {
	var html = this.html;
	html.currentTime = 0;
}

/**************** other function *************************************************/
//render:
//translate
//mesh
//texture

/**************** event *************************************************/


/**************** other function *************************************************/
function dir(obj) {
	for(var i in obj) {
		console.log(i, obj[i]);
	}
}







