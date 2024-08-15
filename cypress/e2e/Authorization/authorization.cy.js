import authorizationPage from "../../integration/pageObjects/authorization";

describe('Test Authorization in website', () => {
    // Создаем новый объект страницы авторизации
    const AuthorizationPage = new authorizationPage()
    // Базовый URL из настроек окружения
    const baseUrl = Cypress.env('baseUrl')

    beforeEach(() => {
        // Игнорируем ошибки JavaScript, чтобы тесты не падали
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });

    it('Sign in', () => {
        // Переходим на сайт
        cy.visit(baseUrl)
        // Перехватываем POST запросы для отправки SMS и логина пользователя
        cy.intercept('POST', '/api/v2/send-sms').as('sendSmsRequest')
        cy.intercept('POST', '/api/v2/user').as('userLogin')
        cy.visit('https://mechta.kz')

        // Закрываем pop-up
        AuthorizationPage.selectCountry()

        // Переходим в личный кабинет
        AuthorizationPage.userCabinet()

        // Проверяем, что текст "Вход/Регистрация" отображается
        AuthorizationPage.SignOutSignInText
            .should('be.visible')

        // Проверяем, что поле ввода номера телефона отображается
        AuthorizationPage.EnterPhoneNumber.should('be.visible')
            .as('Отображается текст')

        // Вводим номер телефона
        AuthorizationPage.phoneNumberText('77475776440')

        // Проверяем, что кнопка "Получить код" отображается и кликаем по ней
        AuthorizationPage.SendSmsCodeButton
            .should('be.visible')
            .as('Отображается кнопка получить код').click()

        // Ожидаем отправки SMS
        cy.wait(3000)

        // Проверяем перехваченный запрос на отправку SMS
        cy.wait('@sendSmsRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200) // Убедитесь, что ответ имеет статус 200
            expect(interception.request.body).to.have.property('phone') // Проверяем наличие номера телефона в запросе
            expect(interception.request.body).to.have.property('type') // Проверяем тип запроса
        })

        // Проверяем, что авторизация успешна
        AuthorizationPage.authorizationSuccess
            .should('be.visible')

        // Проверяем перехваченный запрос на логин пользователя
        cy.wait('@userLogin').then((interception) => {
            expect(interception.response.statusCode).to.eq(200) // Убедитесь, что ответ имеет статус 200
            expect(interception.response.body.data).to.have.property('user_id') // Проверяем наличие user_id в ответе
        })
    });
});
