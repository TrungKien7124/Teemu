import styles from "./button.module.css";

function Button({ label, onClick, disabled = false, textButton = false }) {
  return (
    <button
      className={textButton ? styles.textButton : styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
