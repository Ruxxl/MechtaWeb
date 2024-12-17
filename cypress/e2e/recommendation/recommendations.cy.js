import generalPageObject from "../../integration/pageObjects/general";
import recommendations from "../../integration/pageObjects/recommendations/recommendations";

describe('Тест раздела рекомендации', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
    });

    // Создаем объект для работы с элементами общей страницы
    const General = new generalPageObject();
    // Создаем объект для работы с элементами и запросами раздела рекомендаций
    const Recommendations = new recommendations();

    // Базовый URL, указанный в переменных окружения
    const baseUrl = Cypress.env('baseUrl');
    // URL страницы избранного
    const favorites_page = 'https://www.mechta.kz/favorites/';
    // URL страницы товара
    const product_page = 'https://www.mechta.kz/product/telefon-sotovyy-apple-iphone-14-plus-256gb-starlight/';
    // URL страницы сравнения
    const compare_page = 'https://www.mechta.kz/compare/';

    it('Проверка на главной странице', () => {
        // Устанавливаем перехват для API-запроса рекомендаций
        Recommendations.request;

        // Открываем главную страницу
        cy.visit(baseUrl);

        // Закрываем попап выбора города, если он отображается
        General.chooseCityPopUp.click();

        // Ожидаем выполнения API-запроса рекомендаций для главной страницы
        Recommendations.wait_request_homePage;
    });

    it('Проверка в карточке товара', () => {
        // Устанавливаем перехват для API-запроса рекомендаций
        Recommendations.request;

        // Открываем страницу товара
        cy.visit(product_page);

        // Нажимаем на элемент, связанный с рекомендациями (например, иконка)
        cy.get('.flex > .cursor-pointer > .q-icon').click();

        // Ожидаем выполнения API-запроса рекомендаций для страницы товара
        Recommendations.wait_request_itemPage;

        // Проверяем, что блок "Похожие товары" отображается
        cy.contains('Похожие товары').should('be.visible');
        // Проверяем, что блок "Сопутствующие товары" отображается
        cy.contains('Сопутствующие товары').should('be.visible');
    });

    it('Проверка в Избранное', () => {
        // Устанавливаем перехват для API-запроса рекомендаций
        Recommendations.request;

        // Открываем страницу избранного
        cy.visit(favorites_page);

        // Закрываем попап выбора города, если он отображается
        General.chooseCityPopUp.click();

        // Ожидаем выполнения API-запроса рекомендаций для страницы избранного
        Recommendations.wait_request_favorites_page;
    });

    it('Проверка в Cравнении', () => {
        // Устанавливаем перехват для API-запроса рекомендаций
        Recommendations.request;

        // Открываем страницу сравнения
        cy.visit(compare_page);

        // Закрываем попап выбора города, если он отображается
        General.chooseCityPopUp.click();

        // Ожидаем выполнения API-запроса рекомендаций для страницы сравнения
        Recommendations.wait_request_comparePage;
    });
});
