import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";

describe('Тестирование кнопки изменить номер', () => {
    // Создаем объекты для страницы авторизации и общих элементов
    const AuthorizationPage = new authorizationPage();
    const General = new generalPageObject();
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Ввод номера телефона и кликнуть на "Изменить номер"', () => {
        // Шаг 1: Переходим на сайт
        cy.visit(baseUrl);

        // Шаг 2: Закрываем поп-ап выбора города
        General.chooseCityPopUp.click();

        // Шаг 3: Переходим в личный кабинет через соответствующую кнопку
        AuthorizationPage.userCabinetButton.click();

        // Шаг 4: Вводим номер телефона
        AuthorizationPage.mobile_input.type('77000000000');

        // Шаг 5: Нажимаем кнопку "Получить код"
        AuthorizationPage.get_sms_button.click();

        // Шаг 6: Нажимаем кнопку "Изменить номер"
        cy.get('#changePhone').click().as('Кнопка "Изменить номер" отображается');

        // Шаг 7: Проверяем, что поле для ввода номера телефона снова становится видимым
        cy.get('#mobile-input').should("be.visible");

        // Шаг 8: Проверяем, что текст "Вход/Регистрация" отображается на странице
        cy.contains('Вход/Регистрация').should('be.visible');

        // Шаг 9: Проверяем, что кнопка "Получить код" снова становится доступной
        AuthorizationPage.get_sms_button.should("be.visible")
            .as('Кнопка получить код отображается');
    });
});
