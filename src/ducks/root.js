import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { paymentReducer } from './payment';
import { providerReducer } from "./provider";
import { employiesReducer } from "./rrhh";
import { datesReducer } from "./dates";
import { sellerReducer } from "./sellers";
import { reportsReducer } from "./reports";

export const rootReducer = combineReducers({
    users:usersReducer,
    payment:paymentReducer,
    providers:providerReducer,
    rrhh:employiesReducer,
    dates:datesReducer,
    sellers:sellerReducer,
    reports:reportsReducer
})