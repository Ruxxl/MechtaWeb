import home_page from "../../integration/pageObjects/home_page/home_page";

describe('Тест главной страницы', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
    });

    const Home_page = new home_page()

    // Базовый URL, указанный в переменных окружения
    const baseUrl = Cypress.env('baseUrl');

    it('Проверка главной страницы', () => {

        Home_page.requests_in_home_page

        cy.visit(baseUrl).wait(3000)

        cy.get('.flex > .cursor-pointer > .q-icon').click()

        Home_page.wait_user_request

        Home_page.wait_header_info_request

        Home_page.wait_header_city_request

        Home_page.wait_basket_request

        Home_page.wait_header_menu_request

        Home_page.wait_post_recommendations_request

        Home_page.wait_populars_request

        Home_page.wait_popular_categories_request

        Home_page.wait_favorites_request

        Home_page.wait_mindbox_catalog_request

        Home_page.wait_compare_small_request

        Home_page.wait_brandzone_template_request

        Home_page.wait_viewed_products_request

        Home_page.link_page_check

        Home_page.header_logo_check

        Home_page.popular_categories_check

        Home_page.smartphone_and_gadgets

        Home_page.notebook_and_computer

        Home_page.games_and_console

        Home_page.branzone_check

        Home_page.actions_and_news_check

    });
});
