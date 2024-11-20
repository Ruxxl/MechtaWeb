import checkout from "../../integration/pageObjects/checkout";
import generalPageObject from "../../integration/pageObjects/general";

describe('Авторизация в оформлении заказа', () => {
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

    it('Авторизация в оформлении заказа', () => {

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

        let phone_number = '0000000000'
        General.mobilePhone_input
            .type(phone_number)

        cy.intercept('GET', '**/api/v2/user')
            .as('user');

        cy.contains('Получить код')
            .click()

        cy.scrollTo('top');

        Checkout.smsCode_input
            .type('0000')

        cy.wait('@user').then((interception) => {
            // Проверка, что поле phone в данных ответа совпадает с phone_number
            expect(interception.response.body.data.phone).to.equal(phone_number);

            // Проверка, что поле authorized в ответе равно true
            expect(interception.response.body.data.authorized).to.be.true;

            // Дополнительные проверки, если нужно
            expect(interception.response.body.result).to.be.true; // Убедиться, что result = true
            expect(interception.response.body.errors).to.have.length(0); // Проверить, что ошибок нет
        });

        Checkout.auth_success_check
    })
})