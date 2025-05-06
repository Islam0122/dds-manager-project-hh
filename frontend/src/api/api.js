import axios from 'axios';

const API_URL = 'https://django-server-production-8abc.up.railway.app/api/v1/';

// Универсальная функция для работы с API
const apiRequest = async (method, url, data = {}, params = {}) => {
  try {
    const config = {
      method,
      url: API_URL + url,
      data,
      params,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API Ошибка:', error);
    throw new Error('Произошла ошибка при запросе к серверу');
  }
};

// Универсальные функции для разных типов запросов (GET, POST, PUT, DELETE)
export const fetchData = async (resource, params) => {
  return await apiRequest('get', resource, {}, params);
};

export const createData = async (resource, data) => {
  return await apiRequest('post', resource, data);
};

export const updateData = async (resource, id, data) => {
  return await apiRequest('put', `${resource}/${id}`, data);
};

export const deleteData = async (resource, id) => {
  return await apiRequest('delete', `${resource}/${id}`);
};
