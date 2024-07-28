Cypress._.times(5, function(){
    it('teste a página da politica de privacidade de forma independente', function(){
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})