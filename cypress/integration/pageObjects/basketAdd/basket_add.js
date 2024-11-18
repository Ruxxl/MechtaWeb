class BasketAdd {
    get basketRequest() {
        cy.wait('@basketRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            const itemsId = interception.response.body.data.items[0].id;
            expect(itemsId).to.exist;
            const itemsName = interception.response.body.data.items[0].name;
            expect(itemsName).to.exist;
            const itemsPrice = interception.response.body.data.items[0].prices_per_item.base_price;
            expect(itemsPrice).to.exist;
            const formattedPrice = itemsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸';
            const itemsEarnedBonus = interception.response.body.data.items[0].earned_bonus;
            expect(itemsEarnedBonus).to.exist;
            const formattedBonus = `до ${new Intl.NumberFormat('ru-RU').format(itemsEarnedBonus)}`.replace(/\s/g, '\u00A0');
            const itemsEarnedChips = interception.response.body.data.items[0].earned_chips;
            expect(itemsEarnedChips).to.exist;

            cy.contains(itemsName).should('be.visible')
                .as('Наименование товара отображается')
            cy.contains(formattedPrice).should('be.visible')
                .as('Цена товара отображается');

            cy.get('td[class="text-primary"]')// Находим td с атрибутом data-v-bf095b54
                .invoke('text') // Извлекаем текст
                .then((text) => {
                    cy.log(`Текст в td: ${text}`);
                    // Добавьте дополнительные проверки, если нужно
                    expect(text).to.not.be.empty; // Пример проверки, что текст не пустой
                });


        })
    }

    get apiRequest(){
        cy.intercept('GET', '**/api/v1/basket')
            .as('basketRequest');
    }
}
export default BasketAdd