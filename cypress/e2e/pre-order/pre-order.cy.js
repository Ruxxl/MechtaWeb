import pre_order from "../../integration/pageObjects/pre-order/pre_order";
import generalPageObject from "../../integration/pageObjects/general";
import checkout from "../../integration/pageObjects/checkout/checkout";

describe('Тест на предзаказ', () => {
    // Создаем новый объект страницы предзаказа
    const Pre_order = new pre_order();
    // Создаем новый объект общей страницы
    const General = new generalPageObject();
    // Создаем новый объект страницы оформления заказа
    const Checkout = new checkout();
    // Базовый URL из переменных окружения
    const baseUrl = Cypress.env('baseUrl');
    // Ссылка на страницу товара с возможностью предзаказа
    const item_preorder_url = 'https://www.mechta.kz/product/noutbuk-asus-expertbook-p5-p5405csa-nz014714-wqxga-144hzcore-ultra-5-226v-21-ghz16ssd512dos/';
    //Номер телефона
    const phone_number = '0000000000';

    it('Оформление предзаказа', () => {
        // Перехватываем запрос на получение данных товара
        cy.intercept('GET', '**/api/v2/product/noutbuk-asus-expertbook-p5-p5405csa-nz014714-wqxga-144hzcore-ultra-5-226v-21-ghz16ssd512dos?**').as('Pre_order');

        // Шаг 1: Переходим на страницу товара
        cy.visit(item_preorder_url);

        // Шаг 2: Кликаем на иконку (предположительно корзина или другое действие)
        Pre_order.city_select_popup.click()

        // Шаг 3: Ожидаем завершения запроса и проверяем успешность ответа
        Pre_order.checkAPI_preorder_item

        // Шаг 4: Проверяем наличие кнопки "Предзаказ" и кликаем по ней
        Pre_order.preorder_button.should('be.visible')
            .click().wait(1000);

        // Шаг 5: Кликаем по иконке (дополнительное действие)
        Pre_order.city_select_in_checkout.click()

        // Шаг 6: Проверяем валидацию поля для ввода номера телефона
        Checkout.checkValidate_Input;

        // Шаг 7: Вводим номер телефона
        General.mobilePhone_input.type(phone_number);

        // Шаг 8: Перехватываем запрос на получение данных пользователя
        cy.intercept('GET', '**/api/v2/user').as('user');

        // Шаг 9: Нажимаем кнопку "Получить код"
        cy.contains('Получить код').click();

        // Шаг 10: Скроллим наверх для видимости элементов
        cy.scrollTo('top');

        // Шаг 11: Вводим СМС-код для подтверждения
        Checkout.smsCode_input.type('0000');

        // Шаг 12: Ожидаем завершения запроса и проверяем данные ответа
        cy.wait('@user').then((interception) => {
            // Проверяем, что телефон в ответе совпадает с введенным
            expect(interception.response.body.data.phone).to.equal(phone_number);

            // Проверяем, что пользователь авторизован
            expect(interception.response.body.data.authorized).to.be.true;

            // Проверяем успешность результата и отсутствие ошибок
            expect(interception.response.body.result).to.be.true;
            expect(interception.response.body.errors).to.have.length(0);
        });

        // Шаг 13: Проверяем успешную авторизацию
        Checkout.auth_success_check;
    });
});
