import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Авторизация с корректными данными', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage();
    const General = new generalPageObject();
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    // Обработка исключений, чтобы игнорировать определенные ошибки, возникающие в процессе теста
    Cypress.on('uncaught:exception', (err) => {
        if (
            err.message.includes('Request failed with status code 400') || // Игнорируем ошибки статуса 400
            err.message.includes("Cannot read properties of undefined (reading 'status')") || // Игнорируем ошибки, связанные с отсутствующими свойствами
            err.message.includes("Cannot read properties of undefined (reading 'add')") // Игнорируем ошибки, связанные с вызовом метода 'add'
        ) {
            return false; // Предотвращаем прерывание теста
        }
        return true; // Все остальные ошибки остаются неконтролируемыми
    });

    it('Ввод номера телефона и смс кода', () => {
        // Шаг 1: Переходим на базовый URL
        cy.visit(baseUrl);

        // Шаг 2: Закрываем поп-ап выбора города
        General.chooseCityPopUp.click();

        // Шаг 3: Переходим в личный кабинет через соответствующую кнопку
        AuthorizationPage.userCabinetButton.click();

        // Шаг 4: Вводим номер телефона
        AuthorizationPage.mobile_input.type('70000000000');

        // Шаг 5: Нажимаем кнопку получения СМС-кода
        AuthorizationPage.get_sms_button.click();

        // Шаг 6: Проверяем, что поле ввода СМС-кода отображается, и вводим код
        AuthorizationPage.sms_input.should('be.visible')
            .type('0000');

        // Шаг 7: Проверяем, что сообщение об успешной авторизации отображается
        AuthorizationPage.auth_success.should('be.visible');

        // Шаг 8: Переходим в кабинет пользователя
        AuthorizationPage.link_cabinet.click();

        // Шаг 9: Проверяем, что URL кабинета корректен
        cy.url().should('eq', 'https://www.mechta.kz/cabinet/')
            .as('Ссылка отображается корректно');
    });
});
