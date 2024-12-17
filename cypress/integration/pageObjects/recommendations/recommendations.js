class recommendations {
    // Метод для перехвата запросов на получение рекомендаций
    get request() {
        return cy.intercept('POST', '**/api/v2/recommendations')
            .as('recommendations') // Назначаем alias для отслеживания запросов
    }

    // Проверка данных для главной страницы
    get wait_request_homePage() {
        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            // Получаем данные из ответа
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message;
            const page = interception.response.body.data.recommendations[0].page;
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id;

            // Логируем данные для отладки
            cy.log(product_check);
            cy.log(strategyMessage);

            // Проверяем корректность данных
            expect(strategyMessage).to.eq('Специально для вас');
            expect(page).to.eq('home_page');
        });
    }

    // Проверка данных для карточки товара
    get wait_request_itemPage() {
        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            // Получаем данные из ответа
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message;
            const strategyMessage_1 = interception.response.body.data.recommendations[1].strategy_message;
            const page = interception.response.body.data.recommendations[0].page;
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id;

            // Логируем данные для отладки
            cy.log(product_check);
            cy.log(strategyMessage);

            // Проверяем корректность данных
            expect(strategyMessage).to.eq('Похожие товары');
            expect(strategyMessage_1).to.eq('Сопутствующие товары');
            expect(page).to.eq('item_page');
        });
    }

    // Проверка данных для страницы избранного
    get wait_request_favorites_page() {
        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            // Получаем данные из ответа
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message;
            const page = interception.response.body.data.recommendations[0].page;
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id;

            // Логируем данные для отладки
            cy.log(product_check);
            cy.log(strategyMessage);

            // Проверяем корректность данных
            expect(strategyMessage).to.eq('Специально для вас');
            expect(page).to.eq('home_page');
        });
    }

    // Проверка данных для страницы сравнения
    get wait_request_comparePage() {
        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            // Получаем данные из ответа
            const strategyMessage = interception.response.body.data.recommendations[0].strategy_message;
            const page = interception.response.body.data.recommendations[0].page;
            const product_check = interception.response.body.data.recommendations[0].products[0].xml_id;

            // Логируем данные для отладки
            cy.log(product_check);
            cy.log(strategyMessage);

            // Проверяем корректность данных
            expect(strategyMessage).to.eq('Специально для вас');
            expect(page).to.eq('home_page');

            // Проверяем наличие текста на странице
            cy.contains('Специально для вас').should('be.visible');
        });
    }
}

export default recommendations;
