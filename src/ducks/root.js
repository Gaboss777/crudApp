import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { paymentReducer } from './payment';

export const rootReducer = combineReducers({
    users:usersReducer,
    payment:paymentReducer
})