let firstItemId
class Checkout {
    // Метод для получения категории iPhone
    get iphone_category() {
        return cy.contains('Apple iPhone');
    }

    // Метод для получения текста на странице
    get check_text() {
        return cy.get('h1');
    }

    get FirstItem(){
        cy.wait('@catalogRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем ID первого элемента
            const firstItemId = interception.response.body.data.items[0].id;
            const firstItemName = interception.response.body.data.items[0].name;
            cy.log(firstItemName)

            // Логируем ID для проверки
            cy.log('Первый ID из items: ', firstItemId);

            // Проверка, что ID существует
            expect(firstItemId).to.exist;

            // Клик по элементу с полученным ID
            cy.get(`[data-id="${firstItemId}"]`)
                .first().should('be.visible')
                .trigger('mouseover')

            cy.get(`button#${firstItemId}`).click();  // Поиск кнопки с id и клик
            cy.wait(2000)
            cy.get(`button#${firstItemId}`).click();  // Поиск кнопки с id и клик
            cy.contains(`${firstItemName}`).should('be.visible')
        });
    }

    get checkout_button(){
        return cy.get('#buttonCheckout')
    }

    get check_url_checkout(){
        cy.url().should('eq', 'https://www.mechta.kz/checkout/');
        cy.contains('Оформление заказа').should('be.visible')
    }
}

export default Checkout;
