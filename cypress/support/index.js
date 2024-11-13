Cypress.on('uncaught:exception', (err, runnable) => {
    // Отключаем падение тестов при ошибках, связанных с AxiosError 400
    if (err.message.includes('Request failed with status code 400')) {
        return false; // предотвращает падение теста
    }
});