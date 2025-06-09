class ProductAddToCart {

    get iphone_category() {
        cy.visit('https://mechta.kz/section/smartfony/brend-apple/')
        cy.url()
            .should('include', '/section/smartfony/brend-apple');
        cy.get('h1');
    }

    get check_text_h1(){
        cy.get('h1').should('be.visible')
            .and('contain', 'Смартфоны, мобильные телефоны');
        cy.wait(4000)
    }

    get addToCart() {
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

            cy.get(`[data-id = ${firstItemId}]`).click();  // Поиск кнопки с id и клик
            cy.wait(7000)
            cy.get(':nth-child(4) > div[carousel-name=""] > .tw-flex > :nth-child(1) > .q-btn').click()
            cy.contains('Перейти в корзину').click()

            //cy.get(`button[data-id = ${firstItemId}]`).click()
            cy.wait(7000)// Поиск кнопки с id и клик
            cy.contains(`${firstItemName}`).should('be.visible')

        });
    }
}
export default ProductAddToCart;
