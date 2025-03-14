import React from 'react';
import Modal from './Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ButtonNegative } from '../Form';


function ConfirmationModal({ title, closeModal, isOpen, onConfirm, question, user, loading, type }) {

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
          className={`bg-red-600 text-white text-sm p-4 rounded font-light ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          Cancelar
        </button>
        <ButtonNegative label={type === 'remove' ? 'Remover' : 'Desativar'} disable={loading} loading={loading} Icon={type === 'remove' ? '' : RiDeleteBin6Line} onClick={onConfirm} />

      </div>
    </Modal >
  );
}

export default ConfirmationModal;
