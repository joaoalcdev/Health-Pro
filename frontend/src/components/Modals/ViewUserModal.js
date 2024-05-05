import React, { useState } from 'react';
import Modal from './Modal';
import { FaRegEdit } from "react-icons/fa";
import { Button } from '../Form';

import { toast } from 'react-hot-toast';

function ViewUserModal({ closeModal, isViewOpen, user }) {

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isViewOpen}
      title={'Visualisar Usuário'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6 pb-8">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div>
            <h1 className="font-bold">Nome</h1>
            <p>{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <h1 className="font-bold">Tipo de Usuário</h1>
            <p>{user.roleId === 1 ? "Super Admin" : user.roleId === 2 ? "Recepcionista" : "Prestador"}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div>
            <h1 className="font-bold">Telefone</h1>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <h1 className="font-bold">E-mail</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div>
            <h1 className="font-bold">Endereço</h1>
            <p>{user.address}, {user.region}</p>
          </div>
          <div>
            <h1 className="font-bold">Cidade(UF)</h1>
            <p>{user.city}({user.state})</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <button
          onClick={closeModal}
          className="bg-subMain bg-opacity-5 text-subMain text-sm p-4 rounded-lg font-light"
        >
          Voltar
        </button>
        <Button
          label="Editar"
          Icon={FaRegEdit}
        />
      </div>
    </Modal >
  );
}

export default ViewUserModal;
