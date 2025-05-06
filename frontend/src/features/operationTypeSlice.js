import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOperationTypes,
  createOperationType,
  updateOperationType,
  deleteOperationType,
} from '../api/operationApi';

export const fetchOperationTypes = createAsyncThunk(
  'operationType/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getOperationTypes();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOperationType = createAsyncThunk(
  'operationType/add',
  async (data, { rejectWithValue }) => {
    try {
      return await createOperationType(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editOperationType = createAsyncThunk(
  'operationType/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateOperationType(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeOperationType = createAsyncThunk(
  'operationType/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteOperationType(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const operationTypeSlice = createSlice({
  name: 'operationType',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperationTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperationTypes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchOperationTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOperationType.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editOperationType.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeOperationType.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  }
});

export default operationTypeSlice.reducer;
