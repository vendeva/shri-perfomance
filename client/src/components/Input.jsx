import { useState } from "react";

export const Input = ({ placeholder, required, pattern, title, value, type, name }) => {
    const componentName = "input";
    const [inputValue, setValue] = useState(value);
    const handleChange = (e) => setValue(e.target.value);
    const handleClick = () => setValue("");
    return (
        <div className={componentName}>
            {title && (
                <label htmlFor={placeholder} className={`${componentName}__title`}>
                    {title}
                    {required ? <span> *</span> : ""}
                </label>
            )}
            {type === "number" && <label htmlFor={value}>Synchronize every</label>}
            <div className={`${componentName}__block`}>
                <input
                    id={placeholder || value}
                    className={`${componentName}__place`}
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    value={inputValue}
                    pattern={pattern}
                    type={type || "text"}
                    name={name}
                />
                {inputValue && (
                    <div
                        className={`${componentName}__clear`}
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    ></div>
                )}
            </div>
            {type === "number" && <label htmlFor={value}>minutes</label>}
        </div>
    );
};
