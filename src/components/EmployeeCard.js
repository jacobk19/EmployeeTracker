import React from 'react';

function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <div className="employee-info">
        <p className="label">Name:</p>
        <h3>{employee.name}</h3>
      </div>
      <div className="employee-info">
        <p className="label">Job:</p>
        <p>{employee.job}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
