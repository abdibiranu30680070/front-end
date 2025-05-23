import React, { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserRole, deleteUser } from '../api/api';
import '../styles/adminuser.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();  // Ensure this API call works and returns user data
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      // Update the user role through API
      await updateUserRole(userId, newRole); 
      
      // Update the state with the new role
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError('Failed to update role');
    }
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        // Delete the user through API
        await deleteUser(userId);
        
        // Update the state by filtering out the deleted user
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  return (
    <div className="management-container">
      <h2>User Management</h2>
      
      {/* Show error message if there's an error */}
      {error && <div className="error-banner">{error}</div>}
      
      {/* Show loading message if data is being fetched */}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through users and render their information */}
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
