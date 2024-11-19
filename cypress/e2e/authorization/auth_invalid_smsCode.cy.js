import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Тест на неверный ввод смс кода', () => {
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

    it('Ввод неверного смс кода"', () => {
        // Переходим на сайт
        cy.visit(baseUrl)

        const enteredSmsCode = '1234'

        General.chooseCityPopUp.click()

        AuthorizationPage.userCabinetButton.click()

        AuthorizationPage.mobile_input

        AuthorizationPage.get_sms_button.click()

        cy.intercept('POST', '**/api/v2/login')
            .as('loginRequest');

        AuthorizationPage.sms_input.type(enteredSmsCode).wait(1000)

        cy.wait('@loginRequest').then((interception) => {

            // Проверка успешности запроса

            expect(interception.response.statusCode).to.eq(400);

            const smsCode = interception.response.body.errors[0]

            cy.log('Текст ошибки из API:', smsCode);

            expect(smsCode).to.eq('Неверный код подтверждения')

            cy.get('div[role="alert"]').invoke('text').then((domErrorMessage) => {

                // Логируем текст из страницы
                cy.log('Текст ошибки на странице:', domErrorMessage);

                // Убеждаемся, что текст в DOM совпадает с текстом из API

                expect(domErrorMessage.trim()).to.eq(smsCode);
            });
        })
    });
});
