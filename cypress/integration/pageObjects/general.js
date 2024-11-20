class generalPageObject {
    get chooseCityPopUp() {
        return cy.get('.justify-between > .cursor-pointer > .q-icon')
    }

    get mobilePhone_input(){
        return cy.get('[aria-label="Мобильный телефон"]')
    }

}

export default generalPageObject;