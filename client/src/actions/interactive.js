import constants from "../constants/constants";

export const toggle = (bool) => ({
    type: constants.POPUP,
    payload: bool,
});

export const isFetch = (bool) => ({
    type: constants.FETCHING_STATUS,
    payload: bool,
});

export const isLoadingApp = (bool) => ({
    type: constants.LOAD_SETTINGS,
    payload: bool,
});
