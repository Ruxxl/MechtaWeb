import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Тестирование кнопки изменить номер', () => {
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

    it('Ввод номера телефона и кликнуть на "Изменить номер"', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

        General.chooseCityPopUp.click()

        AuthorizationPage.userCabinetButton.click()

        AuthorizationPage.mobile_input

        AuthorizationPage.get_sms_button.click()

        cy.get('#changePhone').click().as('Кнопка "Изменить номер" отображается')

        cy.get('#mobile-input').should("be.visible")


        cy.contains('Вход/Регистрация').should('be.visible')

        AuthorizationPage.get_sms_button.should("be.visible")
            .as('Кнопка получить код отображается')
    });
});
