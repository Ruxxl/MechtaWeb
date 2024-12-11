class trade_in {

    // Метод для перехвата запросов
    get intercept_request_url(){
        // Перехватываем запросы на каталог
        cy.intercept('GET', 'https://www.mechta.kz/api/v2/catalog?properties*')
            .as('catalog_item');

        // Перехватываем запросы на выбранный продукт
        cy.intercept('GET', 'https://www.mechta.kz/api/v2/product/telefon-sotovyy-apple-iphone-14-plus-256gb-starlight*')
            .as('selectProduct');

        // Перехватываем POST-запросы для регистрации на Breezyx
        cy.intercept('POST', 'https://mm.breezyx.space/api/v1/calc/register')
            .as('breezyxRegister');

        // Перехватываем POST-запросы для вопросов на Breezyx
        cy.intercept('POST', 'https://mm.breezyx.space/api/v1/calc/question')
            .as('breezyxQuestions');

        // Перехватываем POST-запросы для IMEI на Breezyx
        cy.intercept('POST', 'https://mm.breezyx.space/api/v1/calc/imei')
            .as('breezyxImei');

        // Перехватываем POST-запросы для отправки формы на сайте
        cy.intercept('POST', 'https://www.mechta.kz/api/v2/trade-in/send-form')
            .as('sendForm');
    }

    // Получаем информацию о товаре из ответа на запрос каталога
    get catalog_item(){
        cy.wait('@catalog_item').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем данные товара из ответа
            const itemTradeIn = interception.response.body.data?.items[0]?.id;
            const itemCodeName = interception.response.body.data?.items[0]?.code;
            const tradeInParam = interception.response.body.data?.items[0]?.stickers['trade-in-aktsiya']?.name;

            // Логируем информацию о товаре и Trade-in акции
            cy.log(`Trade-IN sticker: ${tradeInParam}`);
            cy.log(`Item trade-in ID: ${itemTradeIn}`);
            cy.log(`Item Code: ${itemCodeName}`);

            // Сохраняем данные для дальнейшего использования
            cy.wrap(tradeInParam).as('tradeInName');
            cy.wrap(itemTradeIn).as('itemID');
            cy.wrap(itemCodeName).as('itemCode');
        });
    }

    // Выбираем товар на основе ID, полученного ранее
    get selectProduct(){
        cy.get('@itemID').then((id) => {
            // Кликаем по продукту с соответствующим ID
            cy.get(`[data-id="${id}"]`).first().click();
            cy.log(`Clicked on product with ID: ${id}`);
        });
    }

    // Проверяем URL страницы продукта
    get check_url_product(){
        cy.get('@itemCode').then((itemCodeName) => {
            cy.url().then((currentUrl) => {
                // Проверяем, что URL содержит "/product/"
                expect(currentUrl).to.include('/product/');

                // Извлекаем часть URL после "/product/"
                const urlItemName = currentUrl.split('/product/')[1]?.split('/')[0];

                // Проверяем, что название товара в URL совпадает с сохраненным
                expect(urlItemName).to.exist.and.to.be.a('string');
                expect(urlItemName).to.eq(itemCodeName);
                cy.log(`Название в URL (${urlItemName}) совпадает с названием товара (${itemCodeName})`);
            });
        });
    }

    // Проверяем данные продукта после его выбора
    get check_product(){
        cy.wait('@selectProduct').then((interception) => {
            // Проверяем статус ответа на запрос продукта
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем данные о продукте
            const productId = interception.response.body.data.id;
            const productStickers = interception.response.body.data.stickers['trade-in-aktsiya']?.name;

            // Сравниваем ID продукта и название с сохраненными данными
            cy.get('@itemID').then((id) => {
                expect(productId).have.eq(id);
            });
            cy.get('@tradeInName').then((name) => {
                expect(productStickers).have.eq(name);
            });
        });
    }

    // Кликаем по кнопке "Купить в Trade-in"
    get buy_in_tradeIn(){
        cy.get('span').contains('Купить в Trade-in').click();
        // Проверяем, что форма с оценкой устройства стала видимой
        cy.get('div').contains('Оцените ваше устройство').should('be.visible');
    }

    // Заполняем форму Breezyx для расчета стоимости Trade-in
    get breezyxForm(){
        // Кликаем по полю выбора бренда и выбираем Apple
        cy.get('#vs1__combobox').click();
        cy.get('#vs1__option-0').click();

        // Выбираем категорию Iphone
        cy.get('#vs2__combobox').click();
        cy.get('#vs2__option-4').click();

        // Выбираем модель из списка
        cy.get('#vs3__combobox').click();
        cy.get('#vs3__option-0').click();

        // Выбираем память
        cy.get('#vs4__combobox').click();
        cy.get('#vs4__option-0').click();

        // Выбираем цвет
        cy.get('#vs5__combobox').click();
        cy.get('#vs5__option-0').click();

        // Ждем ответа на запрос регистрации
        cy.wait('@breezyxRegister').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.quiz_results_continue').click();

        // Ждем ответа на вопросы по товару
        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('button').contains('Да').click();

        // Последовательно выбираем IMEI для товара и нажимаем "Next"
        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220710080159643307"]').click();
        cy.get('.button.next').click();

        // Повторяем процесс для других IMEI
        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220218125305042250"]').click();
        cy.get('.button.next').click();

        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217173644916828"]').click();
        cy.get('.button.next').click();

        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217174804356486"]').click();
        cy.get('.button.next').click();

        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217175708568051"]').click();
        cy.get('.button.next').click();

        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217180611811298"]').click();
        cy.get('.button.next').click();

        // Проверяем текст на странице
        cy.wait('@breezyxQuestions').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.imei').should('have.text', 'IMEI вашего устройства');

        // Вводим IMEI устройства и подтверждаем
        cy.get('input[name="device_imei"]').type('11111111111111');
        cy.get('button[class="apply"]').should('be.visible').click();

        // Ждем подтверждения от Breezyx
        cy.wait('@breezyxImei').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        // Вводим данные пользователя и оформляем заказ
        cy.get('input[aria-label="ФИО"]').type('Исин Руслан');
        cy.get('input[aria-label="Номер телефона"]').type('77475776440');
        cy.get('span[class="block"]').contains('Оформить заказ').click();

        // Проверяем успешное сохранение данных
        cy.contains('Ваши данные успешно сохранены').should('be.visible');
        cy.contains('Ожидайте, наши операторы скоро свяжутся с вами').should('be.visible');

        // Ждем ответа на отправку формы
        cy.wait('@sendForm').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.result).to.eq(true);
        });
    }
}

export default trade_in;
