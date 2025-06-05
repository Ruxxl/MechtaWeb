class auth_negative {

    get uncorrect_mobilePhone(){
        return cy.get('#mobile-input').type('66666666666')
    }

    get getSmsButton(){
        return cy.get('#get-sms-button').click()
    }

    get viewError_text(){
        const textError = 'Только казахстанские номера'
        return cy.get('div[role="alert"]').should('have.text', textError)
            .as('Ошибка отображается')
    }

}

export default auth_negative;