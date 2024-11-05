import React from 'react';
import EmployeeCard from './EmployeeCard';
import '../styles/App.css';


function EmployeeList({ employees }) {
  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default EmployeeList;
