// dependencies - import
import React from 'react';

// components - import
import Modal from './Modal';
import { Button } from '../Form';

// datas - import
import { brStateDatas } from '../Datas';

// api - import

// icons
import { FaRegEdit } from "react-icons/fa";

// utils


function ViewUserModal({ closeModal, isViewOpen, user, onEdit }) {

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isViewOpen}
      title={'Visualizar Usuário'}
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
            <p>{user.city} - ({user.state ? brStateDatas.states[user.state - 1].UF : ""})</p>
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
          onClick={() => onEdit(user)}
        />
      </div>
    </Modal >
  );
}

export default ViewUserModal;
