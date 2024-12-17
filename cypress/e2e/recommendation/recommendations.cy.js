import generalPageObject from "../../integration/pageObjects/general";
import recommendations from "../../integration/pageObjects/recommendations/recommendations";

describe('Тест раздела рекомендации', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
    });

    // Создаем новый объект общей страницы
    const General = new generalPageObject();
    const Recommendations = new recommendations()
    // Базовый URL из переменных окружения
    const baseUrl = Cypress.env('baseUrl');
    const favorites_page = 'https://www.mechta.kz/favorites/'
    const product_page = 'https://www.mechta.kz/product/telefon-sotovyy-apple-iphone-14-plus-256gb-starlight/'
    const compare_page = 'https://www.mechta.kz/compare/'

    it('Проверка на главной странице', () => {
        Recommendations.request

        cy.visit(baseUrl)

        General.chooseCityPopUp.click()

        Recommendations.wait_request_homePage
    });

    it('Проверка в карточке товара', () => {

        Recommendations.request

        cy.visit(product_page)

        cy.get('.flex > .cursor-pointer > .q-icon').click()

        Recommendations.wait_request_itemPage

        cy.contains('Похожие товары').should('be.visible')
        cy.contains('Сопутствующие товары').should('be.visible')

    });

    it('Проверка в Избранное', () => {

        Recommendations.request

        cy.visit(favorites_page)

        General.chooseCityPopUp.click()

        Recommendations.wait_request_favorites_page
    });

    it('Проверка в Cравнении', () => {

        Recommendations.request

        cy.visit(compare_page)

        General.chooseCityPopUp.click()

        Recommendations.wait_request_comparePage
    });
});

