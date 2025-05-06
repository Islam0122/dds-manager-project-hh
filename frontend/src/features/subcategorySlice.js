import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from '../api/subcategoryApi.js';

const subcategoriesAdapter = createEntityAdapter({
  selectId: (subcategory) => subcategory.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = subcategoriesAdapter.getInitialState({
  loading: 'idle',
  error: null,
  lastUpdated: null,
  operationLoading: false
});

export const fetchSubcategories = createAsyncThunk(
  'subcategory/fetchSubcategories',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await getSubcategories({ categoryId });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addSubcategory = createAsyncThunk(
  'subcategory/addSubcategory',
  async (subcategoryData, { rejectWithValue }) => {
    try {
      const data = await createSubcategory(subcategoryData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editSubcategory = createAsyncThunk(
  'subcategory/editSubcategory',
  async ({ id, subcategoryData }, { rejectWithValue }) => {
    try {
      const data = await updateSubcategory(id, subcategoryData);
      return { id, changes: data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeSubcategory = createAsyncThunk(
  'subcategory/removeSubcategory',
  async (id, { rejectWithValue }) => {
    try {
      await deleteSubcategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    clearSubcategoryError: (state) => {
      state.error = null;
    },
    resetSubcategories: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        subcategoriesAdapter.setAll(state, action.payload);
        state.loading = 'succeeded';
        state.lastUpdated = Date.now();
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      .addCase(addSubcategory.pending, (state) => {
        state.operationLoading = true;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        subcategoriesAdapter.addOne(state, action.payload);
        state.operationLoading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      .addCase(editSubcategory.pending, (state) => {
        state.operationLoading = true;
      })
      .addCase(editSubcategory.fulfilled, (state, action) => {
        subcategoriesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload.changes
        });
        state.operationLoading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(editSubcategory.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      .addCase(removeSubcategory.pending, (state) => {
        state.operationLoading = true;
      })
      .addCase(removeSubcategory.fulfilled, (state, action) => {
        subcategoriesAdapter.removeOne(state, action.payload);
        state.operationLoading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(removeSubcategory.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });
  }
});

export const {
  selectAll: selectAllSubcategories,
  selectById: selectSubcategoryById,
  selectIds: selectSubcategoryIds,
  selectEntities: selectSubcategoryEntities,
} = subcategoriesAdapter.getSelectors(state => state.subcategory);

export const selectSubcategoriesLoading = (state) => state.subcategory.loading;
export const selectSubcategoriesError = (state) => state.subcategory.error;
export const selectSubcategoriesLastUpdated = (state) => state.subcategory.lastUpdated;
export const selectSubcategoryOperationLoading = (state) => state.subcategory.operationLoading;
export const { clearSubcategoryError, resetSubcategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;