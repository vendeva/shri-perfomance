import constants from "../constants/constants";

const buildsReducer = (state = { data: [], error: null, detail: {} }, action) => {
    switch (action.type) {
        case constants.BUILDS:
            return {
                ...state,
                data: [...action.payload],
            };
        case constants.MORE_BUILDS:
            return {
                ...state,
                data: [...state.data, ...action.payload],
            };
        case constants.NEW_BUILD:
            state.data = [action.payload, ...state.data];
            return state;
        case constants.DETAIL_BUILD:
            state.detail = action.payload;
            return state;
        case constants.DETAIL_LOG:
            state.detail = { ...state.detail, log: action.payload };
            return state;
        case constants.ERROR_BUILD:
            state.error = action.payload.error;
            return state;
        default:
            return state;
    }
};
export default buildsReducer;

export const getBuilds = (state) => state.builds.data;

export const getBuildDetail = (state) => state.builds.detail;

export const getBuildError = (state) => state.builds.error;
