import './pageInput.css';

export function PageInput({
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
        <div className="page-input-container">
            <span className="page-input-title">{title}</span>
            <input
                type={type}
                className="page-input"
                value={value}
                onChange={onInputChanged}
                placeholder={placeholder}
            />
        </div>
    );
}
