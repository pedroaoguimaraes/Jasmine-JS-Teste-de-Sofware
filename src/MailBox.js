const SUBJECT = "SUBJECT";
const CONTENT = "CONTENT";
const DESTINY = "DESTINY";

function MailBox(){
	this.messages = [];
	this._currentMessage = null;
}

/**
*
* @params text Texto contendo o conteúdo a ser buscado
* @params inputType Array informando os campos que deverão ser usados na pesquisa(CONTENT, DESTINY, SUBJECT);
* @return list Array de objetos Message
*/
MailBox.prototype.find = function(text, inputType){
	inputType = inputType == undefined || inputType == null ? [CONTENT, DESTINY, SUBJECT] : inputType;
	var msg;
	var list = [];
	for(var i=0; i < this.messages.length; i++){
		msg = this.messages[i];
		if(	(inputType.indexOf(SUBJECT) > -1 && msg.subject.indexOf(text) > -1) 
			|| (inputType.indexOf(CONTENT) > -1 && msg.content.indexOf(text) > -1)
			|| inputType.indexOf(DESTINY) > -1 && msg.destiny.indexOf(text) > -1){
			list.push(msg);
		}
	}
	return list;
}

/**
* @return messages Array de objetos Message
*/
MailBox.prototype.getMessages = function(){
	return this.messages;
}

/**
* @params id Id da mensagem a ser enviada para a lixeira
*/
MailBox.prototype.sendToJunk = function(id){
	this.setCurrentMessageWithId(id);
	if(this._currentMessage != null){
		this._currentMessage.delete();
	}
}

/**
* @params id Id da mensagem a ser deletada da lista de mensagens da MailBox
*/
MailBox.prototype.delete = function(id){
	var index = this._getMessageIndexById(id);
	if(index > -1){
		this.messages.splice(index, 1);
	}
}

/**
* @return messages.length Total de mensagens na lista
*/
MailBox.prototype.totalMessages = function(){
	return this.messages.length;
}

/**
* @params destiny Endereço de destino
* @params subject Assunto da mensagem
* @params content Conteúdo da mensagem
*/
MailBox.prototype.createNewMessage = function(destiny, subject, content){
	this._currentMessage = new Message();
	this._currentMessage.create(destiny, subject, content);
}

/**
* @params id Id da mensagem que irá ficar com o foco pelo objeto MailBox e irá marcar como LIDA(READ)
*/
MailBox.prototype.openMessage = function(id) {
	this.setCurrentMessageWithId(id);
	if(this._currentMessage != null){
		this._currentMessage.open();
	}else{
		this._currentMessage = null;
	}
};

/**
* Envia a mensagem que está no _currentMessage e adiciona ela a lista de menssagens do MailBox e deixa o
* currentMessage com o valor null
*/
MailBox.prototype.sendMessage = function(){
	this._currentMessage.send();
	this.add(this._currentMessage);
	this._currentMessage = null;
}


MailBox.prototype.setCurrentMessageWithId = function(id){
	this._currentMessage = null;
	for(var i=0; i < this.messages.length; i++){
		if(this.messages[i].id == id){
			this._currentMessage = this.messages[i];
		}
	}
}

MailBox.prototype._getMessageIndexById = function(id){
	var index = -1;
	for(var i=0; i < this.messages.length; i++){
		if(this.messages[i].id == id){
			index = i;
		}
	}
	return index;
}

MailBox.prototype._checkExists = function(message){
	var flag = false;
	for(var i=0; i < this.messages; i++){
		if(this.messages[i].id == message.id){
			flag = true;
			break;
		}
	}
	return flag;
}

/**
* @params message Objeto Message
*/
MailBox.prototype.add = function(message){
	if(!this._checkExists(message)){
		this.messages.push(message);
	}
}

MailBox.prototype.setCurrentMessage = function(message){
	this._currentMessage = message;
}

MailBox.prototype.getCurrentMessage = function(){
	return this._currentMessage;
}