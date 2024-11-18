class Checkout {
    // Метод для получения категории iPhone
    get iphone_category() {
        return cy.contains('Apple iPhone');
    }

    // Метод для получения текста на странице
    get check_text() {
        return cy.get('h1');
    }

    get FirstItem(){
        cy.wait('@catalogRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем ID первого элемента
            const firstItemId = interception.response.body.data.items[0].id;
            const firstItemName = interception.response.body.data.items[0].name;
            cy.log(firstItemName)

            // Логируем ID для проверки
            cy.log('Первый ID из items: ', firstItemId);

            // Проверка, что ID существует
            expect(firstItemId).to.exist;

            // Клик по элементу с полученным ID
            cy.get(`[data-id="${firstItemId}"]`)
                .first().should('be.visible')
                .trigger('mouseover')

            cy.get(`button[data-id = ${firstItemId}]`).click();  // Поиск кнопки с id и клик
            cy.wait(1000)
            cy.get(`button[data-id = ${firstItemId}]`).click()
            cy.wait(1000)// Поиск кнопки с id и клик
            cy.get('.cursor-pointer > .q-icon').first().click()
            cy.contains(`${firstItemName}`).should('be.visible')

        });
    }

    get checkout_button(){
        return cy.get('#buttonCheckout')
    }

    get check_url_checkout(){
        cy.url().should('eq', 'https://www.mechta.kz/checkout/');
        cy.contains('Оформление заказа').should('be.visible')
    }

    get checkValidate_Input() {
        cy.contains('Получить код').click()
        cy.contains('Введите ваш номер').should("be.visible")
            .as('Отображается ошибка "Номер не введен"')
    }

    get auth_success_check() {
        cy.get('[aria-label="ФИО*"]').should('be.visible').as('Поле ФИО отображается')
        cy.get('[aria-label="Электронная почта"]').should('be.visible').as('Поле с почтой отображается')
        cy.contains('Продолжить').should("be.visible").as('Кнопка "Продолжить" отображается')
    }

    get checkText_in_checkout(){
        cy.contains('Личная информация').should("be.visible").as('Поле "Личный кабинет')
        cy.contains('Способ доставки').should("be.visible").as('Поле "Способ доставки"')
        cy.contains('Способ оплаты').should("be.visible").as('Поле "Способ оплаты"')
        cy.contains('Подтверждение заказа').should("be.visible").as('Поле "Подтверждение заказа"')
    }


}

export default Checkout;
