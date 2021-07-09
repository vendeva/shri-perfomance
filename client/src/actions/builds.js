import constants from "../constants/constants";
import { isFetch, toggle } from "./interactive";

export const addNewBuild = (commitHash, history) => (dispatch) => {
    dispatch(isFetch(true));
    return fetch(`${constants.SERVER_API}/builds/${commitHash}`, {
        method: "POST",
    })
        .then((res) => res.json())
        .then(
            (result) => {
                dispatch({
                    type: constants.NEW_BUILD,
                    payload: result,
                });
                history.push(`/build/${result.id}`);
            },
            (error) => {
                dispatch({ type: constants.ERROR_BUILD, payload: { error } });
            }
        )
        .finally(() => {
            dispatch(isFetch(false));
            dispatch(toggle(false));
        });
};

export const getFetchBuilds =
    (params, more = false) =>
    (dispatch) => {
        dispatch(isFetch(true));
        dispatch({ type: constants.SHOW_END, payload: false });
        const url = new URL(`${constants.SERVER_API}/builds`);
        url.search = new URLSearchParams(params).toString();
        return fetch(url.href)
            .then((res) => res.json())
            .then(
                (result) => {
                    const { data } = result;
                    if (Object.keys(data).length < constants.ADD_LIMIT)
                        dispatch({ type: constants.SHOW_END, payload: true });
                    more
                        ? dispatch({
                              type: constants.MORE_BUILDS,
                              payload: data,
                          })
                        : dispatch({
                              type: constants.BUILDS,
                              payload: data,
                          });
                },
                (error) => {
                    dispatch({ type: constants.ERROR_BUILD, payload: { error } });
                }
            )
            .finally(() => {
                dispatch(isFetch(false));
            });
    };

export const getFetchBuildById = (buildId) => (dispatch) => {
    dispatch(isFetch(true));
    return fetch(`${constants.SERVER_API}/builds/${buildId}`)
        .then((res) => res.json())
        .then(
            (result) => {
                const { data } = result;
                dispatch({
                    type: constants.ERROR_BUILD,
                    payload: {},
                });
                dispatch({
                    type: constants.DETAIL_BUILD,
                    payload: data,
                });
                return fetch(`${constants.SERVER_API}/builds/${buildId}/logs`);
            },
            (error) => {
                dispatch({ type: constants.ERROR_BUILD, payload: { error } });
            }
        )
        .then((res) => res.json())
        .then(
            (result) => {
                dispatch({
                    type: constants.DETAIL_LOG,
                    payload: result,
                });
            },
            (error) => {
                dispatch({ type: constants.ERROR_BUILD, payload: { error } });
            }
        )
        .finally(() => {
            dispatch(isFetch(false));
        });
};
