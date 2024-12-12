import generalPageObject from "../../integration/pageObjects/general";
import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";
import trade_in from "../../integration/pageObjects/trade-in/trade_in";
import 'cypress-real-events/support';


describe('Тест на trade-in', () => {
    // Создаем новый объект для работы с общей страницей
    const General = new generalPageObject();
    const Trade_in = new trade_in();

    it('Оформление заказа с товаром Trade-IN', () => {
        // Перехватываем необходимые запросы для Trade-in
        Trade_in.intercept_request_url;

        // Шаг 1: Переходим на страницу категории товаров
        cy.visit('https://www.mechta.kz/section/apple-eql/');

        // Выбираем город на странице (если всплывающее окно с городом появляется)
        General.chooseCityPopUp.click();

        // Перехватываем запросы, получаем информацию о товаре для Trade-in
        Trade_in.catalog_item;

        // Выбираем товар на основе полученного ID
        Trade_in.selectProduct;

        // Небольшая пауза, чтобы убедиться, что страница загрузилась
        cy.wait(1000);

        // Проверяем URL товара, который был выбран
        Trade_in.check_url_product;

        // Проверяем соответствие данных товара с тем, что мы выбрали
        Trade_in.check_product;

        // Переходим к разделу покупки товара через Trade-in
        Trade_in.buy_in_tradeIn;

        // Заполняем форму для расчета Trade-in
        Trade_in.breezyxForm;
    });
});
