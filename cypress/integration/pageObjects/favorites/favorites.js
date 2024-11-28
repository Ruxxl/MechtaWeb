class favorites {
    get FirstItem(){
        cy.wait('@catalogRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем ID первого элемента
            this.firstItemId = interception.response.body.data.items[0].id;
            this.firstItemName = interception.response.body.data.items[0].name;
            cy.log(this.firstItemName)

            // Логируем ID для проверки
            cy.log('Первый ID из items: ', this.firstItemId);

            // Проверка, что ID существует
            expect(this.firstItemId).to.exist;

            cy.get(`[data-id="${this.firstItemId}"]`)
                .first().should('be.visible')
                .click()
        });
    }

    get favorites_add_button(){
        return cy.contains('В избранное').click()
    }

    get favorites_add_request(){
        cy.wait('@favorites_add_request').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем результат
            const ItemsAdd = interception.response.body.result

            expect(interception.response.body.result).to.eq(true);

        });
    }

    get favorites_info_request() {
        cy.wait('@favoritesRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем результат
            const item_add_info = interception.response.body.data[0].id
            cy.log(item_add_info)
            if (item_add_info === this.firstItemId){
                cy.visit('https://www.mechta.kz/favorites/')
                cy.get('.flex > .cursor-pointer > .q-icon').click()
            }else {
                cy.log('Товара нет в API')
            }
        });
    }

    get check_favoritesPage(){

        cy.log(this.firstItemName)
    }

}
export default favorites;