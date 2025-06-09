import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";
import productAddToCart from "../../integration/pageObjects/productAddToCart";

describe('Авторизация в оформлении заказа', () => {
    // Создаем объекты для страницы оформления заказа и общих элементов
    const Checkout = new checkout();
    const General = new generalPageObject();
    const ProductAddToCart = new productAddToCart()

    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Авторизация в оформлении заказа', () => {
        // Шаг 1: Переходим на сайт
        cy.visit(baseUrl).wait(7000)

        // Шаг 3: Перехватываем запрос каталога товаров
        cy.intercept('GET', '**/api/v2/catalog*')
            .as('catalogRequest');

        // Шаг 4: Выбираем категорию iPhone
        ProductAddToCart.iphone_category

        ProductAddToCart.check_text_h1

        cy.intercept('GET', '**/api/v2/basket')
            .as('basketRequest');

        // Шаг 7: Добавляем товар в корзину
        ProductAddToCart.addToCart;
        cy.wait(5000)

        // Шаг 8: Проверяем данные из запроса корзины
        cy.wait('@basketRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); // Проверяем, что статус ответа 200

            // Получаем название первого товара из корзины
            const itemName = interception.response.body?.data?.items?.[0]?.name;
            cy.log(itemName)

            // Логируем название товара
            cy.log('Название товара: ', itemName);
        });

        // Шаг 9: Нажимаем кнопку "Оформить заказ"
        Checkout.checkout_button.click();

        // Шаг 10: Проверяем, что мы перешли на страницу оформления заказа
        Checkout.check_url_checkout;

        // Шаг 11: Проверяем наличие текста на странице оформления заказа
        Checkout.checkText_in_checkout;

        // Шаг 12: Проверяем, что отображается предупреждение о неавторизованном пользователе
        cy.contains('Вы не авторизованы')
            .should('be.visible');

        // Шаг 13: Проверяем валидацию поля для ввода номера телефона
        Checkout.checkValidate_Input;

        // Шаг 14: Вводим номер телефона
        let phone_number = '0000000000';
        General.mobilePhone_input
            .type(phone_number);

        // Шаг 15: Перехватываем запрос получения данных пользователя
        cy.intercept('GET', '**/api/v2/user')
            .as('user');

        // Шаг 16: Нажимаем кнопку "Получить код"
        cy.contains('Получить код').click();

        // Шаг 17: Скроллим наверх для видимости элементов
        cy.scrollTo('top');

        // Шаг 18: Вводим СМС-код
        Checkout.smsCode_input.type('0000');

        // Шаг 19: Проверяем данные ответа после авторизации
        cy.wait('@user').then((interception) => {
            // Проверяем, что телефон в ответе совпадает с введенным
            expect(interception.response.body.data.phone).to.equal(phone_number);

            // Проверяем, что пользователь авторизован
            expect(interception.response.body.data.authorized).to.be.true;

            // Проверяем, что результат успешный и ошибок нет
            expect(interception.response.body.result).to.be.true;
            expect(interception.response.body.errors).to.have.length(0);
        });

        // Шаг 20: Проверяем успешную авторизацию
        Checkout.auth_success_check;
    });
});
