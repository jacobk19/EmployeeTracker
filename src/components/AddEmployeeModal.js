import React, { useState } from 'react';
import Modal from 'react-modal';
import { addEmployee } from '../utils/api';

Modal.setAppElement('#root');

function AddEmployeeModal({ onAddEmployee, onClose }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [nameError, setNameError] = useState('');
  const [jobError, setJobError] = useState('');

  // Function to validate input for letters only
  const isLettersOnly = (input) => /^[a-zA-Z\s]+$/.test(input);

  const handleAddEmployee = async () => {
    let hasError = false;
    setNameError(''); // Reset name error
    setJobError('');  // Reset job error

    // Validate name input
    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else if (!isLettersOnly(name)) {
      setNameError('Only letters are allowed in the Name field');
      hasError = true;
    }

    // Validate job input
    if (!job.trim()) {
      setJobError('Job is required');
      hasError = true;
    } else if (!isLettersOnly(job)) {
      setJobError('Only letters are allowed in the Job field');
      hasError = true;
    }

    // If there are errors, stop function execution
    if (hasError) {
      console.log("Validation failed:", { nameError, jobError }); // Debugging log
      return;
    }

    // Proceed with adding employee if inputs are valid
    try {
      const newEmployee = await addEmployee(name, job);
      onAddEmployee(newEmployee);
      setName('');
      setJob('');
      setNameError('');
      setJobError('');
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Handlers for input changes with inline validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!value.trim()) {
      setNameError('Name is required');
    } else if (!isLettersOnly(value)) {
      setNameError('Only letters are allowed in the Name field');
    } else {
      setNameError('');
    }
  };

  const handleJobChange = (e) => {
    const value = e.target.value;
    setJob(value);
    if (!value.trim()) {
      setJobError('Job is required');
    } else if (!isLettersOnly(value)) {
      setJobError('Only letters are allowed in the Job field');
    } else {
      setJobError('');
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Add Employee"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Add New Employee</h2>
      <div className="modal">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        {nameError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{nameError}</p>}

        <input
          type="text"
          placeholder="Job"
          value={job}
          onChange={handleJobChange}
        />
        {jobError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{jobError}</p>}

        <button 
          onClick={handleAddEmployee}
          disabled={!name.trim() || !job.trim()}
        >
          Add Employee
        </button>
      </div>
    </Modal>
  );
}

export default AddEmployeeModal;
