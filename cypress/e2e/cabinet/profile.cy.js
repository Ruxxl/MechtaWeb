import profile from "../../integration/pageObjects/cabinet/profile";

describe('Тест редактирования профиля', () => {
    beforeEach(() => {
        // Выполняем логин перед каждым тестом
        cy.login();
    });

    const Profile = new profile()

    // Базовый URL, указанный в переменных окружения
    const baseUrl = Cypress.env('baseUrl');
    const profile_link = 'https://mechta.kz/cabinet/profile'

    it('Редактирование профиля', () => {
        Profile.intercept_urls

        cy.visit(profile_link).wait(3000)

        cy.contains('Астана').click()

        Profile.delete_reasons_api_check

        Pro

    });
});
