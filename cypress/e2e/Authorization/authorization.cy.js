import authorizationPage from "../../integration/pageObjects/authorization";

describe('Test Authorization in website', () => {
    const AuthorizationPage = new authorizationPage()
    const baseUrl = Cypress.env('baseUrl')
    beforeEach(() => {
        // Настройка для игнорирования ошибок
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });

    it('Sign in', () => {
        cy.visit(baseUrl)
        cy.intercept('POST', '/api/v2/send-sms').as('sendSmsRequest')
        cy.intercept('POST', '/api/v2/user').as('userLogin')
        cy.visit('https://mechta.kz')

        AuthorizationPage.selectCountry()

        AuthorizationPage.userCabinet()

        AuthorizationPage.SignOutSignInText
            .should('be.visible')

        AuthorizationPage.EnterPhoneNumber.should('be.visible')
            .as('Отображается текст')

        AuthorizationPage.phoneNumberText('77475776440')

        AuthorizationPage.SendSmsCodeButton
            .should('be.visible')
            .as('Отображается кнопка получить код').click()

        cy.wait(3000)

        cy.wait('@sendSmsRequest').then((interception) => {
            // Проверяем, что запрос был отправлен
            expect(interception.response.statusCode).to.eq(200) // Статус код ответа
            expect(interception.request.body).to.have.property('phone') // Проверяем, что в запросе есть phoneNumber
            expect(interception.request.body).to.have.property('type')
        })

        AuthorizationPage.authorizationSuccess
            .should('be.visible')

        cy.wait('@userLogin').then((interception) => {
            // Проверяем, что запрос был отправлен
            expect(interception.response.statusCode).to.eq(200) // Статус код ответа
            expect(interception.response.body.data).to.have.property('user_id') // Проверяем, что в запросе есть phoneNumber
        })
    });
});
