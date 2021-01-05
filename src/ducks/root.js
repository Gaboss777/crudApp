import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { paymentReducer } from './paymentReducer';
import { providerReducer } from "./providerReducer";
import { employiesReducer } from "./rrhhReducer";
import { datesReducer } from "./datesReducer";
import { sellerReducer } from "./sellersReducer";
import { reportsReducer } from "./reportsReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    users:usersReducer,
    payment:paymentReducer,
    providers:providerReducer,
    rrhh:employiesReducer,
    dates:datesReducer,
    sellers:sellerReducer,
    reports:reportsReducer,
    auth:authReducer
})