import { useHistory } from "react-router-dom";

export const Start = () => {
    let history = useHistory();
    const componentName = "start";
    return (
        <div className={componentName}>
            <div className={`${componentName}__image`}></div>
            <div className={`${componentName}__title`}>
                Configure repository connection and synchronization settings
            </div>
            <button
                className="start__button button_action button_condition-yellow"
                onClick={() => history.push("/settings")}
            >
                Open settings
            </button>
        </div>
    );
};
