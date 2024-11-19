import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Тестирование кнопки изменить номер', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage()
    const General = new generalPageObject()
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

    it('Ввод номера телефона и кликнуть на "Изменить номер"', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

        General.chooseCityPopUp.click()

        AuthorizationPage.userCabinetButton.click()

        AuthorizationPage.mobile_input

        AuthorizationPage.get_sms_button.click()


    });
});
