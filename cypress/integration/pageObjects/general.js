class generalPageObject {
    get chooseCityPopUp() {
        return cy.get('.justify-between > .cursor-pointer > .q-icon')
    }
}

export default generalPageObject;