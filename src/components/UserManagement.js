
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    fetchUsers,
    createUserAsync,
    fetchUserById,
    updateUserAsync,
    deleteUserAsync,
    clearSelectedUser,
} from '../userSlice';
import { useTable } from 'react-table';
import './UserManagement.css';

const UserManagement = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { users, selectedUser, loading, error } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(createUserAsync(data))
            .then(() => {
                toast.success('User created successfully');
                reset();
            })
            .catch((error) => {
                toast.error(`Failed to create user: ${error.message}`);
            });
    };

    const handleEditUser = (userId) => {
        dispatch(fetchUserById(userId));
    };

    const handleUpdateUser = (data) => {
        dispatch(updateUserAsync({ userId: selectedUser._id, userData: data }))
            .then(() => {
                toast.success('User updated successfully');
                reset();
            })
            .catch((error) => {
                toast.error(`Failed to update user: ${error.message}`);
            });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUserAsync(userId))
                .then(() => {
                    toast.success('User deleted successfully');
                })
                .catch((error) => {
                    toast.error(`Failed to delete user: ${error.message}`);
                });
        }
    };

    const handleCancelEdit = () => {
        dispatch(clearSelectedUser());
        reset();
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Mobile Number', accessor: 'mobNum' },
            // Add more columns as needed
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="actions">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditUser(row.original._id)}
                        >
                            Edit
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteUser(row.original._id)}
                        >
                            Delete
                        </motion.button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: users });

    return (
        <div className="user-management">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"

                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="error">Name is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span className="error">Email is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="mobNum">Mobile Number</label>
                    <input
                        type="number"
                        id="mobNum"
                        placeholder="Enter mobile number"
                        {...register('mobNum', { required: true })}
                    />
                    {errors.mobNum && (
                        <span className="error">Mobile Number is required</span>
                    )}
                </div>

                <button type="submit">Create User</button>
            </form>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                toast.error(`Error: ${error}`)
            ) : (
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr
                                key={headerGroup.getHeaderGroupProps().key}
                                {...headerGroup.getHeaderGroupProps()}
                            >
                                {headerGroup.headers.map((column) => (
                                    <th
                                        key={column.getHeaderProps().key}
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <motion.tr
                                    key={row.getRowProps().key}
                                    {...row.getRowProps()}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {row.cells.map((cell) => (
                                        <td
                                            key={cell.getCellProps().key}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {selectedUser && (
                <div>
                    <h3>Edit User</h3>
                    <form onSubmit={handleSubmit(handleUpdateUser)}>
                        <div className="form-group">
                            <label htmlFor="edit-name">Name</label>
                            <input
                                type="text"
                                id="edit-name"
                                placeholder="Enter name"
                                defaultValue={selectedUser.name}
                                {...register('name', { required: true })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-email">Email</label>
                            <input
                                type="email"
                                id="edit-email"
                                placeholder="Enter email"
                                defaultValue={selectedUser.email}
                                {...register('email', { required: true })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-mobNum">Mobile Number</label>
                            <input
                                type="number"
                                id="edit-mobNum"
                                placeholder="Enter mobile number"
                                defaultValue={selectedUser.mobNum}
                                {...register('mobNum', { required: true })}
                            />
                        </div>

                        <button type="submit">Update User</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </form>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default UserManagement;







