import apiClient from "./client";

/**
 * Отримує список усіх уроків з можливістю фільтрації та пагінації.
 *
 * @async
 * @function
 * @param {Object} params - Параметри запиту.
 * @param {number} [params.skip=0] - Кількість записів, які потрібно пропустити.
 * @param {number} [params.limit=100] - Максимальна кількість записів для отримання.
 * @param {string} [params.letter_filter] - Фільтрація за літерою.
 * @returns {Promise<Object[]>} Масив уроків.
 * @throws Помилка при запиті до API.
 */
export const getLessons = async (params = { limit: 100 }) => {
    try {
        console.log("Викликаю getLessons з параметрами:", params);
        const response = await apiClient.get("/lessons", { params });
        console.log("Отримана відповідь від API:", response.data);

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
 * Отримує урок за його унікальним ідентифікатором.
 *
 * @async
 * @function
 * @param {number} lessonId - Унікальний ID уроку.
 * @returns {Promise<Object>} Об'єкт уроку.
 * @throws Помилка при запиті до API.
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
 * Отримує урок за великою літерою.
 *
 * @async
 * @function
 * @param {string} letterUpper - Велика літера українського алфавіту (наприклад: "А").
 * @returns {Promise<Object>} Об'єкт уроку.
 * @throws Помилка при запиті до API.
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
 * Створює новий урок із завантаженням медіафайлів.
 * **Доступно лише адміністраторам.**
 *
 * @async
 * @function
 * @param {FormData} formData - Дані уроку (включно з файлами).
 * @param {string} formData.letter_upper - Велика літера.
 * @param {string} formData.letter_lower - Мала літера.
 * @param {string} formData.description - Опис уроку.
 * @param {File} formData.letter_image - Зображення літери.
 * @param {File} formData.object_image - Зображення об'єкта.
 * @param {File} formData.audio_file - Аудіофайл вимови.
 * @returns {Promise<Object>} Створений урок.
 * @throws Помилка при запиті до API.
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
 * Оновлює наявний урок.
 * **Доступно лише адміністраторам.**
 *
 * @async
 * @function
 * @param {number} lessonId - ID уроку, який потрібно оновити.
 * @param {FormData} formData - Дані для оновлення уроку.
 * @returns {Promise<Object>} Оновлений урок.
 * @throws Помилка при запиті до API.
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
 * Видаляє урок за його ID.
 * **Доступно лише адміністраторам.**
 *
 * @async
 * @function
 * @param {number} lessonId - ID уроку, який потрібно видалити.
 * @returns {Promise<Object>} Повідомлення про успішне видалення.
 * @throws Помилка при запиті до API.
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
