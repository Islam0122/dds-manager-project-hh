import { fetchData, createData, updateData, deleteData } from './api';

export const getSubcategories = (filters = {}) => fetchData('subcategories', filters);
export const createSubcategory = (data) => createData('subcategories', data);
export const updateSubcategory = (id, data) => updateData('subcategories', id, data);
export const deleteSubcategory = (id) => deleteData('subcategories', id);
