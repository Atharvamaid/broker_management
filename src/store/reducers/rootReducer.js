import authReducer from './authReducer';
import loaderReducer from './suppliesReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth : authReducer,
    loader : loaderReducer,
    
});
export default rootReducer;