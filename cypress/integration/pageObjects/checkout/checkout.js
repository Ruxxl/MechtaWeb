class Checkout {
    // Метод для получения категории iPhone
    get iphone_category() {
        cy.visit('https://mechta.kz/section/smartfony/brend-apple/')
        cy.url()
            .should('include', '/section/smartfony/brend-apple');
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

            cy.get(`[data-id = ${firstItemId}]`).click();  // Поиск кнопки с id и клик
            cy.wait(7000)
            cy.contains('В корзину').click()
            cy.contains('Перейти в корзину').click()

            //cy.get(`button[data-id = ${firstItemId}]`).click()
            cy.wait(3000)// Поиск кнопки с id и клик
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

    get continue_button_info() {
        return cy.get('#button-steps-info')
    }

    get smsCode_input() {
        return cy.contains('Код из SMS')
    }

    get delivery_input(){
        return cy.contains('Улица*').type('Аркалык 46')
    }

    get continue_button_next(){
        return cy.get('#button-steps-next')
    }


    get payments_info(){
        cy.wait('@checkout_v1').then((interception) => {
            // Сохраняем данные paymentinfo
            this.paymentMethodsId = interception.response.body.data.payment_info.variants[0].id
            this.paymentMethodsName = interception.response.body.data.payment_info.variants[0].name
            this.delivery_paymentId = interception.response.body.data.payment_info.variants[4].id
            this.delivery_paymentName = interception.response.body.data.payment_info.variants[4].name
            cy.log(this.delivery_paymentId, this.delivery_paymentName)
            if (this.paymentMethodsName === "Kaspi QR") {
                // Сохраняем имя в переменную, если оно соответствует "Kaspi QR"
                this.KaspiQr = this.paymentMethodsName;

                cy.log('Способ оплаты сохранён:', this.KaspiQr);
            } else {
                // Если имя не совпадает, выводим сообщение
                cy.log('Способ оплаты не найден или имя не совпадает с "Kaspi QR"');
            }

            if (this.delivery_paymentName === "Наличными курьеру") {
                // Сохраняем имя в переменную, если оно соответствует "Наличными курьеру"
                this.delivery_cash_payment = this.delivery_paymentName;

                cy.log('Способ оплаты сохранён:', this.delivery_cash_payment);
            } else {
                // Если имя не совпадает, выводим сообщение
                cy.log('Способ оплаты не найден или имя не совпадает с "Наличными курьеру"');
            }
        });
    }

    get default_payment_type(){
        cy.then(() => {
            cy.get(`div[id="${this.paymentMethodsId}"]`)
                .should('be.visible')
                .find('div[role="radio"]') // Ищем дочерние div
                .should('have.attr', 'aria-checked', 'true');
        })
    }

    get selectCashOnDeliveryPayment(){
        cy.then(() => {
            cy.get(`div[id="${this.delivery_paymentId}"]`)
                .should('be.visible')
                .find('div[role="radio"]') // Ищем дочерние div
                .should('have.attr', 'aria-checked', 'false').as('Отображается не выбранным')
                .click()
                .should('have.attr', 'aria-checked', 'true').as('Отображается выбранным')
        })
    }

    get order_complete_button(){
        return cy.get('#button-order-confirmation')
    }

    get getCheckout_Id(){
        cy.wait('@checkout_done').then((interception) => {
            // Сохраняем данные paymentinfo
            this.checkout_finish_id = interception.response.body.data.id
            cy.log(this.checkout_finish_id).as('Получен ID заказа')
        })
    }

}

export default Checkout;
