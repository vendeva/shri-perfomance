import classnames from "classnames";
import { Button } from "./Button";
import { useHistory } from "react-router-dom";

export const Header = ({ classHeader, text, title, clickButton }) => {
    let history = useHistory();
    const componentName = "header";
    return (
        <header className={classnames(`${componentName}`, `${componentName}_${classHeader}`)}>
            <div className={`${componentName}__title`}>{title}</div>
            <div className={`${componentName}__buttons`}>
                <Button
                    text={text}
                    view="cancel"
                    click={clickButton}
                    elementClass={`${componentName}__popup-button`}
                />
                <Button
                    view="cancel"
                    click={() => history.push("/settings")}
                    elementClass={`${componentName}__settings`}
                />
            </div>
        </header>
    );
};
