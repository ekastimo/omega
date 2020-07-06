import {configureStore} from '@reduxjs/toolkit';

import core from "./coreReducer";
import crm from "./crm/reducer";
import loans from "./loans/reducer";
import {AppState} from "../types";

export default configureStore<AppState>({
    reducer: {
        core, crm, loans
    },
});




