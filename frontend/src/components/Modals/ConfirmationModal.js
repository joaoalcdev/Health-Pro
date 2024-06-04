import React from 'react';
import Modal from './Modal';

function ConfirmationModal({ title, closeModal, isOpen, onConfirm, question, user }) {

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={title}
      width={'max-w-xl'}
    >
      <div className="flex gap-6 pb-8">
        <div className="w-full">
          {question}
        </div>

      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <button
          onClick={closeModal}
          className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600  text-white text-sm p-4 rounded-lg font-light"
        >
          Deletar
        </button>
      </div>
    </Modal >
  );
}

export default ConfirmationModal;
