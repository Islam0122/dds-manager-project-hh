import { fetchData, createData, updateData, deleteData } from './api.js';

const resource = 'cashflows';

export const getCashFlows = (filters = {}) => fetchData(resource, filters);
export const createCashFlow = (data) => createData(resource, data);
export const updateCashFlow = (id, data) => updateData(resource, id, data);
export const deleteCashFlow = (id) => deleteData(resource, id);
export const getCashFlowStats = (filters = {}) => fetchData(`${resource}/statistics`, filters);