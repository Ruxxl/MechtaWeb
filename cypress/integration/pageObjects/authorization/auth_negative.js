class auth_negative {

    get uncorrect_mobilePhone(){
        return cy.get('#mobile-input').type('66666666666')
    }

    get viewError_text(){
        const textError = 'Введите номер телефона в формате +7 (7XX) XXX-XXXX'
        return cy.get('div[role="alert"]').should('have.text', textError)
            .as('Ошибка отображается')
    }

}

export default auth_negative;