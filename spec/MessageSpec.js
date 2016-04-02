describe("Suite de Testes do Message", function(){
	//Array que irá conter os objetos menssagens
    var messages = [];
    //Variavel que será usada para exibir o funcionamento do beforeEach
    var listaFoiLimpa = false;
    beforeEach(function(){
        var message = new Message();
        var message2 = new Message();
        var message3 = new Message();
		var message4 = new Message();

		//Mensagem com o status de recebida e nova
        message.create("mybox@gmail.com", "Email-recebido", "Essa mensagem representa um e-mail que foi recebido");
        message.setReceived(true);

        //Mensagem com o status de nova e salva 
        message2.create("etc@gmail.com", "Email-salvo", "Essa mensagem representa um e-mail que está salvo");
        message2.save();

		//Mensagem com o status de recebida, lixeira e nova
		message3.create("mybox@gmail.com", "Email-recebido", "Essa mensagem representa um e-mail que foi recebido só que foi enviado para a lixeira");
        message3.setReceived(true);
        message3.junk();

        //Mensagem com o status de salva e enviada
        message4.create("etc@gmail.com", "Email-enviado", "Corpo do e-mail que será enviado para alguem.");
        message4.save();
        message4.send();

        messages.push(message);
        messages.push(message2);
        messages.push(message3);
        messages.push(message4);
    });
    
    afterEach(function(){
    	messages = [];
    	listaFoiLimpa = true;
    });
    
    describe("Suite de Testes do AfterEach()", function(){
    	it("Isto deverá confirmar que a variavel listaFoiLimpa não foi zerada pela função afterEach()", function(){
	    	expect(listaFoiLimpa).toBeFalsy();
	    });

	    it("Isto deverá confirmar que a variavel listaFoiLimpa teve o valor alterado pelo afterEach()", function(){
	    	expect(listaFoiLimpa).toBeTruthy();
	    });

	    it("Isto deverá verificar se a lista de mensagens não está vazia e contém 4 objetos", function(){
	        expect(messages.length).not.toBe(0);
	        expect(messages.length).toBe(4);
	    });	
    });

    describe("Suite de Testes de Status das mensagens", function(){
    	it("Isto deverá verificar se a lista contém pelo menos um e-mail com o status de enviado", function(){
	        var status = false;
	        for(var i=0; i < messages.length; i++){
	        	if(messages[i].getStatus().indexOf(SENT) > -1){
	        		status = true;
	        	}
	        }
	        expect(status).toBeTruthy();
	    });

	    it("Isto deverá verificar se existem 2 mensagens que foram recebidas", function(){
	    	var contador = 0;
	    	for(var i=0; i < messages.length; i++){
	        	if(messages[i].isReceived()){
	        		contador++
	        	}
	        }
	        expect(contador).toBe(2);
	    });

	    it("Isto deverá executar o envio de todas as 4 mensagens e ficar com o status SENT", function(){
	    	var contador = 0;
	    	for(var i=0; i < messages.length; i++){
				messages[i].send();
				if(messages[i].getStatus().indexOf(SENT) > -1){
					contador++
				}
	        }
	        expect(contador).toBe(4);
	    });

	    it("Verifica se as mensagens ainda não foram abertas", function(){
	    	var status = false;
	    	for(var i=0; i < messages.length; i++){
	    		if(messages[i].getStatus().indexOf(READ) > -1){
	    			status = true;
	    		}
	    	}

	    	expect(status).toBeFalsy();
	    });
    });
    
})