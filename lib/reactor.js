function Reactor () {
    this._eventsDict = {};
}

Reactor.prototype.addCallback = function(event, callBack) {
    if(event in this._eventsDict){
    	if(this._eventsDict[event].indexOf(callBack) == -1){
      	    	this._eventsDict[event].push(callBack);
      }
    }
};

Reactor.prototype.removeCallback = function(event, callBack) {
    var index = this._eventsDict[event].indexOf(callBack);
    if(index > -1){
        this._eventsDict[event].splice(index, 1);
    }
};

Reactor.prototype.registerEvent = function(event){
	if(!(event in this._eventsDict)){
        this._eventsDict[event] = [];
  }
};

Reactor.prototype.deRegisterEvent = function(event){
	if(event in this._eventsDict){
        delete this._eventsDict[event];
  }
};

Reactor.prototype.triggerEvent = function(event){
	if(event in this._eventsDict){
        delete this._eventsDict[event];
  }
};

exports.Reactor = Reactor;
