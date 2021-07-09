import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { StartPage } from "./pages/StartPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { BuildListPage } from "./pages/BuildListPage.jsx";
import { BuildDetailsPage } from "./pages/BuildDetailsPage.jsx";
import { Footer } from "./components/Footer.jsx";
import { Popup } from "./components/Popup.jsx";
import { getIsPopupActive, getIsLoadingApp } from "./reducers/interactive";
import { getSettings } from "./reducers/settings";
import { getFetchSettings } from "./actions/settings";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFetchSettings());
    }, [dispatch]);
    const { repoName } = useSelector(getSettings);
    const isPopupActive = useSelector(getIsPopupActive);
    const isLoadingApp = useSelector(getIsLoadingApp);

    useEffect(() => {
        const root = document.getElementById("root");
        if (isPopupActive) {
            root.classList.add("container_popup-active");
        } else {
            root.classList.remove("container_popup-active");
        }
    }, [isPopupActive]);

    return (
        <>
            {!isLoadingApp ? (
                <div className="loading">
                    <div className="loading__icon"></div>
                </div>
            ) : (
                <BrowserRouter>
                    <div className="wrapper">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (repoName ? <BuildListPage /> : <StartPage />)}
                            />
                            <Route path="/build/:buildId" render={() => <BuildDetailsPage />} />
                            <Route path="/settings" render={() => <SettingsPage />} />
                        </Switch>
                    </div>
                    <Footer />
                    {isPopupActive && <Popup />}
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
