/// <reference types="Cypress" />

describe('Registrar usuario', () => {
    it('Fazer registro de usuário válido', () => {
        cy.go_register()        
        cy.select_date('1998', 'Dezembro', '5')
        cy.select_sport('Futebol')
        cy.accept_terms()
        cy.fill_form()
        cy.skip_cellphone()
    })
})