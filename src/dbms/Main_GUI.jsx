import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DataTable from './DataTable';

const Main_GUI = () => {
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableColumns, setNewTableColumns] = useState('');

  const createNewTable = () => {
    const columnNames = newTableColumns.split(',').map(column => column.trim()).filter(column => column);
    
    const table = {
      tableName: newTableName,
      columns: columnNames.map(name => ({ name, type: 'text' })), // Assuming all columns are of type 'text'
      data: [],
    };

    setTables([...tables, table]);
    setNewTableName('');
    setNewTableColumns('');
    setIsCreatingTable(false);
  };

  const updateTableData = (tableName, updatedData) => {
    const updatedTables = tables.map((table) =>
      table.tableName === tableName ? { ...table, data: updatedData } : table
    );
    setTables(updatedTables);
  };

  const currentTableData = currentTable !== null ? tables[currentTable] : null;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        tables={tables}
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
        createNewTable={() => setIsCreatingTable(true)}
      />
      <div className="flex-1 p-6">
        {isCreatingTable && (
          <div className="bg-gray-800 p-6 rounded shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Create New Table</h2>
            <input
              type="text"
              placeholder="Table Name"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              className="w-full border border-green-500 bg-gray-700 text-white p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="Column Names (comma separated)"
              value={newTableColumns}
              onChange={(e) => setNewTableColumns(e.target.value)}
              className="w-full border border-green-500 bg-gray-700 text-white p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button onClick={createNewTable} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
              Create Table
            </button>
            <button
              onClick={() => setIsCreatingTable(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded ml-2 hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        )}
        {currentTableData && (
          <DataTable table={currentTableData} onUpdateData={updateTableData} />
        )}
      </div>
    </div>
  );
};

export default Main_GUI;
