class home_page {

    constructor() {
        this.giftery_card = ''; // Инициализация свойства для хранения значения
    }

    get requests_in_home_page() {
        cy.intercept('GET', '**/api/v2/user').as('user')

        cy.intercept('GET', '**/api/v2/header/info').as('header_info')

        cy.intercept('GET', '**/api/v2/header/cities').as('header_city')

        cy.intercept('GET', '**/api/v1/basket').as('basket')

        cy.intercept('GET', '**/api/v2/header/menu').as('header_menu')

        cy.intercept('GET', '**/api/v2/main-page/banners**').as('banners')

        cy.intercept('POST', '**/api/v2/recommendations').as('post_recommendations')

        cy.intercept('GET', '**/api/v2/main-page/populars**').as('populars')

        cy.intercept('GET', '**/api/v2/header/popular-categories').as('popular_categories')

        cy.intercept('GET', '**/api/v2/favorites').as('favorites')

        cy.intercept('POST', '**/api/v2/mindbox/actions/catalog').as('mindbox_catalog')

        cy.intercept('GET', '**/api/v2/compare/small').as('compare_small')

        cy.intercept('GET', '**/api/v2/main-page/brandzone-template').as('brandzone_template')

        cy.intercept('GET', '**/api/v2/viewed-products/viewed').as('viewed_products')

    }

    get wait_user_request() {
        cy.wait('@user').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_header_info_request() {
        cy.wait('@header_info').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_header_city_request() {
        cy.wait('@header_city').then((interception) => {
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

    get wait_header_menu_request() {
        cy.wait('@header_menu').then((interception) => {
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

    get wait_populars_request() {
        cy.wait('@populars').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            const smartphone_and_gadget_category = interception.response.body.data[0].name
            const notebook_and_computer = interception.response.body.data[1].name
            const games_and_console = interception.response.body.data[2].name
            cy.wrap(smartphone_and_gadget_category).as('smartphone_and_gadget_category')
            cy.wrap(notebook_and_computer).as('notebook_and_computer')
            cy.wrap(games_and_console).as('games_and_console')
        });
    }


    get wait_popular_categories_request() {
        cy.wait('@popular_categories').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            const giftery_card = interception.response.body.data.popular_categories[0].name
            const notebook = interception.response.body.data.popular_categories[1].name
            const smartphone = interception.response.body.data.popular_categories[2].name
            const tv = interception.response.body.data.popular_categories[3].name

            cy.log(giftery_card, notebook, smartphone, tv)


            cy.wrap(giftery_card).as('giftery_card')
            cy.wrap(notebook).as('notebook')
            cy.wrap(smartphone).as('smartphone')
            cy.wrap(tv).as('tv')


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

    get wait_compare_small_request() {
        cy.wait('@compare_small').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    get wait_brandzone_template_request() {
        cy.wait('@brandzone_template').then((interception) => {
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
        cy.get('[href="/company/about/"]').should('be.visible').as(' О компании отображается')
        cy.get('[href="/mechta-shops/"]').should('be.visible').as(' Адреса магазинов отображается')
        cy.get('[href="/faq/"]').should('be.visible').as(' Мечта гид отображается')
        cy.get('[class="dark-mode-switch"]').should('be.visible').as(' Dark mode отображается')
        cy.get('.text-ts3.text-primary').should('be.visible').as(' Выбор города отображается')
        cy.get('#user-cabinet-profile').should('be.visible').as(' Личный кабинет отображается')
        cy.get('[href="https://www.mechta.kz/"]').should('be.visible').as(' Лого отображается')

    }

    get header_logo_check() {
        cy.get('.search-input').should('be.visible').as(' Поле поиска отображается')
        //cy.get('[href="/favorites/"]').should('be.visible').as(' Избранное отображается')
        //cy.get('[href="/compare/"]').should('be.visible').as(' Сравнение отображается')

    }

    get popular_categories_check () {
        cy.get('@giftery_card').then((giftery_card) => {
            expect(giftery_card).to.eq('Подарочные карты')
            cy.get('div a').contains(giftery_card).should('exist').as( ' Подарочные карты отображаются');
        });

        cy.get('@notebook').then((notebook) => {
            expect(notebook).to.equal('Ноутбуки');
            cy.get('div a').contains(notebook).should('exist').as( ' Ноутбуки отображаются');
        });

        cy.get('@smartphone').then((smartphone) => {
            expect(smartphone).to.equal('Смартфоны');
            cy.get('div a').contains(smartphone).should('exist').as( ' Смартфоны отображаются');
        });

        cy.get('@tv').then((tv) => {
            expect(tv).to.equal('Телевизоры');
            cy.get('div a').contains(tv).should('exist').as( ' Телевизоры отображаются');
        });
    }

    get smartphone_and_gadgets() {
        cy.get('@smartphone_and_gadget_category').then((smartphone_and_gadget_category) => {
            expect(smartphone_and_gadget_category).to.equal('Смартфоны и гаджеты');
            cy.get('div h2').contains(smartphone_and_gadget_category).should('exist').as( ' Смартфоны и гаджеты отображаются');
        });
    }

    get notebook_and_computer() {
        cy.get('@notebook_and_computer').then((notebook_and_computer) => {
            expect(notebook_and_computer).to.equal('Ноутбуки и компьютеры');
            cy.get('div h2').contains(notebook_and_computer).should('exist').as( ' Ноутбуки и компьютеры отображаются');
        });
    }

    get games_and_console() {
        cy.get('@games_and_console').then((games_and_console) => {
            expect(games_and_console).to.equal('Игры, консоли и развлечения');
            cy.get('div h2').contains(games_and_console).should('exist').as( ' Игры, консоли и развлечения отображаются');
        });
    }
}

export default home_page