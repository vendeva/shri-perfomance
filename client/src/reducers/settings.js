import constants from "../constants/constants";

const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SETTINGS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export default settingsReducer;

export const getSettings = (state) => state.settings;
