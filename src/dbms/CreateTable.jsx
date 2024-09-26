import React, { useState } from 'react';
import { toast } from 'react-hot-toast';


const CreateTableForm = ({ addTable }) => {
  const [tableName, setTableName] = useState('');
  const [numColumns, setNumColumns] = useState('');
  const [columns, setColumns] = useState([]);
  const [step, setStep] = useState(1);

  const handleSubmitTable = (e) => {
    e.preventDefault();
    setStep(2);
    toast.success('This is a success message!');
    setColumns(Array.from({ length: parseInt(numColumns) }, () => ({ name: '', type: '' })));
  };

  const handleSubmitColumns = (e) => {
    e.preventDefault();
    addTable(tableName, columns);
    setTableName('');
    setNumColumns('');
    toast.success('This is a success message!');
    setStep(1);
  };

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = columns.map((col, i) =>
      i === index ? { ...col, [field]: value } : col
    );
    setColumns(updatedColumns);
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-lg text-white">
      {step === 1 ? (
        <form onSubmit={handleSubmitTable}>
          <h2 className="text-2xl font-bold mb-4 text-green-500">Create Table</h2>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full border border-green-500 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Number of Columns</label>
            <input
              type="number"
              value={numColumns}
              onChange={(e) => setNumColumns(e.target.value)}
              className="w-full border border-green-500 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitColumns}>
          <h2 className="text-2xl font-bold mb-4 text-green-500">Define Columns</h2>
          {columns.map((column, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 text-lg">Column {index + 1} Name</label>
              <input
                type="text"
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                className="w-full border border-green-500 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <label className="block mt-2 text-lg">Data Type</label>
              <select
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                className="w-full border border-green-500 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Data Type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
            </div>
          ))}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Create Table
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTableForm;
