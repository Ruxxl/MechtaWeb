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

    // Обработка исключений, чтобы игнорировать определенные ошибки
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

    it('Ввод неправильного номера телефона', () => {
        // Шаг 1: Переходим на сайт
        cy.visit(baseUrl);

        // Шаг 2: Закрываем поп-ап выбора города
        General.chooseCityPopUp.click();

        // Шаг 3: Переходим в личный кабинет через соответствующую кнопку
        AuthorizationPage.userCabinetButton.click();

        // Шаг 4: Выполняем действие с некорректным номером телефона
        AuthorizationNegative.uncorrect_mobilePhone;

        // Шаг 5: Проверяем отображение ошибки
        AuthorizationNegative.viewError_text;

        // Шаг 6: Проверяем, что URL не изменился (остались на главной странице)
        cy.url().should('eq', 'https://www.mechta.kz/');
    });
});
