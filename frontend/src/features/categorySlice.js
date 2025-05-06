import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/categoryApi.js';

const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name) // Сортировка по имени
});

const initialState = categoriesAdapter.getInitialState({
  loading: false,
  operationLoading: false,
  error: null,
  lastModified: null,
});

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const data = await createCategory(categoryData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const data = await updateCategory(id, categoryData);
      return { id, changes: data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    resetCategories: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        categoriesAdapter.setAll(state, action.payload);
        state.loading = false;
        state.lastModified = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCategory.pending, (state) => {
        state.operationLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        categoriesAdapter.addOne(state, action.payload);
        state.operationLoading = false;
        state.lastModified = Date.now();
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      .addCase(editCategory.pending, (state) => {
        state.operationLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        categoriesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload.changes
        });
        state.operationLoading = false;
        state.lastModified = Date.now();
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      .addCase(removeCategory.pending, (state) => {
        state.operationLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        categoriesAdapter.removeOne(state, action.payload);
        state.operationLoading = false;
        state.lastModified = Date.now();
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });
  }
});

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.category);

export const selectCategoriesLoading = (state) => state.category.loading;
export const selectCategoriesError = (state) => state.category.error;
export const selectLastModified = (state) => state.category.lastModified;

export const { clearCategoryError, resetCategories } = categorySlice.actions;

export default categorySlice.reducer;