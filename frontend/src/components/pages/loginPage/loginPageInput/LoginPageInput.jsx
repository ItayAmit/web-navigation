import './loginPageInput.css';

export function LoginPageInput({ title, value, onChange }) {
  const onInputChanged = event => {
    onChange(event.target.value);
  };

  return (
    <div className="login-page-input-container">
      <span className="login-page-input-title">{title}</span>
      <input
        type="text"
        className="login-page-input"
        value={value}
        onChange={onInputChanged}
      />
    </div>
  );
}
