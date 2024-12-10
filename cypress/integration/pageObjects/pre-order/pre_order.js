class pre_order {

    get city_select_popup(){
        return cy.get('.flex > .cursor-pointer > .q-icon')
    }

    get checkAPI_preorder_item(){
        cy.wait('@Pre_order').then((interception) => {
            // Проверяем, что статус ответа 200
            expect(interception.response.statusCode).to.eq(200);

            // Проверяем, что статус предзаказа установлен
            const preOrderStatus = interception.response.body.data.preorder;
            expect(preOrderStatus).to.eq(true);
            cy.log(preOrderStatus);
        });
    }

    get preorder_button(){
        return cy.contains('Предзаказ')
    }

    get city_select_in_checkout(){
        return cy.get('.cursor-pointer > .q-icon')
    }
}

export default pre_order;