class authorizationPage {

    selectCountry(){
        this.selectCountryPopup.click()
    }

    get userCabinetButton(){
        return cy.get('#user-cabinet-profile')
    }

    get mobile_input() {
        return cy.get('#mobile-input')
    }

    get get_sms_button() {
        return cy.get('#get-sms-button')
    }

    get sms_input() {
        return cy.get ('#sms-input')

    }

    get auth_success() {
        return cy.contains('Авторизация прошла успешно')
    }

    get link_cabinet(){
        return cy.get('#user-cabinet-profile')
    }

    get request() {
        return cy.intercept('GET', '**/api/v2/user')
            .as('user') // Назначаем alias для отслеживания запросов
    }

    get wait_request_login() {
        cy.wait('@user').then((interception) => {
            // Проверяем, что запрос завершился успешно
            expect(interception.response.statusCode).to.eq(200);

            // Получаем данные из ответа
            const authorized = interception.response.body.data.authorized

            // Проверяем корректность данных
            expect(authorized).to.eq(true);
        });
    }
}

export default authorizationPage;