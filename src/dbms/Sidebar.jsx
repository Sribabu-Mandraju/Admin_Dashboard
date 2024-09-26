import React from 'react';

const Sidebar = ({ tables, currentTable, setCurrentTable, createNewTable }) => {
  return (
    <div className="w-64 bg-gray-800 h-full sticky top-0  text-white">
      <h2 className="text-2xl font-bold p-4">Tables</h2>
      <ul>
        {tables.map((table, index) => (
          <li
            key={index}
            onClick={() => setCurrentTable(index)}
            className={`p-4 text-white cursor-pointer ${currentTable === index ? 'bg-gray-600' : 'bg-gray-800 hover:bg-gray-600'}`}
          >
            {table.tableName}
          </li>
        ))}
        <li
          onClick={createNewTable}
          className="p-4 cursor-pointer bg-green-500 hover:bg-green-400 mt-4"
        >
          Create New Table
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
