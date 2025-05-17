import apiClient from "./client";

/**
 * Отримує прогрес поточного користувача
 *
 * @returns {Promise<Array<{ lesson_id: number, is_completed: boolean }>>} Список пройдених уроків
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