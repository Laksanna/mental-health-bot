import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const detectEmotion = async (imageBlob) => {
  const formData = new FormData();
  formData.append('file', imageBlob, 'webcam.jpg');
  
  const response = await axios.post(`${API_BASE_URL}/detect-emotion`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeader(),
    },
  });
  
  return response.data;
};

export const sendMessage = async (message, emotion) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, {
    message,
    emotion,
  }, {
    headers: getAuthHeader(),
  });
  
  return response.data;
};
