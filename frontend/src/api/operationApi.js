import { fetchData, createData, updateData, deleteData } from './api';

export const getOperationTypes = (filters = {}) => fetchData('operation-types', filters);
export const createOperationType = (data) => createData('operation-types', data);
export const updateOperationType = (id, data) => updateData('operation-types', id, data);
export const deleteOperationType = (id) => deleteData('operation-types', id);
