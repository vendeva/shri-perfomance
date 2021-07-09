import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { BuildList } from "../components/BuildList";
import { getSettings } from "../reducers/settings";
import { getBuilds } from "../reducers/builds";
import { getFetchBuilds } from "../actions/builds";
import { toggle } from "../actions/interactive";
import constants from "../constants/constants";

export const BuildListPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFetchBuilds({ limit: constants.ADD_LIMIT }));
        let event = new Event("getBuilds", { bubbles: true });
        dispatchEvent(event);
    }, [dispatch]);
    const data = useSelector(getBuilds);

    let { repoName } = useSelector(getSettings);
    repoName = repoName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "");

    return (
        <>
            <Header
                classHeader="buildList"
                text={constants.RUN_BUILD}
                title={data[0] && `${data[0].authorName}/${repoName}`}
                clickButton={() => dispatch(toggle(true))}
            />
            <div className="container">
                <BuildList data={data} />
            </div>
        </>
    );
};
