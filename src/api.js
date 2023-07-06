
import axios from 'axios';

const API_BASE_URL = 'http://3.109.214.83:4000';

// Create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/employee/new`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Get the list of all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employeeList`);
        return response.data.data;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
};

// Get details of a specific user by ID
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employee/info/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error getting user details:', error);
        throw error;
    }
};

// Update a user
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/employee/edit/${userId}`, userData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/employee/del/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
