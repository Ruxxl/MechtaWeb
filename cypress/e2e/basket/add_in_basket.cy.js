import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";
import basket_add from "../../integration/pageObjects/basket/basket_add";
import productAddToCart from "../../integration/pageObjects/productAddToCart";

describe('Test basket', () => {

    const BasketAdd = new basket_add()
    const Checkout = new checkout()
    const General = new generalPageObject
    const ProductAddToCart = new productAddToCart()

    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    it('add to cart', () => {

        cy.intercept('GET', '**/api/v2/catalog*')
            .as('catalogRequest');

        cy.visit(baseUrl)

        ProductAddToCart.iphone_category

        ProductAddToCart.check_text_h1

        ProductAddToCart.addToCart

        BasketAdd.basketRequest


        BasketAdd.checkoutButton_click


    })
})