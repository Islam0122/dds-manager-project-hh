import { configureStore } from '@reduxjs/toolkit';
import cashFlowSlice from "../features/cashFlowSlice.js";
import categorySlice from "../features/categorySlice.js";
import subcategorySlice from "../features/subcategorySlice.js";
import statusSlice from "../features/statusSlice.js";
import operationTypeSlice from "../features/operationTypeSlice.js";

const store = configureStore({
  reducer: {
    cashFlow: cashFlowSlice,
    category: categorySlice,
    subcategory: subcategorySlice,
    status: statusSlice,
    operationType: operationTypeSlice,
  },
});

export default store;
