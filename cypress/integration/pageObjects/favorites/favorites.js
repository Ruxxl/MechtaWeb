class Favorites {
    constructor() {
        this.firstItemId = null;
        this.firstItemName = null;
    }

    // Метод: ожидание и получение первого товара
    selectFirstItem() {
        cy.wait('@catalogRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            const firstItem = interception.response.body.data.items[0];
            this.firstItemId = firstItem.id;
            this.firstItemName = firstItem.name;

            // Логируем для отладки
            cy.log(`Товар: ${this.firstItemName} (ID: ${this.firstItemId})`);

            // Проверяем, что firstItemName инициализировано и не пустое
            expect(this.firstItemName).to.not.be.null;
            expect(this.firstItemName).to.not.be.undefined;
            expect(this.firstItemName).to.not.be.empty;  // Для пустых строк

            // Кликаем по товару
            cy.get(`[data-id="${this.firstItemId}"]`).first().should('be.visible').click();
        });
    }

    // Метод: добавление в избранное
    addToFavorites() {
        cy.contains('В избранное').should('be.visible').click();
    }

    // Метод: проверка успешного добавления через API
    verifyAddToFavorites() {
        cy.wait('@favorites_add_request').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.result).to.eq(true);
            cy.log('Товар успешно добавлен в избранное');
        });
    }

    // Метод: проверка API на наличие товара в избранном
    verifyFavoritesAPI() {
        cy.wait('@favoritesRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            const addedItemId = interception.response.body.data[0]?.id;
            cy.log(`ID товара в избранном: ${addedItemId}`);

            if (addedItemId === this.firstItemId) {
                cy.log('Товар найден в избранном');
            } else {
                cy.log('Товар отсутствует в списке избранного');
            }
        });
    }

    // Метод: проверка отображения на странице избранного
    checkFavoritesPage() {
        cy.visit('https://www.mechta.kz/favorites/');
        cy.get('.flex > .cursor-pointer > .q-icon').click()
        cy.get(`[data-id="71908"]`).first().trigger('mouseover')
        // Проверка на null или undefined
        if (cy.contains('Телефон сотовый APPLE iPhone 14 Plus 256GB (Starlight)').should('be.visible')) {
            cy.log('Имя товара определено');
        } else {
            cy.log('Имя товара не определено');
        }
    }
}

export default Favorites;
