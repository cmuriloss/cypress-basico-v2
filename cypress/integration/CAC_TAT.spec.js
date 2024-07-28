////<reference types="Cypress"/>

describe("Central de Atendimento ao Cliente TAT", () => {
  const TRHEE_SECONDS = 3000
  before('Acesso a página', () => {
    cy.visit("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html");
  });
  
  it("Validação do titulo da página", () => {
    
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  //Atividade 1 - Campos obrigatorios e envio de formulario
  it("Selecionar campo - primeiro nome", () => {
    cy.clock();
    cy.get("#firstName")
      .should("be.visible")
      .click()
      .type("Murilo")
      .should("have.value", "Murilo");

    cy.get("#lastName")
      .click()
      .should("be.visible")
      .click()
      .type("Souza")
      .should("have.value", "Souza");

    cy.get("#email")
      .should("be.visible")
      .click()
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com");

    cy.get("#open-text-area")
      .should("be.visible")
      .click()
      .type(
        "Teste dos campos obrigatórios, fazendo validações: validação do campo, validação da escrita no campo e validação do que foi digitado no campo"
      )
      .should(
        "have.value",
        "Teste dos campos obrigatórios, fazendo validações: validação do campo, validação da escrita no campo e validação do que foi digitado no campo"
      )
      .type(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, accusantium, dolore, explicabo non debitis voluptatibus delectus amet veritatis molestias deleniti cumque minus doloribus dolorem excepturi libero? Quas ipsa deleniti explicabo?",
        { delay: 0 }
      );

    cy.get(".button").click();

    //Verificação do mensagem de sucesso
    cy.get(".success").should("be.visible");
    cy.tick(TRHEE_SECONDS)
    cy.get(".success").should("not.be.visible");
  });

  //Atividade 2 - Campos obrigatorios com erro, validação da mensagem de erro
  it("Envio de formulario com e-mail invalido", () => {
    cy.clock()
    cy.get("#firstName")
      .type("Murilo")
      .should("have.value", "Murilo");

    cy.get("#lastName")
      .click().type("Souza")
      .should("have.value", "Souza");

    cy.get("#email")
      .type("teste.teste.com")
      .should("have.value", "teste.teste.com");

    cy.get('#open-text-area')
      .type("teste de mensagem erro")
      .should("have.value", "teste de mensagem erro");

    cy.get(".button").click();

    //Verificação do mensagem de erro
    cy.get(".error").should("be.visible");
    cy.tick(TRHEE_SECONDS)
    cy.get(".error").should("not.be.visible");
  });

  //Atividade 3- Validação campo vazio
  it('Validação campo telefone, validação da mascará numerica', () => {
    cy.get('#phone')
    .type('teste do campo com letras')
    .should('have.value','')
  });

  //Atividade 4- Validação do check do campo telefone e obrigatoriedade
  it("Envio de formulario com e-mail invalido", () => {
    cy.get("#firstName")
      .clear()
      .type("Murilo")
      .should("have.value", "Murilo");

    cy.get("#lastName")
      .clear()
      .click().type("Souza")
      .should("have.value", "Souza");

    cy.get("#email")
      .clear()
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com");

    cy.get('#open-text-area')
      .clear()
      .type("teste de mensagem erro")
      .should("have.value", "teste de mensagem erro");

    cy.get('#phone-checkbox').check()

    cy.get(".button").click();

    //Verificação do mensagem de erro
    cy.get(".error").should("be.visible");
  });

  //Atividade 7- Uso do Cypress Commands
  it('Uso do Cypress Commands', () => {
      cy.wait(3000)
      cy.clearfillMandatoryFieldsAndSubmit()
      cy.get('#phone-checkbox').click()
      cy.fillMandatoryFieldsAndSubmit()
      cy.get(".success").should("be.visible");
  });

  //Seleção de um produto
  it('Selecao de um produto', () => {
    cy.clearfillMandatoryFieldsAndSubmit()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('select').select('YouTube')
  });

  //Seleção do tipo de atendimento - check radio
  it('Selecao de um produto', () => {
    cy.clearfillMandatoryFieldsAndSubmit()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
    cy.get(".button").click()
  });

  //Seleção do tipo de atendimento - check de todos os radio
  it('Selecao de um produto', () => {
    cy.clearfillMandatoryFieldsAndSubmit()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="radio"]')
    .should('have.length',3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
    cy.get(".button").click()
  });

  //Selecionar e deselecionar os campos de checkbox
  it('Selecao do checkbox ', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    cy.get('input[type="checkbox"]')
    .last()
    .uncheck()
    .should('not.be.checked')
  });

  //Usando o select file
  it('Uso do select file', () => {
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      }) 
  });

  //Usando o select file - drag-drop
    it('Uso do select file', () => {
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      }) 
  });

  //Usando o select file - drag-drop
  it('Uso do select file', () => {
    cy.fixture('example.json').as('exampleFile')
    cy.get('input[type="file"]')
    .selectFile('@exampleFile')
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    }) 
});
  it('Validação da mensagem de sucesso e erro', () => {
    cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
  });

  it('Faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  });

  it.only('Visualização do gato!', () => {
      cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  });

});
