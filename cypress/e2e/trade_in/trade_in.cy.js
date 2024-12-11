import generalPageObject from "../../integration/pageObjects/general";
import authorizationPage from "../../integration/pageObjects/authorization/auth_positive";

describe('Тест на trade-in', () => {
    // Создаем новый объект общей страницы
    const General = new generalPageObject();
    // Базовый URL из переменных окружения
    const baseUrl = Cypress.env('baseUrl');
    const AuthorizationPage = new authorizationPage();
    // Базовый URL из настроек окружения


    it('Оформление заказа с товаром Trade-IN', () => {
        cy.intercept('GET', 'https://www.mechta.kz/api/v2/catalog?properties*')
            .as('catalog_item');
        cy.intercept('GET', 'https://www.mechta.kz/api/v2/product/telefon-sotovyy-apple-iphone-14-plus-256gb-starlight*')
            .as('selectProduct')
        cy.intercept('POST', 'https://mm.breezyx.space/api/v1/calc/register')
            .as('breezyxRegister')
        cy.intercept('POST', 'https://mm.breezyx.space/api/v1/calc/question')
            .as('breezyxQuestions')
        cy.intercept('POST', 'https://mm.breezyx.space/api/v1/calc/imei')
            .as('breezyxImei')
        cy.intercept('POST', 'https://www.mechta.kz/api/v2/trade-in/send-form')
            .as('sendForm')
        cy.visit(baseUrl);

        // Шаг 2: Закрываем поп-ап выбора города
        General.chooseCityPopUp.click();

        // Шаг 3: Переходим в личный кабинет через соответствующую кнопку
        AuthorizationPage.userCabinetButton.click();

        // Шаг 4: Вводим номер телефона
        AuthorizationPage.mobile_input.type('70000000000');

        // Шаг 5: Нажимаем кнопку получения СМС-кода
        AuthorizationPage.get_sms_button.click();

        // Шаг 6: Проверяем, что поле ввода СМС-кода отображается, и вводим код
        AuthorizationPage.sms_input.should('be.visible')
            .type('0000');

        // Шаг 7: Проверяем, что сообщение об успешной авторизации отображается
        AuthorizationPage.auth_success.should('be.visible');

        // Шаг 8: Переходим в кабинет пользователя
        AuthorizationPage.link_cabinet.click();

        // Шаг 9: Проверяем, что URL кабинета корректен
        cy.url().should('eq', 'https://www.mechta.kz/cabinet/')
            .as('Ссылка отображается корректно');
        // Шаг 1: Переходим на страницу товара
        cy.visit('https://www.mechta.kz/section/apple-eql/');

        General.chooseCityPopUp.click();

        cy.wait('@catalog_item').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем значение code из цепочки
            const itemTradeIn = interception.response.body.data?.items[0]?.id
            const itemCodeName = interception.response.body.data?.items[0]?.code
            const tradeInParam = interception.response.body.data?.items[0]?.stickers['trade-in-aktsiya']?.name;
            cy.log(`Trade-IN sticker: ${tradeInParam}`);
            cy.log(`Item trade-in ID: ${itemTradeIn}`)
            cy.log(`Item Code: ${itemCodeName}`)

            // Сохраняем значение для дальнейшего использования
            cy.wrap(tradeInParam).as('tradeInName');
            cy.wrap(itemTradeIn).as('itemID');
            cy.wrap(itemCodeName).as('itemCode');
        });

        // Пример использования сохраненного значения
        cy.get('@itemID').then((id) => {
            cy.get(`[data-id="${id}"]`).first().click(); // Используем сохраненный ID для селектора
            cy.log(`Clicked on product with ID: ${id}`);
        });
        cy.wait(1000)
        cy.get('@itemCode').then((itemCodeName) => {
            cy.url().then((currentUrl) => {
                // Проверяем наличие "/product/" в URL
                expect(currentUrl).to.include('/product/');

                // Извлекаем часть после /product/
                const urlItemName = currentUrl.split('/product/')[1]?.split('/')[0];
                expect(urlItemName).to.exist.and.to.be.a('string'); // Убедимся, что urlItemName существует

                // Сравниваем с сохраненным названием
                expect(urlItemName).to.eq(itemCodeName);
                cy.log(`Название в URL (${urlItemName}) совпадает с названием товара (${itemCodeName})`);
            });
        });

        cy.wait('@selectProduct').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);

            // Извлекаем значение code из цепочки
            const productId = interception.response.body.data.id
            const productStickers = interception.response.body.data.stickers['trade-in-aktsiya']?.name;
            cy.get('@itemID').then((id) => {
                expect(productId).have.eq(id)
            });
            cy.get('@tradeInName').then((name) => {
                expect(productStickers).have.eq(name)
            });
        });

        cy.get('span').contains('Купить в Trade-in').click();
        cy.get('div').contains('Оцените ваше устройство').should('be.visible')

        //Кликнули по Бренд
        cy.get('#vs1__combobox').click();
        //Кликнули по Apple
        cy.get('#vs1__option-0').click()
        //Кликнули по категории
        cy.get('#vs2__combobox').click()
        //Выбрали Iphone
        cy.get('#vs2__option-4').click()
        //кликнули по Модель
        cy.get('#vs3__combobox').click()
        //выбрали первый из списка
        cy.get('#vs3__option-0').click()
        //Кликнули по Память
        cy.get('#vs4__combobox').click()
        //выбрали первый из списка
        cy.get('#vs4__option-0').click()
        //Кликнули по Цвет
        cy.get('#vs5__combobox').click()
        //выбрали первый из списка
        cy.get('#vs5__option-0').click()

        cy.wait('@breezyxRegister').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.quiz_results_continue').click();

        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get('button').contains('Да').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220710080159643307"]').click();
        cy.get('.button.next').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220218125305042250"]').click();
        cy.get('.button.next').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217173644916828"]').click();
        cy.get('.button.next').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217174804356486"]').click();
        cy.get('.button.next').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217175708568051"]').click();
        cy.get('.button.next').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[value="220217180611811298"]').click();
        cy.get('.button.next').click();
        cy.wait('@breezyxQuestions').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.imei').should('have.text', 'IMEI вашего устройства');

        cy.get('input[name="device_imei"]').type('11111111111111')
        cy.get('button[class="apply"]').should('be.visible').click()
        cy.wait('@breezyxImei').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get('input[aria-label="ФИО"]').type('Исин Руслан')
        cy.get('input[aria-label="Номер телефона"]').type('77475776440')
        cy.get('span[class="block"]').contains('Оформить заказ').click()

        cy.contains('Ваши данные успешно сохранены').should('be.visible')
        cy.contains('Ожидайте, наши операторы скоро свяжутся с вами').should('be.visible')

        cy.wait('@sendForm').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.result).to.eq(true)
        });
    });
});
