import { Header } from "../components/Header";
import { Settings } from "../components/Settings";
import constants from "../constants/constants";

export const SettingsPage = () => {
    return (
        <>
            <Header classHeader="settingsPage" title={constants.SITE_NAME} />
            <div className="container">
                <Settings />
            </div>
        </>
    );
};
