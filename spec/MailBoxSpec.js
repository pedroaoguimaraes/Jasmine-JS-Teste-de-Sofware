describe('Suíte de Testes do MailBox', function() {
	//MailBox que irá conter os objetos menssagens
    var mailBox = new MailBox();
    var message = null;
    var message2 = null;
    //Deverá ser carregado apenas uma vez para se manter com o ID: 31
    var message3 = null;
    var message4 = null;
    beforeEach(function(){
        message = new Message();
        message2 = new Message();
        //Garantir que sempre tera o ID: 31
        message3 = message3 != null ? message3 : new Message();
        message4 = new Message();

        //Mensagem com o status de recebida e nova
        message.create("mybox@gmail.com", "Email-recebido", "Essa mensagem representa um e-mail que foi recebido");
        message.setReceived(true);

        //Mensagem com o status de nova e salva 
        message2.create("etc@gmail.com", "Email-salvo", "Essa mensagem representa um e-mail que está salvo");
        message2.setReceived(true);
        message2.save();

        //Mensagem com o status de recebida, lixeira e nova
        message3.create("mybox@gmail.com", "Email-recebido", "Essa mensagem representa um e-mail que foi recebido só que foi enviado para a lixeira");
        message3.setReceived(true);
        message3.junk();

        //Mensagem com o status de salva e enviada
        message4.create("etc@gmail.com", "Email-enviado", "Corpo do e-mail que será enviado para alguem.");
        message4.setReceived(true);
        mailBox.setCurrentMessage(message4);

        mailBox.add(message);
        mailBox.add(message2);
        mailBox.add(message3);
        mailBox.add(message4);
    });
    
    afterEach(function(){
    	mailBox = new MailBox();
    });

    it("Isto deverá verifica se a MailBox está preenchida", function(){
        expect(mailBox.totalMessages()).toBeGreaterThan(0)
    });

    it("Isto deverá verifica se existe uma mensagem sendo apontada pelo 'currentMessage'", function(){
        expect(mailBox.getCurrentMessage()).not.toBe(null);
    });

    it("Isto deverá verifica se a mensagem após ser enviada, deixa de ser apontada pelo 'currentMessage' e verifica também se ela foi adicionada a lista de mensagens da MailBox", function(){
        var totalMensagens = mailBox.totalMessages();
        mailBox.sendMessage();
        expect(mailBox.getCurrentMessage()).toBeNull();
        expect(mailBox.totalMessages()).toBeGreaterThan(totalMensagens);
    });

    describe("Suite de Leitura e verificação da existência por id das mensagens na MailBox", function(){

        it("Isto deverá verifica se existe uma mensagem com o ID 31", function(){
            mailBox.setCurrentMessageWithId(31);
            expect(mailBox.getCurrentMessage()).not.toBeNull();
        });

        it("Isto deverá ler a mensagem de id 31", function(){
            mailBox.openMessage(31);
            expect(mailBox.getCurrentMessage()).toBeStatusExists(READ);
        });
    });

    describe("Suite de Busca de Mensagens", function(){

        it("Isto deverá busca por mensagens, no objeto mailBox, que tem no corpo do e-mail a frase 'que foi recebido'", function(){
            var lista = mailBox.find("que foi recebido", [CONTENT]);
            expect(lista.length).toBeGreaterThan(0);
        });

        it("Isto deverá verificar se a função 'spyOn' do Jasmine funcionou corretamente na função delete do objeto 'mailBox'", function(){
            spyOn(mailBox, "delete").and.callFake(function(){
                return "deletado";
            });
            //Apenas para confirmar chamada fake ocorreu
            console.log(mailBox.delete(1))
            expect(mailBox.delete).toHaveBeenCalled();
        });

        it("Deverá executar a função de remover o ID 31", function(){
            mailBox.delete(31);
            mailBox.setCurrentMessageWithId(31);
            expect(mailBox.getCurrentMessage()).toBeNull();
        });

        it("Isto deverá buscar por 'Email-' no assunto do email e deverá conter 4 mensagens na lista retornada", function(){
            var lista = mailBox.find("Email-", [SUBJECT]);
            expect(lista.length).toBe(4);
        });

    });
});