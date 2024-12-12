import generalPageObject from "../../integration/pageObjects/general";


describe('Тест раздела рекомендации', () => {
    // Создаем новый объект общей страницы
    const General = new generalPageObject();
    // Базовый URL из переменных окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Проверка отображение и API', () => {
        cy.intercept('POST', '**/api/v2/recommendations')
            .as('recommendations')
        cy.visit(baseUrl)

        General.chooseCityPopUp.click()

        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что телефон в ответе совпадает с введенным
            expect(interception.response.statusCode).to.eq(200)
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message
            const page = interception.response.body.data.recommendations[0].page
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id
            cy.log(product_check)
            cy.log(strategyMessage)
            expect(strategyMessage).to.eq('Хиты продаж');
            expect(page).to.eq('home_page');

            cy.contains('Хиты продаж').should('have.text', strategyMessage)
        });
    });
});
