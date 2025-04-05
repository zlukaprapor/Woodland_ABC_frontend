export default function Button({ onClick, text, color = "#ffb74d" }) {
    return (
        <button onClick={onClick} style={{ ...styles.button, backgroundColor: color }}>
            {text}
        </button>
    );
}

const styles = {
    button: {
        backgroundColor: "#ffb74d",
        border: "none",
        borderRadius: "12px",
        padding: "12px 24px",
        margin: "10px",
        color: "white",
        fontSize: "1.1rem",
        cursor: "pointer",
        transition: "0.3s",
    },
};
