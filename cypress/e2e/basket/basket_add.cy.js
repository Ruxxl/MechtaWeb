import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";
import basket_add from "../../integration/pageObjects/basketAdd/basket_add";

describe('Test basket', () => {

    const BasketAdd = new basket_add()
    const Checkout = new checkout()
    const General = new generalPageObject

    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    Cypress.on('uncaught:exception', (err) => {
        if (
            err.message.includes('Request failed with status code 400') ||
            err.message.includes("Cannot read properties of undefined (reading 'status')")
        ) {
            return false;
        }
        return true;
    });

    it('add to cart', () => {

        // Переходим на сайт

        cy.visit(baseUrl)

        //Закрываем pop-up с выбором города

        General.chooseCityPopUp.click()

        //Перехватываем запрос catalog

        cy.intercept('GET', '**/api/v2/catalog*')
            .as('catalogRequest');

        //Переход в категорию Apple

        Checkout.iphone_category.click()

        //Проверка что перешли на страницу

        Checkout.check_text.should('be.visible')  // Проверяем, что h1 существует и видим
            .and('contain', 'APPLE')

        //Перехватываем запрос basket

        cy.intercept('GET', '**/api/v1/basket')
            .as('basketRequest');

        //Выбор и добавление товара в корзину

        Checkout.FirstItem

        //Проверка что перешли на страницу корзины

        cy.url()
            .should('include', '/basket'); // Проверяем, что URL содержит /basket

        //Проверка добавление и отображение товара в корзине

        BasketAdd.basketRequest

        //Кликаем и проверяем что перешли в оформление заказа

        BasketAdd.checkoutButton_click

    });
})
