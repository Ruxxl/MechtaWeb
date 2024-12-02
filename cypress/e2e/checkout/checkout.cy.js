import checkout from "../../integration/pageObjects/checkout/checkout";
import generalPageObject from "../../integration/pageObjects/general";

describe('Test checkout', () => {
    // Шаг 1: Создаем новый объект страницы для работы с Checkout и General
    const Checkout = new checkout()
    const General = new generalPageObject

    // Шаг 2: Получаем базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    // Шаг 3: Обрабатываем не пойманные исключения
    Cypress.on('uncaught:exception', (err) => {
        // Игнорируем ошибки с кодом 400 и другие специфичные ошибки
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
        // Шаг 4: Переходим на сайт с базовым URL
        cy.visit(baseUrl)

        // Шаг 5: Ожидаем появления попапа для выбора города и кликаем по нему
        General.chooseCityPopUp.click()

        // Шаг 6: Перехватываем запрос на получение данных каталога товаров
        cy.intercept('GET', '**/api/v2/catalog*')
            .as('catalogRequest');

        // Шаг 7: Кликаем на категорию "iPhone"
        Checkout.iphone_category.click()

        // Шаг 8: Проверяем, что заголовок h1 содержит текст "APPLE" и видим
        Checkout.check_text.should('be.visible')
            .and('contain', 'APPLE')

        // Шаг 9: Перехватываем запрос на получение данных корзины
        cy.intercept('GET', '**/api/v1/basket')
            .as('basketRequest');

        // Шаг 10: Добавляем первый товар в корзину
        Checkout.FirstItem

        let itemsName
        cy.wait('@basketRequest').then((interception) => {
            // Шаг 11: Проверяем успешность запроса корзины
            expect(interception.response.statusCode).to.eq(200);

            // Шаг 12: Извлекаем название первого товара из ответа
            itemsName = interception.response.body.data.items[0].name;

            // Шаг 13: Логируем название товара для проверки
            cy.log('Название товара: ', itemsName);

            // Шаг 14: Проверка, что название товара существует
            expect(itemsName).to.exist;
        })

        // Шаг 15: Переходим к оформлению заказа
        Checkout.checkout_button.click()

        // Шаг 16: Проверяем, что URL страницы оформления заказа правильный
        Checkout.check_url_checkout

        // Шаг 17: Проверяем текст на странице оформления заказа
        Checkout.checkText_in_checkout

        // Шаг 18: Проверяем наличие уведомления "Вы не авторизованы"
        cy.contains('Вы не авторизованы')
            .should('be.visible')

        // Шаг 19: Проверяем, что поле для ввода телефона доступно
        Checkout.checkValidate_Input

        let phone_number = '0000000000'
        // Шаг 20: Вводим номер телефона
        General.mobilePhone_input
            .type(phone_number)

        // Шаг 21: Перехватываем запрос для получения данных пользователя
        cy.intercept('GET', '**/api/v2/user')
            .as('user');

        // Шаг 22: Нажимаем на кнопку "Получить код"
        cy.contains('Получить код')
            .click()

        // Шаг 23: Прокручиваем страницу наверх для удобства
        cy.scrollTo('top');

        // Шаг 24: Вводим код из SMS
        Checkout.smsCode_input
            .type('0000')

        // Шаг 25: Перехватываем запрос на оформление заказа
        cy.intercept('GET', '**/api/v1/checkout').as('checkout_v1');

        // Шаг 26: Ожидаем ответ по запросу пользователя
        cy.wait('@user').then((interception) => {
            // Шаг 27: Проверяем, что номер телефона в ответе совпадает с введенным номером
            expect(interception.response.body.data.phone).to.equal(phone_number);

            // Шаг 28: Проверяем, что пользователь авторизован
            expect(interception.response.body.data.authorized).to.be.true;

            // Шаг 29: Проверяем, что результат выполнения запроса успешный (result = true)
            expect(interception.response.body.result).to.be.true;

            // Шаг 30: Проверяем, что в ответе нет ошибок
            expect(interception.response.body.errors).to.have.length(0);
        });

        // Шаг 31: Проверяем информацию о способах оплаты
        Checkout.payments_info

        // Шаг 32: Проверяем, что авторизация прошла успешно
        Checkout.auth_success_check

        // Шаг 33: Нажимаем кнопку "Продолжить"
        Checkout.continue_button_info.click()

        // Шаг 34: Перехватываем запрос на получение адресов доставки
        cy.intercept('GET', '**/3.0/suggests*').as('suggests');

        // Шаг 35: Вводим адрес для доставки
        Checkout.delivery_input

        // Шаг 36: Ожидаем получения данных по адресам
        cy.wait('@suggests').then((interception) => {
            // Шаг 37: Извлекаем имя первого адреса из ответа
            const firstAdressName = interception.response.body.result.items[0].name;

            // Шаг 38: Кликаем по первому адресу в списке
            cy.contains(firstAdressName).click();
        });

        // Шаг 39: Ждем 2 секунды для стабильности выполнения теста
        cy.wait(2000)

        // Шаг 40: Нажимаем кнопку "Продолжить" для перехода к следующему шагу
        Checkout.continue_button_next.click()

        // Шаг 41: Проверяем, что тип оплаты по умолчанию выбран верно
        Checkout.default_payment_type

        // Шаг 42: Выбираем оплату наличными при доставке
        Checkout.selectCashOnDeliveryPayment

        // Шаг 43: Нажимаем кнопку "Продолжить" для завершения оформления
        Checkout.continue_button_next.click()

        // Шаг 44: Перехватываем запрос на завершение оформления заказа
        cy.intercept('POST', '**/api/v1/checkout').as('checkout_done');

        // Шаг 45: Завершаем оформление заказа
        Checkout.order_complete_button.click()

        // Шаг 46: Получаем ID завершенного заказа
        Checkout.getCheckout_Id
    });
})
