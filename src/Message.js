const SENT = "SENT";
const JUNK = "JUNK";
const READ = "READ";
const SAVE = "SAVE";
const NEW = "NEW";
Message.counter = 1;

function Message() {
	this.id = Message.counter++;
	this._status = [NEW];
	this._isReceived = false;
	this.date = new Date();
	this.content = "";
	this.subject = "";
	this.destiny = "";
}
Message.prototype.send = function() {
  this._add(SENT);
  this._add(SAVE);
  this._remove(NEW);
};

Message.prototype.junk = function() {
  this._add(JUNK);
};

Message.prototype.isReceived = function(){
	return this._isReceived === true;
}

Message.prototype.setReceived = function(received){
	this._isReceived = received;
}

Message.prototype.isJunk = function(){
	return this._status.indexOf(JUNK) > -1;
}

Message.prototype.open = function() {
	this._add(READ);
	this._remove(NEW);
};

Message.prototype.save = function() {
	this._add(SAVE);
};

Message.prototype.create = function(destiny, subject, content){
	this.destiny = destiny;
	this.subject = subject;
	this.content = content;
}

Message.prototype.getDestiny = function(){
	return this.destiny;
}

Message.prototype.getContent = function(){
	return this.content;
}

Message.prototype.getSubject = function(){
	return this.subject;
}

Message.prototype._add = function(type){
	if(!this._exists(type)){
		this._status.push(type);
	}
}

Message.prototype._remove = function(type){
	if(!this._exists(type)){
		this._status.splice(this._status.indexOf(type), 1);
	}
}

Message.prototype._exists = function(type){
	return this._status.indexOf(type) > -1;
}

Message.prototype.getStatus = function(){
	return this._status;
}