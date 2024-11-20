import checkout from "../../integration/pageObjects/checkout";
import generalPageObject from "../../integration/pageObjects/general";

describe('Test checkout', () => {
    // Создаем новый объект страницы авторизации
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

        let itemsName
        cy.wait('@basketRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем ID первого элемента
            itemsName = interception.response.body.data.items[0].name;

            // Логируем ID для проверки
            cy.log('Название товара: ', itemsName);

            // Проверка, что ID существует
            expect(itemsName).to.exist;
        })

        Checkout.checkout_button
            .click()

        Checkout.check_url_checkout

        Checkout.checkText_in_checkout

        cy.contains('Вы не авторизованы')
            .should('be.visible')

        Checkout.checkValidate_Input

        General.mobilePhone_input
            .type('0000000000')

        cy.intercept('POST', '**/api/v2/login')
            .as('user');

        cy.contains('Получить код')
            .click()

        cy.scrollTo('top');

        Checkout.smsCode_input
            .type('0000')

        Checkout.auth_success_check

        Checkout.continue_button.click()

        Checkout.delivery_input

    });
})
