import { fetchData, createData, updateData, deleteData } from './api.js';

const resource = 'status';

export const getStatuses = (filters = {}) => fetchData(resource, filters);
export const createStatus = (data) => createData(resource, data);
export const updateStatus = (id, data) => updateData(resource, id, data);
export const deleteStatus = (id) => deleteData(resource, id);
