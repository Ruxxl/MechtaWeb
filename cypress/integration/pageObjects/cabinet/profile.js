class profile {

    get intercept_urls(){
        cy.intercept('GET', '**/api/v2/personal/profile/delete-reasons').as('delete_reasons')
    }

    get delete_reasons_api_check(){
        cy.wait('@delete_reasons').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);

            // Проверяем, что статус предзаказа установлен
            const reasons_item = interception.response.body.data.reasons;
        });
    }

}

export default profile 