const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const USER_API = `${API_BASE_URL}/user`;
export const RECORD_API = `${API_BASE_URL}/record`;
export const FILE_API = `${API_BASE_URL}/file`;

export default API_BASE_URL;
