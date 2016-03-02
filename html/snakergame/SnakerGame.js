
function SnakerGame(parentDiv) {
/*********************************************************/
var self = this;
//私有变量
var _count = 0;
var _countId = 0;
var _playInterval = null;

var _canvas = null;
var _body = [];
var _pos = [];
var _len = 0;

var _width = 10;
var _height = 10;
var _itemWidth = 20;
var _oriention = 'down';
var _orientId = -1;
var _speed = 1;
//公有变量
this.currentScore = 0;
this.maxScore = 0;
this.state = 'ready';//ready, play, pause, finish
this.speed = 1;

//创建容器canvas
var content = document.createElement('div');
content.style.position = 'relative';
parentDiv.appendChild(content);

_canvas = document.createElement('div');
_canvas.style.position = 'absolute';
_canvas.style.background = "#539";
_canvas.style.border = '4px solid #000';
content.appendChild(_canvas);

_tipDiv = document.createElement('div');
_tipDiv.style.position = 'absolute';
_tipDiv.style.background = "rgba(255, 255, 255, 0.5)";
_tipDiv.style.border = '4px solid #000';
_tipDiv.style.visibility = 'hidden';
content.appendChild(_tipDiv);
//创建

SnakerGame.prototype.play = function() {
	this.stop();
	_speed = self.speed;
	_countId = _count;
	//添加第一个物体
	addBody();
	//默认吃掉第一个物体
	eat();
	//
	this.state = 'ready';
	_tipDiv.style.visibility = 'hidden';
	//
	_playInterval = setInterval(function() {
		if(self.state != 'play') return;
		_count++;
		if( _count-_countId < 25/_speed ) return;
		_countId = _count;
		/**********************************************/
		var pos1 = getNextPos();
		var pos2 = _pos[_len - 1];
		var tail = _pos[_len - 2];
		//移动之前和尾巴的位置和
		if((pos1[0] != tail[0] || pos1[1] != tail[1]) && !checkPos(pos1)) {
			self.state = 'finish';
			_tipDiv.style.visibility = 'visible';
		}else {
			if(pos1[0] == pos2[0] && pos1[1] == pos2[1]) {
				eat();
				self.currentScore = _len - 2;
			}
			moveAhead();
		}
		/**********************************************/
	}, 20);
}

SnakerGame.prototype.pause = function() {
	this.state = 'pause';
}

SnakerGame.prototype.continue = function() {
	this.state = 'ready';
}

SnakerGame.prototype.stop = function() {
	clearInterval(_playInterval);
	for(var i = 0; i < _len; i++) {
		_canvas.removeChild(_body[i]);
	}
	_count = 0;
	_len = 0;
	_pos = [];
	_body = [];
	_orientId = -1;
	if(this.maxScore < this.currentScore) this.maxScore = this.currentScore;
	this.currentScore = 0;
	this.state = 'ready';
	_tipDiv.style.visibility = 'hidden';
}

SnakerGame.prototype.resize = function(width, height, itemWidth) {
	_width = width;
	_height = height;
	_itemWidth = itemWidth;

	_canvas.style.width = _tipDiv.style.width = (_width * _itemWidth).toString() + 'px';
	_canvas.style.height = _tipDiv.style.height = (_height * _itemWidth).toString() + 'px';
	parentDiv.style.width = (_width * _itemWidth + 8).toString() + 'px';
	parentDiv.style.height = (_height * _itemWidth + 8).toString() + 'px';
}
this.resize(_width, _height, _itemWidth);

function addBody() {
	var newBody = document.createElement('div');
	newBody.style.position = 'absolute';
	newBody.style.width = (_itemWidth-2).toString() + 'px';
	newBody.style.height = (_itemWidth-2).toString() + 'px';
	newBody.style.background = "#f30";
	newBody.style.margin = "1px";
	_body.push(newBody);
    _canvas.appendChild(newBody);

	var newPos = getRandomPos();
	_pos.push(newPos);
	setPos(newBody, newPos);
	_len++;
}

function getRandomPos() {
	var x, y;
	do{
		x = Math.round( Math.random() * _width );
		y = Math.round( Math.random() * _height );
	}while( !checkPos([x, y]) || _len && x == _pos[_len-1][0] && y == _pos[_len-1][1]);
	return [x, y];
}

function checkPos(pos) {
	if(pos[0] >= _width || pos[0] < 0) return false;
	if(pos[1] >= _height || pos[1] < 0) return false;
	var len = _len - 1;
	for(var i = 0; i < len; i++) {
		if(_pos[i][0] == pos[0] && _pos[i][1] == pos[1]) {
			return false;
		}
	}
	return true;
}

function getNextPos() {
	var offsetArr;
	switch(_oriention) {
		case 'up': offsetArr = [0, -1]; break;
		case 'down': offsetArr = [0, 1]; break;
		case 'left': offsetArr = [-1, 0]; break;
		case 'right': offsetArr = [1, 0]; break;
	}
	return [
		_pos[0][0] + offsetArr[0],
		_pos[0][1] + offsetArr[1]
	];
}

function setPos(item, pos) {
	item.style.left = (pos[0]*_itemWidth).toString() + 'px';
	item.style.top = (pos[1]*_itemWidth).toString() + 'px';
}

function eat() {
	_body[_len - 1].style.background = "#f90";
	_body[0].style.background = "#fff";
	addBody();
}

function moveAhead() {
	//将所有位置向前一次
	var len = _len - 1;
	for(var i = len - 1; i > 0; i--) {
		_pos[i] = _pos[i - 1];
	}
	_pos[0] = getNextPos();
	//重新设置所有物体的位置
	for(var i = len - 1; i >= 0; i--) {
		setPos(_body[i], _pos[i]);
	}
}

document.onkeydown = function(event) {
	if(self.state == 'ready') self.state = 'play';
	var newOrient;
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e.keyCode == 38) newOrient = _oriention == 'down' ? 'down' : 'up';//上
	if(e.keyCode == 40) newOrient = _oriention == 'up' ? 'up' : 'down';//下
	if(e.keyCode == 37) newOrient = _oriention == 'right' ? 'right' : 'left';//左
	if(e.keyCode == 39) newOrient = _oriention == 'left' ? 'left' : 'right';//右
	if(newOrient == _oriention) {
		if(_speed < 5) _speed++;
	}else {
		if(_countId == _orientId) return;//这两句代码为了确保一帧只能转变一次方向
		_oriention = newOrient;
		_orientId = _countId;
		_speed = self.speed;
	}
}
document.onkeyup = function(event) {
	_speed = self.speed;
}
/*********************************************************/
};