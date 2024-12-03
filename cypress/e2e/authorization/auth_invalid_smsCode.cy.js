import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Тест на неверный ввод смс кода', () => {
    // Создаем объекты для страниц авторизации и общих элементов
    const AuthorizationPage = new authorizationPage();
    const General = new generalPageObject();
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Ввод неверного смс кода', () => {
        // Шаг 1: Переходим на сайт
        cy.visit(baseUrl);

        // Код, который будет введен как неверный
        const enteredSmsCode = '1234';

        // Шаг 2: Закрываем поп-ап выбора города
        General.chooseCityPopUp.click();

        // Шаг 3: Переходим в личный кабинет через кнопку
        AuthorizationPage.userCabinetButton.click();

        // Шаг 4: Вводим номер телефона
        AuthorizationPage.mobile_input.type('77475776440');

        // Шаг 5: Нажимаем кнопку для получения СМС-кода
        AuthorizationPage.get_sms_button.click();

        // Шаг 6: Перехватываем запрос авторизации
        cy.intercept('POST', '**/api/v2/login').as('loginRequest');

        // Шаг 7: Вводим неверный СМС-код и ждем отправки запроса
        AuthorizationPage.sms_input.type(enteredSmsCode).wait(1000);

        // Шаг 8: Ожидаем завершения intercepted-запроса
        cy.wait('@loginRequest').then((interception) => {
            // Проверяем, что сервер вернул статус 400
            expect(interception.response.statusCode).to.eq(400);

            // Получаем текст ошибки из ответа API
            const smsCode = interception.response.body.errors[0];
            cy.log('Текст ошибки из API:', smsCode);

            // Убеждаемся, что текст ошибки соответствует ожидаемому
            expect(smsCode).to.eq('Неверный код подтверждения');

            // Шаг 9: Проверяем отображение ошибки на странице
            cy.get('div[role="alert"]').invoke('text').then((domErrorMessage) => {
                // Логируем текст ошибки из DOM
                cy.log('Текст ошибки на странице:', domErrorMessage);

                // Убеждаемся, что текст в DOM совпадает с текстом из API
                expect(domErrorMessage.trim()).to.eq(smsCode);
            });
        });
    });
});
