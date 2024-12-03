// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
beforeEach(() => {
    cy.intercept(
        {
            method: /POST|GET|HEAD/, // Перехватываем как POST, так и GET запросы
            url: /https:\/\/(www\.google-analytics\.com\/j\/collect\/*|analytics\.google\.com\/(g|j)|mc\.yandex\.ru\/|api\.lab\.amplitude\.com\/.*|yandex\.ru\/.*|personalization-web-stable\.mindbox\.ru\/.*)/, // Регулярное выражение для URL
        },
        {
            log: false, // Отключаем логирование
            onRequest(req) {
                console.log('Intercepted request:', req); // Это позволит проверить, перехвачен ли запрос
            }
        }
    );
    Cypress.on('uncaught:exception', (err) => {
        if (
            err.message.includes('Request failed with status code 400') || // Игнорируем ошибки статуса 400
            err.message.includes("Cannot read properties of undefined (reading 'status')") || // Игнорируем ошибки отсутствующих свойств
            err.message.includes("Cannot read properties of undefined (reading 'add')") // Игнорируем ошибки, связанные с вызовом метода 'add'
        ) {
            return false; // Предотвращаем прерывание теста
        }
        return true; // Все остальные ошибки остаются неконтролируемыми
    });
});






// Alternatively you can use CommonJS syntax:
// require('./commands')