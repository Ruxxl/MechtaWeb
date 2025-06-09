import home_page from "../../integration/pageObjects/home_page/home_page";
import recommendations_check from "../../integration/pageObjects/recommendations_check";

describe('Тест главной страницы', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
    });

    const Home_page = new home_page()
    const Recommendations_check = new recommendations_check()

    // Базовый URL, указанный в переменных окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Проверка главной страницы', () => {

        Home_page.requests_in_home_page

        Recommendations_check.recommendations_intercept

        cy.visit(baseUrl).wait(10000)

        Home_page.wait_resolve_request

        Home_page.wait_user_request

        Home_page.wait_basket_request

        Home_page.wait_menu_catalog_request

        Recommendations_check.recommendations_request_check

        Home_page.wait_favorites_request

        Home_page.wait_mindbox_catalog_request

        Home_page.wait_compare_small_request

        Home_page.wait_viewed_products_request

        Home_page.link_page_check

        Home_page.header_logo_check

        Home_page.popular_categories_check

        Home_page.smartphone_and_gadgets

        Home_page.notebook_and_computer

        Home_page.games_and_console

        Home_page.branzone_check

        Home_page.viewed_recomendation

    });
});
