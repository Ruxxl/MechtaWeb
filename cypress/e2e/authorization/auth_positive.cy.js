import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Авторизация с корректными данными', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage()
    const General = new generalPageObject()
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    Cypress.on('uncaught:exception', (err) => {
        if (
            err.message.includes('Request failed with status code 400') ||
            err.message.includes("Cannot read properties of undefined (reading 'status')") ||
            err.message.includes("Cannot read properties of undefined (reading 'add')")
        ) {
            return false;
        }
        return true;
    });

    it('Ввод номера телефона и смс кода', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

        General.chooseCityPopUp.click()

        AuthorizationPage.userCabinetButton.click()

        AuthorizationPage.mobile_input.type('70000000000')

        AuthorizationPage.get_sms_button.click()

        AuthorizationPage.sms_input.should('be.visible')
            .type('0000')

        AuthorizationPage.auth_success.should('be.visible')

        AuthorizationPage.link_cabinet.click()

        cy.url().should('eq', 'https://www.mechta.kz/cabinet/')
            .as('Ссылка отображается корректно')


    });

    
});