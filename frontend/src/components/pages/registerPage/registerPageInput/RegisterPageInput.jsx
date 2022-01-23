import './registerPageInput.css';

export function RegisterPageInput({
    type = 'text',
    title,
    placeholder,
    value,
    onChange,
}) {
    const onInputChanged = event => {
        onChange(event.target.value);
    };

    return (
        <div className="register-page-input-container">
            <span className="register-page-input-title">{title}</span>
            <input
                type={type}
                className="register-page-input"
                value={value}
                onChange={onInputChanged}
                placeholder={placeholder}
            />
        </div>
    );
}
