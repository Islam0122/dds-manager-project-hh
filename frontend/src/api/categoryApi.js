import { fetchData, createData, updateData, deleteData } from './api';

export const getCategories = (filters = {}) => fetchData('categories', filters);
export const createCategory = (data) => createData('categories', data);
export const updateCategory = (id, data) => updateData('categories', id, data);
export const deleteCategory = (id) => deleteData('categories', id);
