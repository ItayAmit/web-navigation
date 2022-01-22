import './loginPageInput.css';

export function LoginPageInput({
    type = 'text',
    title,
    placeHolder,
    value,
    onChange,
}) {
    const onInputChanged = event => {
        onChange(event.target.value);
    };

    return (
        <div className="login-page-input-container">
            <span className="login-page-input-title">{title}</span>
            <br />
            <input
                type={type}
                className="login-page-input"
                value={value}
                onChange={onInputChanged}
                placeHolder={placeHolder}
            />
        </div>
    );
}
