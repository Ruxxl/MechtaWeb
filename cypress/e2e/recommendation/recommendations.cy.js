import generalPageObject from "../../integration/pageObjects/general";

describe('Тест раздела рекомендации', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
    });

    // Создаем новый объект общей страницы
    const General = new generalPageObject();
    // Базовый URL из переменных окружения
    const baseUrl = Cypress.env('baseUrl');
    const favorites_page = 'https://www.mechta.kz/favorites/'
    const product_page = 'https://www.mechta.kz/product/telefon-sotovyy-apple-iphone-14-plus-256gb-starlight/'
    const compare_page = 'https://www.mechta.kz/compare/'

    it('Проверка на главной странице', () => {
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
            expect(strategyMessage).to.eq('Специально для вас');
            expect(page).to.eq('home_page');
        });
    });

    it('Проверка в карточке товара', () => {
        cy.intercept('POST', '**/api/v2/recommendations')
            .as('recommendations_in_cart_product')
        cy.visit(product_page)

        cy.get('.flex > .cursor-pointer > .q-icon').click()

        cy.wait('@recommendations_in_cart_product').then((interception) => {
            // Проверяем, что телефон в ответе совпадает с введенным
            expect(interception.response.statusCode).to.eq(200)
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message
            const strategyMessage_1 = interception.response.body.data.recommendations[1].strategy_message
            const page = interception.response.body.data.recommendations[0].page
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id
            cy.log(product_check)
            cy.log(strategyMessage)
            expect(strategyMessage).to.eq('Похожие товары');
            expect(strategyMessage_1).to.eq('Сопутствующие товары')
            expect(page).to.eq('item_page');
        });

        cy.contains('Похожие товары').should('be.visible')
        cy.contains('Сопутствующие товары').should('be.visible')

    });

    it('Проверка в Избранное', () => {
        cy.intercept('POST', '**/api/v2/recommendations')
            .as('recommendations')
        cy.visit(favorites_page)

        General.chooseCityPopUp.click()

        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что телефон в ответе совпадает с введенным
            expect(interception.response.statusCode).to.eq(200)
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message
            const page = interception.response.body.data.recommendations[0].page
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id
            cy.log(product_check)
            cy.log(strategyMessage)
            expect(strategyMessage).to.eq('Специально для вас');
            expect(page).to.eq('favorites_page');

            cy.contains('Специально для вас').should('be.visible')
        });
    });

    it('Проверка в Cравнении', () => {
        cy.intercept('POST', '**/api/v2/recommendations')
            .as('recommendations')
        cy.visit(compare_page)

        General.chooseCityPopUp.click()

        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что телефон в ответе совпадает с введенным
            expect(interception.response.statusCode).to.eq(200)
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message
            const page = interception.response.body.data.recommendations[0].page
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id
            cy.log(product_check)
            cy.log(strategyMessage)
            expect(strategyMessage).to.eq('Специально для вас');
            expect(page).to.eq('compare_page');

            cy.contains('Специально для вас').should('be.visible')
        });
    });
});

