class authorizationPage {

    selectCountry(){
        this.selectCountryPopup.click()
    }

    get userCabinetButton(){
        return cy.get('#user-profile')
    }

    get mobile_input() {
        return cy.get('#mobile-input').type('77475776440')
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
}

export default authorizationPage;