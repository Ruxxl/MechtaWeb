class recommendations_check{

    get recommendations_intercept(){
        cy.intercept('POST', '**/api/v2/recommendations').as('recommendations')
    }

    get recommendations_request_check(){
        cy.wait('@recommendations').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            const firstItem = interception.response.body.data.recommendations[0].products[0].name

            cy.get('#home_page-personalised')
                .find('article')
                .first()
                .find('p')
                .eq(0)// абзац с названием товара
                .invoke('text')
                .then((text) => {
                    const trimmedText = text.trim();

                    // Сравниваем с именем из API
                    expect(trimmedText).to.eq(firstItem);
                });

            const secondItem = interception.response.body.data.recommendations[0].products[1].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(1) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(secondItem);
                });

            const thirditem = interception.response.body.data.recommendations[0].products[2].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(2) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(thirditem);
                });

            const fourItem = interception.response.body.data.recommendations[0].products[3].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(3) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(fourItem);
                });

            const fiveItem = interception.response.body.data.recommendations[0].products[4].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(4) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(fiveItem);
                });

            // Клик по стрелке вправо
            cy.get('#home_page-personalised')
                .find('button')
                .contains('chevron_right')
                .click();


            const sixItem = interception.response.body.data.recommendations[0].products[5].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(5) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(sixItem);
                });

            const sevenItem = interception.response.body.data.recommendations[0].products[6].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(6) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(sevenItem);
                });

            const eightItem = interception.response.body.data.recommendations[0].products[7].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(7) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(eightItem);
                });

            const nineItem = interception.response.body.data.recommendations[0].products[8].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(8) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(nineItem);
                });

            const tenItem = interception.response.body.data.recommendations[0].products[9].name

            cy.get('#home_page-personalised')
                .find('article')
                .eq(9) // <== Второй товар (нумерация с 0)
                .find('p')
                .eq(0) // <== Первый <p> внутри — это название
                .invoke('text')
                .then((actualText) => {
                    expect(actualText).to.eq(tenItem);
                });

        });
    }
}

export default recommendations_check