 class BasketAdd {
    get basketRequest() {
        cy.wait('@basketRequest').then((interception) => {
            // Проверка успешности запроса
            expect(interception.response.statusCode).to.eq(200);

            const itemsId = interception.response.body.data.items[0].id;
            expect(itemsId).to.exist;
            const itemsName = interception.response.body.data.items[0].name;
            expect(itemsName).to.exist;
            const itemsPrice = interception.response.body.data.items[0].prices_per_item.base_price;
            expect(itemsPrice).to.exist;
            const formattedPrice = itemsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸';
            const itemsEarnedBonus = interception.response.body.data.items[0].earned_bonus;
            expect(itemsEarnedBonus).to.exist;
            const formattedBonus = `до ${new Intl.NumberFormat('ru-RU').format(itemsEarnedBonus)}`.replace(/\s/g, '\u00A0'); // Неразрывные пробелы
            const itemsEarnedChips = interception.response.body.data.items[0].earned_chips;
            expect(itemsEarnedChips).to.exist;

            //Подефолту кол-во товара 1
            const defaultQuantity = '1'

            //Сравнение дефолтного значения поле количество

            cy.get('td')
                .find(`div[id="${itemsId}-quantity"]`)
                .find('span[class="quantity"]')
                .should('exist')
                .and('have.text', defaultQuantity)
                .as('Наименование товара отображается')
                .invoke('text')

            //Сравнение значение Наименование товара

            cy.get('td')
                .find(`div[id="${itemsId}-name"]`)
                .should('exist')
                .and('have.text', itemsName)
                .as('Наименование товара отображается')
                .invoke('text')


            //Сравнение значение Цена

            cy.get('td')
                .find(`div[id="${itemsId}-price"]`)
                .should('exist')
                .invoke('text')
                .then((text) => {
                    // Убираем разницу в типах пробелов
                    const normalizedText = text.replace(/\s/g, ' ');
                    const normalizedFormattedPrice = formattedPrice.replace(/\s/g, ' ');

                    // Логирование
                    cy.log(`Найденный текст: "${normalizedText}"`);
                    cy.log(`Ожидаемый текст: "${normalizedFormattedPrice}"`);

                    // Сравнение
                    expect(normalizedText.trim()).to.eq(normalizedFormattedPrice.trim());
                });

            //Сравнение значение Бонус

            cy.get('td')
                .find(`div[id="${itemsId}-bonus"]`)
                .should('exist') // Проверяем, что элемент существует
                .invoke('text') // Извлекаем текст из элемента
                .then((text) => {
                    // Логируем текст для отладки
                    cy.log(`Текст из DOM: "${text}"`);
                    cy.log(`Ожидаемое значение: "${formattedBonus}"`);

                    // Извлекаем числовую часть текста
                    const extractedNumber = text.match(/\d+/)?.[0] || ''; // Находим число
                    const expectedNumber = formattedBonus.match(/\d+/)?.[0] || ''; // Находим число в ожидаемом значении

                    // Логируем результаты для проверки
                    cy.log(`Извлечённое число из DOM: "${extractedNumber}"`);
                    cy.log(`Ожидаемое число: "${expectedNumber}"`);

                    // Сравниваем извлечённые числовые части
                    expect(extractedNumber).to.eq(expectedNumber);
                });


            //Сравнение значение Фишки

            cy.get('td')
                .find(`div[id="${itemsId}-chips"]`)
                .should('exist') // Проверяем, что элемент существует
                .invoke('text') // Извлекаем текст из элемента
                .then((text) => {
                    // Логируем найденный текст для отладки
                    cy.log(`Текст из DOM: "${text}"`);

                    // Удаляем знак "+" и пробелы, преобразуем в число
                    const domChips = parseInt(text.replace(/[^\d]/g, ''), 10);

                    // Сравниваем значение с сохраненным числом
                    cy.log(`Значение из API: ${itemsEarnedChips}`);
                    expect(domChips).to.eq(itemsEarnedChips);
                });
        })
    }

    get checkoutButton_click(){
        cy.get('#buttonCheckout').click()
        cy.url()
            .should('include', '/checkout'); // Проверяем, что URL содержит /checkout
    }
}
export default BasketAdd