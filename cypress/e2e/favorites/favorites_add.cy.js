import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";
import favorites from "../../integration/pageObjects/favorites/favorites";

describe('Test basket', () => {
    // Шаг 1: Создаем экземпляры объектов страницы для работы с Checkout, General и Favorites
    const Checkout = new checkout();
    const General = new generalPageObject();
    const Favorites = new favorites();

    // Шаг 2: Получаем базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    it('add to cart', () => {
        // Шаг 4: Переходим на сайт с базовым URL
        cy.visit(baseUrl);

        // Шаг 5: Закрываем pop-up с выбором города
        General.chooseCityPopUp.click();

        // Шаг 6: Перехватываем запросы, связанные с каталогом и избранным
        cy.intercept('GET', '**/api/v2/catalog*').as('catalogRequest');  // Перехват запросов на каталог товаров
        cy.intercept('POST', '**/api/v1/favorites').as('favorites_add_request');  // Перехват запроса на добавление в избранное
        cy.intercept('GET', '**/api/v1/favorites').as('favoritesRequest');  // Перехват запроса на получение избранного

        // Шаг 7: Переходим в категорию "iPhone"
        Checkout.iphone_category.click();

        // Шаг 8: Проверяем, что перешли на страницу с товарами Apple
        Checkout.check_text.should('be.visible').and('contain', 'APPLE');

        // Шаг 9: Работа с избранным
        Favorites.selectFirstItem();  // Шаг 9.1: Выбираем первый товар из списка
        Favorites.addToFavorites();  // Шаг 9.2: Добавляем товар в избранное
        Favorites.verifyAddToFavorites();  // Шаг 9.3: Проверяем, что товар был добавлен в избранное
        Favorites.verifyFavoritesAPI();  // Шаг 9.4: Проверяем через API, что товар действительно в избранном
        Favorites.checkFavoritesPage();  // Шаг 9.5: Проверяем отображение товара на странице избранного
    });
});
