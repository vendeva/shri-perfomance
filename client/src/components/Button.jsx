import classnames from "classnames";

export const Button = ({ type, text, click, view, disabled, elementClass }) => {
    const componentName = "button";
    const className = elementClass ? elementClass : `${componentName}_${view}`;
    return (
        <button
            type={type}
            className={classnames(`${className}`, `${componentName}_condition-${view}`)}
            onClick={click}
            disabled={disabled}
        >
            {text}
        </button>
    );
};
