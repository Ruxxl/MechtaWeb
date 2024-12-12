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
require('cypress-xpath')
Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'https://www.mechta.kz/api/v2/login', // Замените на URL вашего API
        body: {
            phone: '0000000000',
            sms_code: '0000',
        },
    }).then((response) => {
        expect(response.status).to.eq(200); // Убедитесь, что запрос успешен
    });
});