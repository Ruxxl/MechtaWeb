import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";
import auth_negative from "../../integration/pageObjects/authorization/auth_negative";

describe('Авторизация с некорректными данными', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage()
    const AuthorizationNegative = new auth_negative()
    const General = new generalPageObject()
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    Сypress.on('uncaught:exception', (err, runnable) => {
        // Отключаем падение тестов при ошибках, связанных с AxiosError 400
        if (err.message.includes('Cannot read properties of undefined (reading 'add')')) {
            return false; // предотвращает падение теста
        }
    });

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

    it('Ввод неправильного номера телефона', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

        General.chooseCityPopUp.click()

        AuthorizationPage.userCabinetButton.click()

        AuthorizationNegative.uncorrect_mobilePhone

        AuthorizationNegative.viewError_text

        cy.url().should('eq', 'https://www.mechta.kz/')
    });
});
