// utils/api.js

const API_BASE_URL = 'https://reqres.in/api';

// Function to add a new employee
export async function addEmployee(name, job) {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, job }),
  });
  if (!response.ok) {
    throw new Error('Failed to add employee');
  }
  const data = await response.json();
  return data; // Return the new employee data
}

// Function to get an employee by ID
export async function getEmployeeById(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employee');
  }
  const data = await response.json();
  return data.data; // Returns the employee details
}
