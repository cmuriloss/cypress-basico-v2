////<reference types="Cypress"/>

describe("Central de Atendimento ao Cliente TAT", () => {
    before('Acesso a página', () => {
      cy.visit("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html");
    });
    
    it("Validação do titulo da página", () => {
      
      cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    });
    //Atividade 1 - Campos obrigatorios e envio de formulario
    it("Selecionar campo - primeiro nome", () => {
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
    });
  
   
  
  });
  