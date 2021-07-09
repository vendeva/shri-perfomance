import { Header } from "../components/Header";
import { Start } from "../components/Start";
import { useHistory } from "react-router-dom";
import constants from "../constants/constants";

export const StartPage = () => {
    let history = useHistory();
    return (
        <>
            <Header
                classHeader="startPage"
                title={constants.SITE_NAME}
                text={constants.TO_SETTINGS}
                clickButton={() => history.push("/settings")}
            />
            <div className="container">
                <Start />
            </div>
        </>
    );
};
