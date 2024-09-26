import React from 'react';
import Modal from 'react-modal';

const FormModal = ({ isOpen, formData, columns, setIsModalOpen, handleFormChange, handleSubmit, isEdit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      {/* <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Data' : 'Add Data'}</h2>
      <form onSubmit={handleSubmit}>
        {columns.map((column, index) => (
          <div key={index} className="mb-4">
            <label className="block text-lg">{column.name}</label>
            <input
              type={column.type === 'number' ? 'number' : 'text'}
              value={formData[column.name] || ''}
              onChange={(e) => handleFormChange(e, column)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? 'Update' : 'Submit'}
        </button>
        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
          Cancel
        </button>
      </form> */}
    </Modal>
  );
};

export default FormModal;
