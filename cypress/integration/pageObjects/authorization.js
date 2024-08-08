class authorizationPage {
    get selectCountryPopup(){
        return cy.get('.justify-between > .cursor-pointer > .q-icon')
    }

    selectCountry(){
        this.selectCountryPopup.click()
    }

    get userCabinetButton(){
        return cy.contains('Личный кабинет')
    }

    userCabinet(){
        this.userCabinetButton.click()
    }

    get SignOutSignInText(){
        return cy.contains('Вход/Регистрация')
    }

    get EnterPhoneNumber(){
        return cy.contains('Введите номер телефона, чтобы получать бонусы и следить за заказами')
    }

    get inputPhoneNumber(){
        return cy.xpath('//input[@placeholder=\'Мобильный телефон\']')
    }

    phoneNumberText(phoneNumber){
        this.inputPhoneNumber.type(phoneNumber)
    }

    get SendSmsCodeButton(){
        return cy.xpath('//span[@class=\'block\'][contains(.,\'Получить код\')]')
    }

    get authorizationSuccess(){
        return cy.contains('Авторизация прошла успешно')
    }
}

export default authorizationPage;