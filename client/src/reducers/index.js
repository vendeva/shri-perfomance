import { combineReducers } from "redux";

import settings from "./settings";
import interactive from "./interactive";
import builds from "./builds";

const rootReducer = combineReducers({
    settings,
    builds,
    interactive,
});
export default rootReducer;
