import React, { useState } from 'react';
import FormModal from './FormModal';
import * as XLSX from 'xlsx'; // Import the xlsx library

const DataTable = ({ table, onUpdateData }) => {
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormChange = (e, column) => {
    setFormData({ ...formData, [column.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const updatedData = table.data.map((row, index) =>
        index === editIndex ? formData : row
      );
      onUpdateData(table.tableName, updatedData);
      setIsEdit(false);
    } else {
      onUpdateData(table.tableName, [...table.data, formData]);
    }
    setFormData({});
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(table.data[index]);
    setEditIndex(index);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedData = table.data.filter((_, i) => i !== index);
    onUpdateData(table.tableName, updatedData);
  };

  // Function to handle downloading the table data as an Excel file
  const handleDownloadExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Create a worksheet from the table data
    const ws = XLSX.utils.json_to_sheet(table.data);
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, table.tableName);
    // Generate a download link and trigger the download
    XLSX.writeFile(wb, `${table.tableName}.xlsx`);
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{table.tableName}</h2>
      <button
        onClick={handleDownloadExcel}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Download Excel
      </button>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded mb-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Add Data</h3>
        {table.columns.map((column, index) => (
          <div key={index} className="mb-4">
            <label className="block text-lg">{column.name}</label>
            <input
              type={column.type === 'number' ? 'number' : 'text'}
              value={formData[column.name] || ''}
              onChange={(e) => handleFormChange(e, column)}
              className="w-full bg-gray-700 text-gray-200 border border-green-500 p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {isEdit ? 'Update' : 'Submit'}
        </button>
      </form>

      <table className="w-full bg-gray-800 shadow-lg rounded">
        <thead className="bg-green-600 text-white">
          <tr>
            {table.columns.map((column, index) => (
              <th key={index} className="py-2 text-left px-4 border-b border-green-500">{column.name}</th>
            ))}
            <th className="py-2 px-4 text-left border-b border-green-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {table.data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-700">
              {table.columns.map((column, index) => (
                <td key={index} className="py-2 px-4 border-b border-gray-700">{row[column.name]}</td>
              ))}
              <td className="py-2 px-4 border-b border-gray-700">
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleEdit(rowIndex)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(rowIndex)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormModal
        isOpen={isModalOpen}
        formData={formData}
        columns={table.columns}
        setIsModalOpen={setIsModalOpen}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </div>
  );
};

export default DataTable;
