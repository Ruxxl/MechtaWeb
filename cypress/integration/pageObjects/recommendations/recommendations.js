class recommendations {
    // Выбор города
    get request(){
        return cy.intercept('POST', '**/api/v2/recommendations')
            .as('recommendations')
    }

    get wait_request_homePage(){
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
    }

    get wait_request_itemPage(){
        cy.wait('@recommendations').then((interception) => {
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
    }

    get wait_request_favorites_page(){
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
    }

    get wait_request_comparePage(){
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

            cy.contains('Специально для вас').should('be.visible')
        });
    }
}

export default recommendations;
