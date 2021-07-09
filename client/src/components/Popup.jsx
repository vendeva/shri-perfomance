import constants from "../constants/constants";
import { useDispatch } from "react-redux";
import { toggle } from "../actions/interactive";
import { addNewBuild } from "../actions/builds";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

export const Popup = () => {
    const componentName = "popup";
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitValue, setSubmitValue] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const commitHash = formData.get("commitHash").trim();
        setSubmitValue(commitHash);
        if (commitHash) dispatch(addNewBuild(commitHash, history));
    };
    return (
        <div className={componentName}>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__title">New build</div>
                <div className="form__subTitle">Enter the commit hash which you want to build.</div>
                {submitValue === "" && <div className="error">{constants.ERROR_COMMITHASH}</div>}
                <Input
                    placeholder="Commit hash"
                    name="commitHash"
                    required="required"
                    pattern="\S+"
                    value=""
                />
                <div className="button">
                    <Button type="submit" text="Run build" view="action" />
                    <Button text="Cancel" view="cancel" click={() => dispatch(toggle(false))} />
                </div>
            </form>
        </div>
    );
};
