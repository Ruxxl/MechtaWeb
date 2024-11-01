import authorizationPage from "../../integration/pageObjects/authorization";

describe('Test Authorization in website', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage()
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    beforeEach(() => {
        // Игнорируем ошибки JavaScript, чтобы тесты не падали
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });

    it('Sign in', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

    });
});
