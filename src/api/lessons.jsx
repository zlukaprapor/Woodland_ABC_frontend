import apiClient from "./client";

/**
 * Отримує список всіх уроків з можливістю фільтрації та пагінації
 *
 * @param {Object} params - Параметри запиту
 * @param {number} [params.skip=0] - Кількість уроків для пропуску
 * @param {number} [params.limit=10] - Максимальна кількість уроків для отримання
 * @param {string} [params.letter_filter] - Фільтр за літерою
 * @returns {Promise<Object>} Список уроків
 */
export const getLessons = async (params = {}) => {
    const response = await apiClient.get("/lessons", { params });
    return response.data;
};

/**
 * Отримує урок за ID
 *
 * @param {number} lessonId - ID уроку
 * @returns {Promise<Object>} Дані уроку
 */
export const getLessonById = async (lessonId) => {
    const response = await apiClient.get(`/lessons/${lessonId}`);
    return response.data;
};

/**
 * Отримує урок за великою літерою
 *
 * @param {string} letterUpper - Велика літера
 * @returns {Promise<Object>} Дані уроку
 */
export const getLessonByLetter = async (letterUpper) => {
    const response = await apiClient.get("/lessons/get-by-letter", {
        params: { letter_upper: letterUpper }
    });
    return response.data;
};

/**
 * Створює новий урок з медіафайлами
 * Тільки для адміністраторів
 *
 * @param {FormData} formData - Дані уроку (letter_upper, letter_lower, description, letter_image, object_image, audio_file)
 * @returns {Promise<Object>} Створений урок
 */
export const createLesson = async (formData) => {
    const response = await apiClient.post("/lessons/create-with-files", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
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
    const response = await apiClient.put(`/lessons/${lessonId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

/**
 * Видаляє урок за ID
 * Тільки для адміністраторів
 *
 * @param {number} lessonId - ID уроку
 * @returns {Promise<Object>} Повідомлення про успішне видалення
 */
export const deleteLesson = async (lessonId) => {
    const response = await apiClient.delete(`/lessons/${lessonId}`);
    return response.data;
};