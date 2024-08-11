import homePage from "../../integration/pageObjects/homePage";

describe('Test Authorization in website', () => {
    const HomePage = new homepage()
    const baseUrl = Cypress.env('baseUrl')
    beforeEach(() => {
        // Настройка для игнорирования ошибок
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });

    it('Sign in', () => {
        cy.visit(baseUrl)
    })
})