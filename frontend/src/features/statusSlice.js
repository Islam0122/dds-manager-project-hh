import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import {
  createStatus,
  deleteStatus,
  getStatuses,
  updateStatus
} from "../api/statusApi.js";

const statusesAdapter = createEntityAdapter({
  selectId: (status) => status.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = statusesAdapter.getInitialState({
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  lastFetch: null
});

export const fetchStatuses = createAsyncThunk(
  'status/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStatuses();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addStatus = createAsyncThunk(
  'status/add',
  async (statusData, { rejectWithValue }) => {
    try {
      const response = await createStatus(statusData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editStatus = createAsyncThunk(
  'status/edit',
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const response = await updateStatus(id, statusData);
      return { id, changes: response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeStatus = createAsyncThunk(
  'status/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStatus(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    resetStatusError: (state) => {
      state.error = null;
    },
    resetStatusState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        statusesAdapter.setAll(state, action.payload);
        state.loading = 'succeeded';
        state.lastFetch = Date.now();
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      .addCase(addStatus.fulfilled, (state, action) => {
        statusesAdapter.addOne(state, action.payload);
      })

      .addCase(editStatus.fulfilled, (state, action) => {
        statusesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload.changes
        });
      })
        .addCase(removeStatus.fulfilled, (state, action) => {
        statusesAdapter.removeOne(state, action.payload);
      });
  }
});

export const {
  selectAll: selectAllStatuses,
  selectById: selectStatusById,
  selectIds: selectStatusIds
} = statusesAdapter.getSelectors(state => state.status);

export const selectStatusLoading = (state) => state.status.loading;
export const selectStatusError = (state) => state.status.error;
export const selectLastFetch = (state) => state.status.lastFetch;
export const { resetStatusError, resetStatusState } = statusSlice.actions;
export default statusSlice.reducer;