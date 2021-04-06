// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('go_register', () => {
    cy.visit('/greeter')

    cy.get('button').contains('Cadastrar').click()
    cy.get('form > p').contains('Informe sua data de nascimento').should('be.visible')
})

Cypress.Commands.add('select_date', (year, month, day) => {
    cy.get('.vdatetime-input').scrollIntoView().click()
    cy.get('.vdatetime-popup').should('be.visible')

    cy.get('.vdatetime-year-picker__item').contains(year).click()
    cy.get('.vdatetime-month-picker__item').contains(month).click()
    cy.get('.vdatetime-calendar__month__day').contains(day).click()

    cy.get('button').contains('Avançar').click()

    cy.get('section.sports').should('be.visible')
})

Cypress.Commands.add('select_sport', (sport) => {

    let dynamicRegExp = new RegExp(`^${sport}\\b`, 'i')
    cy.contains(dynamicRegExp).click()

    cy.get('form[style=""]').find('button').contains('Avançar').click()

    cy.get('.form-login').should('be.visible')
})

Cypress.Commands.add('accept_terms', () => {
    cy.get('form[style=""]').find('div[style=""]').find('.checkmark').should(item => item.click())

    cy.get('form[class*=formlogin]').should('be.visible')
})

Cypress.Commands.add('fill_form', () => {
    const faker = require('faker');

    const name = faker.name.findName();
    const apelido = faker.name.firstName();
    const email = faker.internet.email();

    cy.get('form[class*=formlogin]').find('input[placeholder$="nome completo"]').type(name)
    cy.get('form[class*=formlogin]').find('input[placeholder*="seu apelido"]').type(apelido)
    cy.get('form[class*=formlogin]').find('input[placeholder="Seu melhor e-mail"]').type(email)
    cy.get('form[class*=formlogin]').find('input[placeholder="Confirme seu melhor e-mail"]').type(email)
    cy.get('form[class*=formlogin]').find('input[placeholder="Digite sua senha"]').type('123456')
    cy.get('form[class*=formlogin]').find('input[placeholder="Confirme sua senha"]').type('123456')

    cy.get('form[class*=formlogin]').find('button').contains('Cadastrar').click()

    cy.get('input[placeholder*="telefone"]').should('be.visible')
})

Cypress.Commands.add('skip_cellphone', () => {
    cy.visit('/home')

    cy.get('main[class*=dashboard', {timeout: 100000}).should('be.visible')
})