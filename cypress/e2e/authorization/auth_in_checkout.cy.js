import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";

describe('Авторизация в оформлении заказа', () => {
    // Создаем объекты для страницы оформления заказа и общих элементов
    const Checkout = new checkout();
    const General = new generalPageObject();

    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl');

    // Обработка исключений, чтобы игнорировать определенные ошибки
    Cypress.on('uncaught:exception', (err) => {
        if (
            err.message.includes('Request failed with status code 400') || // Игнорируем ошибки статуса 400
            err.message.includes("Cannot read properties of undefined (reading 'status')") || // Игнорируем ошибки, связанные с отсутствующими свойствами
            err.message.includes("Cannot read properties of undefined (reading 'add')") // Игнорируем ошибки, связанные с вызовом метода 'add'
        ) {
            return false; // Предотвращаем прерывание теста
        }
        return true; // Все остальные ошибки остаются неконтролируемыми
    });

    it('Авторизация в оформлении заказа', () => {
        // Шаг 1: Переходим на сайт
        cy.visit(baseUrl);

        // Шаг 2: Закрываем поп-ап выбора города
        General.chooseCityPopUp.click();

        // Шаг 3: Перехватываем запрос каталога товаров
        cy.intercept('GET', '**/api/v2/catalog*')
            .as('catalogRequest');

        // Шаг 4: Выбираем категорию iPhone
        Checkout.iphone_category.click();

        // Шаг 5: Проверяем, что заголовок страницы отображается и содержит "APPLE"
        Checkout.check_text.should('be.visible')
            .and('contain', 'APPLE');

        // Шаг 6: Перехватываем запрос корзины
        cy.intercept('GET', '**/api/v1/basket')
            .as('basketRequest');

        // Шаг 7: Выбираем первый товар
        Checkout.FirstItem;

        let itemsName; // Переменная для хранения названия товара

        // Шаг 8: Проверяем данные из запроса корзины
        cy.wait('@basketRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); // Проверяем, что статус ответа 200

            // Получаем название первого товара из корзины
            itemsName = interception.response.body.data.items[0].name;

            // Логируем название товара
            cy.log('Название товара: ', itemsName);

            // Убеждаемся, что название существует
            expect(itemsName).to.exist;
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
