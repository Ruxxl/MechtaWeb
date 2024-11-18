import checkout from "../../integration/pageObjects/checkout";
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

        General.chooseCityPopUp.click()

        cy.intercept('GET', '**/api/v2/catalog*')
            .as('catalogRequest');

        Checkout.iphone_category.click()

        Checkout.check_text.should('be.visible')  // Проверяем, что h1 существует и видим
            .and('contain', 'APPLE')

        cy.intercept('GET', '**/api/v1/basket')
            .as('basketRequest');

        Checkout.FirstItem

        BasketAdd.basketRequest

    });
})
