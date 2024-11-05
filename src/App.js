import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployeeModal from './components/AddEmployeeModal';
import SearchEmployeeModal from './components/SearchEmployeeModal';
import './styles/App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleAddEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  return (
    <div className="App">
      <h1>Employee List</h1>
      <button onClick={() => setShowAddModal(true)}>Add Employee</button>
      <button onClick={() => setShowSearchModal(true)} style={{ marginLeft: '8px' }}>Search Employee</button>

      {showAddModal && (
        <AddEmployeeModal 
          onAddEmployee={handleAddEmployee} 
          onClose={() => setShowAddModal(false)} 
        />
      )}
      
      {showSearchModal && (
        <SearchEmployeeModal 
          onAddEmployee={handleAddEmployee} 
          onClose={() => setShowSearchModal(false)} 
        />
      )}
      
      <EmployeeList employees={employees} />
    </div>
  );
}

export default App;
