import apiClient from "./client";

/**
 * Отримує прогрес поточного авторизованого користувача.
 *
 * Виконує GET-запит до бекенд-ендпоінту `/progress/` для отримання інформації
 * про уроки, які користувач вже пройшов. Очікується, що відповідь містить масив
 * об’єктів, кожен з яких містить `lesson_id` (ідентифікатор уроку) та
 * `is_completed` (прапорець, що вказує на завершення уроку).
 *
 * @async
 * @function getProgress
 * @returns {Promise<Array<{ lesson_id: number, is_completed: boolean }>>}
 * Масив об'єктів прогресу, де кожен елемент представляє урок та його статус завершення.
 *
 * @throws {Error} Якщо запит завершився помилкою, вона буде викинута далі.
 *
 * @example
 * const progress = await getProgress();
 * // [{ lesson_id: 1, is_completed: true }, { lesson_id: 2, is_completed: false }]
 */
export const getProgress = async () => {
    try {
        console.log("Запитую прогрес користувача...");
        const response = await apiClient.get("/progress/");
        console.log("Отриманий прогрес:", response.data);
        return response.data;
    } catch (error) {
        console.error("Помилка при отриманні прогресу:", error);
        throw error;
    }
};
