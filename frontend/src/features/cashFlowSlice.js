import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {
    getCashFlows,
    createCashFlow,
    updateCashFlow,
    deleteCashFlow,
    getCashFlowStats
} from '../api/cashFlowApi.js';

const cashFlowsAdapter = createEntityAdapter({
    selectId: (cashFlow) => cashFlow.id,
    sortComparer: (a, b) => new Date(b.date) - new Date(a.date)
});

const initialState = cashFlowsAdapter.getInitialState({
    status: 'idle',
    loading: false,
    error: null,
    operationLoading: false,
});

export const fetchCashFlows = createAsyncThunk(
    'cashFlow/fetchCashFlows',
    async (filters, {rejectWithValue}) => {
        try {
            const data = await getCashFlows(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const addCashFlow = createAsyncThunk(
    'cashFlow/addCashFlow',
    async (cashFlowData, {rejectWithValue}) => {
        try {
            const data = await createCashFlow(cashFlowData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const editCashFlow = createAsyncThunk(
    'cashFlow/editCashFlow',
    async ({id, cashFlowData}, {rejectWithValue}) => {
        try {
            const data = await updateCashFlow(id, cashFlowData);
            return {id, changes: data};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const removeCashFlow = createAsyncThunk(
    'cashFlow/removeCashFlow',
    async (id, {rejectWithValue}) => {
        try {
            await deleteCashFlow(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchCashFlowStats = createAsyncThunk(
    'cashFlow/fetchCashFlowStats',
    async (filters, {rejectWithValue}) => {
        try {
            const data = await getCashFlowStats(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const cashFlowSlice = createSlice({
    name: 'cashFlow',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCashFlows.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCashFlows.fulfilled, (state, action) => {
                cashFlowsAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchCashFlows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addCashFlow.pending, (state) => {
                state.operationLoading = true;
            })
            .addCase(addCashFlow.fulfilled, (state, action) => {
                cashFlowsAdapter.addOne(state, action.payload);
                state.operationLoading = false;
            })
            .addCase(addCashFlow.rejected, (state, action) => {
                state.operationLoading = false;
                state.error = action.payload;
            })

            .addCase(editCashFlow.pending, (state) => {
                state.operationLoading = true;
            })
            .addCase(editCashFlow.fulfilled, (state, action) => {
                cashFlowsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload.changes
                });
                state.operationLoading = false;
            })
            .addCase(editCashFlow.rejected, (state, action) => {
                state.operationLoading = false;
                state.error = action.payload;
            })

            .addCase(removeCashFlow.pending, (state) => {
                state.operationLoading = true;
            })
            .addCase(removeCashFlow.fulfilled, (state, action) => {
                cashFlowsAdapter.removeOne(state, action.payload);
                state.operationLoading = false;
            })
            .addCase(removeCashFlow.rejected, (state, action) => {
                state.operationLoading = false;
                state.error = action.payload;
            })

            // Статистика
            .addCase(fetchCashFlowStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            });
    }
});

export const {
    selectAll: selectAllCashFlows,
    selectById: selectCashFlowById,
    selectIds: selectCashFlowIds,
} = cashFlowsAdapter.getSelectors((state) => state.cashFlow);

export const {clearError} = cashFlowSlice.actions;
export const selectCashFlowStatus = (state) => state.cashFlow.status;

export default cashFlowSlice.reducer;