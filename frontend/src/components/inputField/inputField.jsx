import styles from "./inputField.module.css";

function InputField({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error = false,
}) {
  return (
    <input
      className={error ? styles.errorInputField : styles.inputField}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}

export default InputField;
