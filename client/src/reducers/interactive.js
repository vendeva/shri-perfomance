import constants from "../constants/constants";

const interactiveReducer = (
    state = {
        isPopupActive: false,
        isFetch: false,
        isLoadingApp: false,
        isShowEnd: false,
    },
    action
) => {
    switch (action.type) {
        case constants.POPUP:
            return {
                ...state,
                isPopupActive: action.payload,
            };
        case constants.FETCHING_STATUS:
            return {
                ...state,
                isFetch: action.payload,
            };
        case constants.LOAD_SETTINGS:
            return {
                ...state,
                isLoadingApp: action.payload,
            };
        case constants.SHOW_END:
            return {
                ...state,
                isShowEnd: action.payload,
            };
        default:
            return state;
    }
};
export default interactiveReducer;

export const getIsPopupActive = (state) => state.interactive.isPopupActive;

export const getIsFetchingStatus = (state) => state.interactive.isFetch;

export const getIsLoadingApp = (state) => state.interactive.isLoadingApp;

export const getIsShowEnd = (state) => state.interactive.isShowEnd;
