import apiClient from "./client";

/**
 * Отримує список всіх уроків з можливістю фільтрації та пагінації
 *
 * @param {Object} params - Параметри запиту
 * @param {number} [params.skip=0] - Кількість уроків для пропуску
 * @param {number} [params.limit=100] - Максимальна кількість уроків для отримання
 * @param {string} [params.letter_filter] - Фільтр за літерою
 * @returns {Promise<Object>} Список уроків
 */
export const getLessons = async (params = { limit: 100 }) => {
    try {
        console.log("Викликаю getLessons з параметрами:", params);
        const response = await apiClient.get("/lessons", { params });
        console.log("Отримана відповідь від API:", response.data);

        // Повертаємо items з пагінованої відповіді
        if (response.data && Array.isArray(response.data.items)) {
            return response.data.items;
        } else if (response.data && Array.isArray(response.data)) {
            return response.data;
        } else if (response.data && response.data.lessons) {
            return response.data.lessons;
        } else {
            console.warn("Неочікуваний формат відповіді:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Помилка при отриманні уроків:", error);
        throw error;
    }
};
/**
 * Отримує урок за ID
 *
 * @param {number} lessonId - ID уроку
 * @returns {Promise<Object>} Дані уроку
 */
export const getLessonById = async (lessonId) => {
    try {
        console.log("Викликаю getLessonById з ID:", lessonId);
        const response = await apiClient.get(`/lessons/${lessonId}`);
        console.log("Отримана відповідь від API для уроку:", response.data);
        return response.data;
    } catch (error) {
        console.error("Помилка при отриманні уроку за ID:", error);
        throw error;
    }
};

/**
 * Отримує урок за великою літерою
 *
 * @param {string} letterUpper - Велика літера
 * @returns {Promise<Object>} Дані уроку
 */
export const getLessonByLetter = async (letterUpper) => {
    try {
        console.log("Викликаю getLessonByLetter з літерою:", letterUpper);
        const response = await apiClient.get("/lessons/get-by-letter", {
            params: { letter_upper: letterUpper }
        });
        console.log("Отримана відповідь від API для літери:", response.data);
        return response.data;
    } catch (error) {
        console.error("Помилка при отриманні уроку за літерою:", error);
        throw error;
    }
};

/**
 * Створює новий урок з медіафайлами
 * Тільки для адміністраторів
 *
 * @param {FormData} formData - Дані уроку (letter_upper, letter_lower, description, letter_image, object_image, audio_file)
 * @returns {Promise<Object>} Створений урок
 */
export const createLesson = async (formData) => {
    try {
        console.log("Створюю новий урок");
        const response = await apiClient.post("/lessons/create-with-files", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Урок створено:", response.data);
        return response.data;
    } catch (error) {
        console.error("Помилка при створенні уроку:", error);
        throw error;
    }
};

/**
 * Оновлює існуючий урок
 * Тільки для адміністраторів
 *
 * @param {number} lessonId - ID уроку
 * @param {FormData} formData - Дані для оновлення
 * @returns {Promise<Object>} Оновлений урок
 */
export const updateLesson = async (lessonId, formData) => {
    try {
        console.log("Оновлюю урок з ID:", lessonId);
        const response = await apiClient.put(`/lessons/${lessonId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Урок оновлено:", response.data);
        return response.data;
    } catch (error) {
        console.error("Помилка при оновленні уроку:", error);
        throw error;
    }
};

/**
 * Видаляє урок за ID
 * Тільки для адміністраторів
 *
 * @param {number} lessonId - ID уроку
 * @returns {Promise<Object>} Повідомлення про успішне видалення
 */
export const deleteLesson = async (lessonId) => {
    try {
        console.log("Видаляю урок з ID:", lessonId);
        const response = await apiClient.delete(`/lessons/${lessonId}`);
        console.log("Урок видалено:", response.data);
        return response.data;
    } catch (error) {
        console.error("Помилка при видаленні уроку:", error);
        throw error;
    }
};