import recommendations_check from "../../integration/pageObjects/recommendations_check";

describe('Тест рекомендации на главной странице', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
        Recommendations_check.recommendations_intercept
    });

    const Recommendations_check = new recommendations_check()

    // Базовый URL, указанный в переменных окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Проверка отображения товаров из рекомендации', () => {

        cy.visit(baseUrl).wait(7000)

        Recommendations_check.recommendations_request_check
    })
})