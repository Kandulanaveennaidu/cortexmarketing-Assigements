import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from './api';

// Thunk action to fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await getUsers();
    return users;
});

// Thunk action to create a new user
export const createUserAsync = createAsyncThunk('users/createUser', async (userData) => {
    const user = await createUser(userData);
    return user;
});

// Thunk action to fetch a specific user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
    const user = await getUserById(userId);
    return user;
});

// Thunk action to update a user
export const updateUserAsync = createAsyncThunk('users/updateUser', async ({ userId, userData }) => {
    const user = await updateUser(userId, userData);
    return user;
});

//Thunk action to delete a user
export const deleteUserAsync = createAsyncThunk('users/deleteUser', async (userId) => {
    const response = await deleteUser(userId);
    return { userId, response };
});

// Create the users slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selectedUser: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.loading = false;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                state.loading = false;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                const { userId, response } = action.payload;
                state.users = state.users.filter((user) => user._id !== userId);
                state.loading = false;
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
