import constants from "../constants/constants";
import { isFetch, isLoadingApp } from "./interactive";

export const setSettings = (obj) => ({
    type: constants.SETTINGS,
    payload: obj,
});

export const saveSettings = (data) => (dispatch) => {
    dispatch(isFetch(true));
    return fetch(`${constants.SERVER_API}/settings`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then(
            (result) => {
                dispatch(setSettings({ ...result, error: null }));
            },
            (error) => {
                dispatch(setSettings({ error }));
            }
        )
        .finally(() => dispatch(isFetch(false)));
};

export const getFetchSettings = () => (dispatch) => {
    return fetch(`${constants.SERVER_API}/settings`)
        .then((res) => res.json())
        .then(
            (result) => {
                const { repoName, buildCommand, mainBranch, period } = result.data;
                dispatch(setSettings({ repoName, buildCommand, mainBranch, period, error: null }));
            },
            (error) => {
                dispatch(setSettings({ error }));
            }
        )
        .finally(() => dispatch(isLoadingApp(true)));
};
