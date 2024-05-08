import React, { useEffect, useState } from 'react';
import { createUser } from '../../api/UsersAPI';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { roleOptions, brStateDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { InputMaskComp } from '../Form';


function AddUserModal({ closeModal, isOpen, user, datas, lenght, isAdd, status }) {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [region, setRegion] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(brStateDatas.states[5]);
  const [password, setPassword] = useState("")
  const [roleId, setRoleId] = useState(roleOptions.roles[1]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdd) {
      toast.error("Editar usuario falta implementar")
    } else {
      await createUser(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          roleId: roleId.id,
          address: address,
          region: region,
          city: city,
          state: state.UF,
        }
      )
      closeModal(true)
      status(true)
      toast.success("Usuário criado com sucesso!", {
        position: "top-center",
      })
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Editar Usuário' : 'Adicionar Usuário'}
      width={'max-w-3xl'}
    >
      <form onSubmit={handleSubmit}>

        <div className="flex-colo gap-6">
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input
              label="Primeiro nome"
              color={true}
              required={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Sobrenome"
              color={true}
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type="email"
              label="Email"
              color={true}
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputMaskComp
              label="Telefone"
              color={true}
              mask="(99) 9 9999-9999"
              placeholder={'(__) _ ____-____'}
              required={true}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input
              label="Endereço"
              color={true}
              required={true}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              label="Bairro"
              color={true}
              required={true}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <Input
              label="Cidade"
              color={true}
              required={true}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Estado</p>
              <Select
                selectedPerson={state}
                setSelectedPerson={setState}
                datas={brStateDatas.states}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {state.name} ({state.UF}) <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>

          </div>

          {/* password and permission*/}
          <div className="grid sm:grid-cols-2 gap-4 w-full mb-6">
            <Input
              label="Definir senha"
              color={true}
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Permissão</p>
              <Select
                selectedPerson={roleId}
                setSelectedPerson={setRoleId}
                datas={roleOptions.roles}
              >
                <div className="w-full flex-btn text-black text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {roleId.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
          </div>


          {/* buttons */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button
              onClick={closeModal}
              className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
            >
              Cancel
            </button>
            <Button
              label="Salvar"
              Icon={HiOutlineCheckCircle}
            />
          </div>
        </div>
      </form>

    </Modal>
  );
}

export default AddUserModal;
