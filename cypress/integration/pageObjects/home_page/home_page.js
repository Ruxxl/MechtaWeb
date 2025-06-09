class home_page {

    constructor() {
        this.giftery_card = ''; // Инициализация свойства для хранения значения
    }

    get requests_in_home_page() {
        cy.intercept('GET', '**/api/v2/user').as('user')

        cy.intercept('POST', '**/api/v2/seo/resolve').as('resolve')


        cy.intercept('GET', '**/api/v2/header/info').as('header_info')

        cy.intercept('GET', '**/api/v2/header/menu-catalog').as('menu_catalog')

        cy.intercept('GET', '**/api/v2/basket').as('basket')

        cy.intercept('GET', '**/api/v2/main-page/banners**').as('banners')


        cy.intercept('GET', '**/api/v2/header/popular-categories').as('popular_categories')

        cy.intercept('GET', '**/api/v2/favorites').as('favorites')

        cy.intercept('POST', '**/api/v2/mindbox/actions/catalog').as('mindbox_catalog')

        cy.intercept('GET', '**/api/v2/compare/small').as('compare_small')


        cy.intercept('GET', '**/api/v2/viewed-products/viewed').as('viewed_products')

        cy.intercept('GET', '**/api/v2/news**').as('news')

        cy.intercept('GET', '**/api/v2/main-page/actions**').as('actions')

    }

    get wait_user_request() {
        cy.wait('@user').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_resolve_request() {
        cy.wait('@resolve').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }


    get wait_basket_request() {
        cy.wait('@basket').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_post_recommendations_request() {
        cy.wait('@post_recommendations').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }


    get wait_favorites_request() {
        cy.wait('@favorites').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_mindbox_catalog_request() {
        cy.wait('@mindbox_catalog').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_menu_catalog_request() {
        cy.wait('@menu_catalog').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_compare_small_request() {
        cy.wait('@compare_small').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_viewed_products_request() {
        cy.wait('@viewed_products').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get link_page_check () {
        cy.get('[href="/about/"]').should('be.visible').as(' О компании отображается')
        cy.get('[href="/mechta-shops/"]').should('be.visible').as(' Адреса магазинов отображается')
        cy.get('[href="/faq/"]').should('be.visible').as(' Мечта гид отображается')
        cy.get('[class="dark-mode-switch"]').should('be.visible').as(' Dark mode отображается')
        cy.get('.text-ts3.text-primary').should('be.visible').as(' Выбор города отображается')
        cy.get('#user-cabinet-profile').should('be.visible').as(' Личный кабинет отображается')
        cy.get('[href="/"]').should('be.visible').as(' Лого отображается')

    }

    get header_logo_check() {
        cy.get('.search-input').should('be.visible').as(' Поле поиска отображается')
        //cy.get('[href="/favorites/"]').should('be.visible').as(' Избранное отображается')
        //cy.get('[href="/compare/"]').should('be.visible').as(' Сравнение отображается')

    }

    get popular_categories_check () {
        const expectedLinks = [
            '/gift-cards',
            '/section/kondicionery',
            '/section/noutbuki',
            '/section/smartfony',
            '/section/televizory',
        ];
        cy.get('.q-scrollarea__content').should('exist');

        expectedLinks.forEach((href) => {
            cy.get(`a[href*="${href}"]`)
                .should('be.visible')
                .and('have.attr', 'href')
                .and('include', href);
        });
    }     

    get smartphone_and_gadgets() {
        cy.contains('h2', 'Смартфоны и гаджеты').should('be.visible');
    }

    get notebook_and_computer() {
        cy.contains('h2', 'Ноутбуки и компьютеры').should('be.visible');
    }

    get games_and_console() {
        cy.contains('h2', 'Игры, консоли и развлечения').should('be.visible');
    }

    get branzone_check() {
        cy.get('[aria-label="Visit Samsung"]').should('be.visible')
        cy.get('[aria-label="Visit HONOR"]').should('be.visible')
        cy.get('[aria-label="Visit LG"]').should('be.visible')
        cy.get('[aria-label="Visit Xiaomi"]').should('be.visible')
        cy.get('[aria-label="Visit Apple"]').should('be.visible')
        cy.get('[aria-label="Visit Bosch"]').should('be.visible')
    }

    get viewed_recomendation(){
        cy.contains('Недавно просмотрено').should('be.visible');
    }
}

export default home_page