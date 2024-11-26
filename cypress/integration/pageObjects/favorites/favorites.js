class favorites {
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
            
        });
    }
}
export default favorites;