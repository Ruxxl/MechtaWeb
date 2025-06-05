 class generalPageObject {
     get chooseCityPopUp() {
         return cy.get('body').then($body => {
             if ($body.find('.justify-between > .cursor-pointer > .q-icon').length > 0) {
                 return cy.get('.justify-between > .cursor-pointer > .q-icon');
             } else {
                 // Возвращаем "пустой" cy.wrap(), чтобы не ломать цепочку
                 return cy.wrap(null);
             }
         });
     }


     get mobilePhone_input(){
        return cy.get('[aria-label="Мобильный телефон"]')
    }

}

export default generalPageObject;