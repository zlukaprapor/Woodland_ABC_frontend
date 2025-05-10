import React, { useState } from "react";
import { formStyles } from "../../styles/commonStyles.jsx";
import FormInput from "../../components/FormInput.jsx";
import StatusMessage from "../../components/StatusMessage.jsx";
import Button from "../../components/Button.jsx";

export default function LessonForm({ initialData = {}, onSubmit, isEditing = false }) {
    const [formData, setFormData] = useState({
        letter_upper: initialData.letter_upper || "",
        letter_lower: initialData.letter_lower || "",
        description: initialData.description || "",
        training: initialData.training || "",
        regulations: initialData.regulations || "",
    });

    const [files, setFiles] = useState({
        letter_image: null,
        object_image_first: null,
        object_image_second: null,
        object_image_third: null,
        audio_file: null,
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            // Створюємо FormData для відправки файлів
            const lessonFormData = new FormData();

            // Додаємо текстові поля
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    lessonFormData.append(key, formData[key]);
                }
            });

            // Додаємо файли, якщо вони є
            Object.keys(files).forEach(key => {
                if (files[key]) {
                    lessonFormData.append(key, files[key]);
                }
            });

            // Викликаємо функцію onSubmit, передану як проп
            const result = await onSubmit(lessonFormData);

            setSuccess(isEditing ? "Урок успішно оновлено!" : "Урок успішно створено!");

            // Очищаємо форму після успішного створення
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
                });

                // Очищаємо інпути файлів
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => {
                    input.value = "";
                });
            }

            return result;
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(Array.isArray(detail)
                ? detail.map(d => d.msg).join(", ")
                : detail || "Виникла помилка при збереженні уроку");
        } finally {
            setIsLoading(false);
        }
    };

    const formStyle = {
        ...formStyles.form,
        maxWidth: "500px",
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>{isEditing ? "Редагувати урок" : "Створити новий урок"}</h2>

            <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
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

                <div style={{ flex: 1 }}>
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
                    style={{ ...formStyles.input, minHeight: "100px" }}
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
                    style={{ ...formStyles.input, minHeight: "100px" }}
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
                    style={{ ...formStyles.input, minHeight: "100px" }}
                    required={!isEditing}
                />
            </div>

            <div style={{ marginTop: "15px" }}>
                <label>Зображення літери:</label>
                <input
                    type="file"
                    name="letter_image"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
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
                    style={{ marginBottom: "10px" }}
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
                    style={{ marginBottom: "10px" }}
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
                    style={{ marginBottom: "10px" }}
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
                    style={{ marginBottom: "10px" }}
                    required={!isEditing}
                />
            </div>

            <Button
                type="submit"
                text={isLoading ? "Збереження..." : (isEditing ? "Оновити урок" : "Створити урок")}
                color="#4caf50"
                style={{ marginTop: "20px", width: "100%" }}
                disabled={isLoading}
            />

            <StatusMessage error={error} success={success} />
        </form>
    );
}