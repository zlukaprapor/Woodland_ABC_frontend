import React from 'react';

/**
 * Кнопка відкриття модального вікна з Совеням.
 * Відображається тільки якщо модальне вікно ще не показане.
 *
 * @component
 * @param {Object} props - Вхідні параметри компонента.
 * @param {boolean} props.showModal - Чи показане зараз модальне вікно.
 * @param {Function} props.setShowModal - Функція для встановлення стану модального вікна (true/false).
 *
 * @returns {JSX.Element|null} Кнопка із зображенням сови, або `null`, якщо модальне вікно вже активне.
 */
const OwlModalButton = ({ showModal, setShowModal }) => {
    if (showModal) return null; // якщо модалка вже показана — не показувати кнопку

    return (
        <button
            onClick={() => setShowModal(true)}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 1001,
            }}
            title="Показати правила від Совеняти"
        >
            <img
                src="/owl/OwlModal.png"
                alt="Сова"
                style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                }}
            />
        </button>
    );
};

export default OwlModalButton;
