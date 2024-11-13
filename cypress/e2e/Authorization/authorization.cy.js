import authorizationPage from "../../integration/pageObjects/authorization";

describe('Test Authorization in website', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage()
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    Cypress.on('uncaught:exception', (err, runnable) => {
        // Отключаем падение тестов при ошибках, связанных с AxiosError 400
        if (err.message.includes('Request failed with status code 400')) {
            return false; // предотвращает падение теста
        }
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Отключаем падение тестов при ошибке типа TypeError, связанной с undefined 'status'
        if (err.message.includes("Cannot read properties of undefined (reading 'status')")) {
            return false; // предотвращает падение теста
        }
    });

    it('Sign in', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

        AuthorizationPage.selectCountry()

        AuthorizationPage.userCabinetButton.click()

        AuthorizationPage.mobile_input

        AuthorizationPage.get_sms_button.click()

        AuthorizationPage.sms_input.should('be.visible')

        cy.wait(10000)

        AuthorizationPage.auth_success.should('be.visible')

        cy.wait(3000)

        cy.url().should('eq', 'https://www.mechta.kz/cabinet/')
    });
});
