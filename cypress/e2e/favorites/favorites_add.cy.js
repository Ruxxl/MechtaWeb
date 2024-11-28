import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";
import favorites from "../../integration/pageObjects/favorites/favorites";

describe('Test basket', () => {
    const Checkout = new checkout();
    const General = new generalPageObject();
    const Favorites = new favorites();

    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    Cypress.on('uncaught:exception', (err) => {
        if (
            err.message.includes('Request failed with status code 400') ||
            err.message.includes("Cannot read properties of undefined (reading 'status')") ||
            err.message.includes("Cannot read properties of undefined (reading 'add')")
        ) {
            return false;
        }
        return true;
    });

    it('add to cart', () => {
        // Переход на сайт
        cy.visit(baseUrl);

        // Закрываем pop-up с выбором города
        General.chooseCityPopUp.click();

        // Перехват запросов
        cy.intercept('GET', '**/api/v2/catalog*').as('catalogRequest');
        cy.intercept('POST', '**/api/v1/favorites').as('favorites_add_request');
        cy.intercept('GET', '**/api/v1/favorites').as('favoritesRequest');

        // Переход в категорию Apple
        Checkout.iphone_category.click();

        // Проверка, что перешли на правильную страницу
        Checkout.check_text.should('be.visible').and('contain', 'APPLE');

        // Работа с избранным
        Favorites.selectFirstItem();         // Выбираем первый товар
        Favorites.addToFavorites();         // Добавляем товар в избранное
        Favorites.verifyAddToFavorites();   // Проверяем, что товар успешно добавлен
        Favorites.verifyFavoritesAPI();     // Проверяем через API наличие в избранном
        Favorites.checkFavoritesPage();     // Проверяем отображение на странице избранного
    });
});