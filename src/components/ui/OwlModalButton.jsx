import React from 'react';

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
