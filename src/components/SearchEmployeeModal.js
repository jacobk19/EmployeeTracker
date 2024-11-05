import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function SearchEmployeeModal({ onAddEmployee, onClose }) {
  const [userId, setUserId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  // Validate input to only allow numbers
  const handleUserIdChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {  // Only allow digits (0-9)
      setUserId(value);
      setError(''); // Clear error if input is valid
    } else {
      setError('Only numbers are allowed');
    }
  };

  // Fetch employee data by ID
  const handleSearchEmployee = async () => {
    setError(''); // Clear previous errors
    setEmployee(null); // Reset previous employee data

    if (!userId.trim()) {
      setError('User ID is required');
      return;
    }

    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setEmployee(data.data);
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  // Add the searched employee to the main list
  const handleAddEmployee = () => {
    if (employee) {
      onAddEmployee({
        id: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
        job: 'Unknown' // Default or placeholder job, as API does not provide this
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Search Employee"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Search Employee</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={handleUserIdChange}
      />
      <button onClick={handleSearchEmployee}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {employee && (
        <div className="search-result">
          <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <img src={employee.avatar} alt={`${employee.first_name}'s avatar`} />
          <button className="modal-button" onClick={handleAddEmployee}>Add to Employee List</button>
        </div>
      )}
    </Modal>
  );
}

export default SearchEmployeeModal;
