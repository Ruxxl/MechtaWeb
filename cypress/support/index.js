Cypress.on('uncaught:exception', (err, runnable) => {
    // Проверка ошибки и игнорирование, если это ожидаемая ошибка
    if (err.message.includes('Cannot read properties of undefined')) {
        // Возвращаем false, чтобы предотвратить сбой теста
        return false;
    }
    // В случае других ошибок, оставляем их обрабатываться по умолчанию
    return true;
});