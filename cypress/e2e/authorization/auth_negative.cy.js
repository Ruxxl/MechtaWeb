import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import generalPageObject from "../../integration/pageObjects/general";
import auth_negative from "../../integration/pageObjects/authorization/auth_negative";

describe('Авторизация с некорректными данными', () => {
    // Создаем объекты страниц
    const AuthorizationPage = new authorizationPage();
    const AuthorizationNegative = new auth_negative();
    const General = new generalPageObject();
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Ввод неправильного номера телефона', () => {

        // Шаг 1: Переходим на сайт
        cy.visit('https://mechta.kz/').wait(7000)

        // Шаг 3: Переходим в личный кабинет через соответствующую кнопку
        AuthorizationPage.userCabinetButton.click();

        // Шаг 4: Выполняем действие с некорректным номером телефона
        AuthorizationNegative.uncorrect_mobilePhone;

        AuthorizationNegative.getSmsButton;

        // Шаг 5: Проверяем отображение ошибки
        AuthorizationNegative.viewError_text;

        // Шаг 6: Проверяем, что URL не изменился (остались на главной странице)
        cy.url().should('eq', 'https://mechta.kz/');
    });
});
