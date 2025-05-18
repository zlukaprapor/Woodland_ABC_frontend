import React, { useState } from "react";
import FormInput from "../auth/FormInput.jsx";
import StatusMessage from "../auth/StatusMessage.jsx";
import Button from "../ui/Button.jsx";
import { adminStyles } from "../../styles/adminStyles.js";

/**
 * Компонент форми створення або редагування уроку з літерою, віршиками, тренуваннями,
 * правилами, а також медіафайлами (зображеннями та аудіо).
 *
 * @param {Object} props
 * @param {Object} [props.initialData={}] - Початкові дані уроку для редагування. Якщо порожній об'єкт,
 *                                        форма буде порожньою (для створення нового уроку).
 * @param {Function} props.onSubmit - Функція, яка викликається при відправленні форми. Приймає
 *                                   об'єкт FormData з полями та файлами. Має повертати Promise.
 * @param {boolean} [props.isEditing=false] - Прапорець, чи форма у режимі редагування.
 *
 * @returns {JSX.Element} - Рендер форми уроку.
 */

export default function LessonForm({ initialData = {}, onSubmit, isEditing = false }) {
    // Стан текстових полів форми
    const [formData, setFormData] = useState({
        letter_upper: initialData.letter_upper || "",
        letter_lower: initialData.letter_lower || "",
        description: initialData.description || "",
        training: initialData.training || "",
        regulations: initialData.regulations || "",
    });

    // Стан файлів (зображення, аудіо, JSON)
    const [files, setFiles] = useState({
        letter_image: null,
        object_image_first: null,
        object_image_second: null,
        object_image_third: null,
        audio_file: null,
        quiz_file: null,
    });

    // Стан повідомлень про помилки
    const [error, setError] = useState(null);
    // Стан повідомлень про успіх
    const [success, setSuccess] = useState(null);
    // Стан завантаження/очікування відповіді від onSubmit
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Обробник зміни текстових полів форми.
     * Оновлює відповідне поле в стані formData.
     *
     * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - Подія зміни поля.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Обробник вибору файлу у відповідних полях.
     * Оновлює відповідне поле в стані files.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - Подія вибору файлу.
     */
    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    /**
     * Обробник сабміту форми.
     * Формує FormData з текстових полів і файлів,
     * викликає onSubmit та обробляє відповіді/помилки.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - Подія сабміту форми.
     * @returns {Promise<any>} - Результат виконання onSubmit.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            // Формуємо FormData для передачі текстових даних і файлів
            const lessonFormData = new FormData();

            // Додаємо текстові поля, якщо вони не порожні
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    lessonFormData.append(key, formData[key]);
                }
            });

            // Додаємо файли, якщо вони вибрані
            Object.keys(files).forEach((key) => {
                if (files[key]) {
                    lessonFormData.append(key, files[key]);
                }
            });

            // Викликаємо onSubmit з FormData, очікуючи результат
            const result = await onSubmit(lessonFormData);

            // Відображаємо повідомлення про успіх залежно від режиму форми
            setSuccess(isEditing ? "Урок успішно оновлено!" : "Урок успішно створено!");

            // Якщо створюємо новий урок (не редагуємо), очищуємо форму та інпути файлів
            if (!isEditing) {
                setFormData({
                    letter_upper: "",
                    letter_lower: "",
                    description: "",
                    training: "",
                    regulations: "",
                });
                setFiles({
                    letter_image: null,
                    object_image_first: null,
                    object_image_second: null,
                    object_image_third: null,
                    audio_file: null,
                    quiz_file: null,
                });

                // Очищаємо вміст усіх полів файлів вручну
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach((input) => {
                    input.value = "";
                });
            }

            return result;
        } catch (err) {
            // Парсимо помилки з відповіді сервера, якщо вони є, і відображаємо
            const detail = err.response?.data?.detail;
            setError(
                Array.isArray(detail)
                    ? detail.map((d) => d.msg).join(", ")
                    : detail || "Виникла помилка при збереженні уроку"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // JSX розмітка форми з усіма полями та кнопками
    return (
        <form onSubmit={handleSubmit} style={adminStyles.form}>
            <h2>{isEditing ? "Редагувати урок" : "Створити новий урок"}</h2>

            <div style={adminStyles.formRow}>
                <div style={adminStyles.formColumn}>
                    <label>Велика літера:</label>
                    <FormInput
                        name="letter_upper"
                        placeholder="А"
                        value={formData.letter_upper}
                        onChange={handleChange}
                        maxLength={1}
                        required={!isEditing}
                    />
                </div>

                <div style={adminStyles.formColumn}>
                    <label>Мала літера:</label>
                    <FormInput
                        name="letter_lower"
                        placeholder="а"
                        value={formData.letter_lower}
                        onChange={handleChange}
                        maxLength={1}
                        required={!isEditing}
                    />
                </div>
            </div>

            <div>
                <label>Віршики:</label>
                <textarea
                    name="description"
                    placeholder="Невеликі рифмовані вірші"
                    value={formData.description}
                    onChange={handleChange}
                    style={adminStyles.textareaField}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Тренування:</label>
                <textarea
                    name="training"
                    placeholder="Тренувальні склади"
                    value={formData.training}
                    onChange={handleChange}
                    style={adminStyles.textareaField}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Правила уроку:</label>
                <textarea
                    name="regulations"
                    placeholder="Правила проведення уроку"
                    value={formData.regulations}
                    onChange={handleChange}
                    style={adminStyles.textareaField}
                    required={!isEditing}
                />
            </div>

            <div style={adminStyles.formGroup}>
                <label>Зображення літери:</label>
                <input
                    type="file"
                    name="letter_image"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={adminStyles.fileInput}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Переше зображення об'єкта на літеру:</label>
                <input
                    type="file"
                    name="object_image_first"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={adminStyles.fileInput}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Друге зображення об'єкта на літеру:</label>
                <input
                    type="file"
                    name="object_image_second"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={adminStyles.fileInput}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Третє зображення об'єкта на літеру:</label>
                <input
                    type="file"
                    name="object_image_third"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={adminStyles.fileInput}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Аудіофайл:</label>
                <input
                    type="file"
                    name="audio_file"
                    onChange={handleFileChange}
                    accept="audio/*"
                    style={adminStyles.fileInput}
                    required={!isEditing}
                />
            </div>

            <div>
                <label>Файл JSON:</label>
                <input
                    type="file"
                    name="quiz_file"
                    onChange={handleFileChange}
                    accept="application/*"
                    style={adminStyles.fileInput}
                />
            </div>

            <Button
                type="submit"
                text={isLoading ? "Збереження..." : isEditing ? "Оновити урок" : "Створити урок"}
                color="#4caf50"
                style={adminStyles.submitButton}
                disabled={isLoading}
            />

            <StatusMessage error={error} success={success} />
        </form>
    );
}
