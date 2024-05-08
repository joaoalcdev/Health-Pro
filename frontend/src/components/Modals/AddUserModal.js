import React, { useState, useEffect } from 'react';
import { createUser } from '../../api/UsersAPI';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { roleOptions, brStateDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { PiPassword } from "react-icons/pi";
import { toast } from 'react-hot-toast';


function AddUserModal({ closeModal, isOpen, datas, isAdd, status }) {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [region, setRegion] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(brStateDatas.states[7]);
  const [password, setPassword] = useState("")
  const [roleId, setRoleId] = useState(roleOptions.roles[1]);

  useEffect(() => {
    if (datas) {
      setFirstName(datas.firstName || "");
      setLastName(datas.lastName || "");
      setEmail(datas.email || "");
      setPhoneNumber(datas.phoneNumber || "");
      setAddress(datas.address || "");
      setRegion(datas.region || "");
      setCity(datas.city || "");
      setState(brStateDatas.states[datas.state - 1] || brStateDatas.states[7]);
      setRoleId(roleOptions.roles[datas.roleId - 1] || roleOptions.roles[1]);
    }
  }, [datas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdd) {
      toast.error("Editar usuario falta implementar")
      console.log(datas.id, roleId, state, firstName, lastName, email, phoneNumber, address, region, city)
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
      //closeModal(true)
      //status(true)
      toast.success("Usuário criado com sucesso!", {
        position: "top-center",
      })
    }
  };

  const handleResetPassword = () => {
    setPassword("senha1234")
    console.log(datas.id)
    toast.success("Senha redefinida com sucesso!")
  };


  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.firstName ? 'Editar Usuário' : 'Adicionar Usuário'}
      width={'max-w-3xl'}
    >
      <form >

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
              disabled={!isAdd ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Telefone"
              color={true}
              placeholder="( )_____-____"
              required={true}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {state.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>

          </div>

          {/* password and permission*/}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {isAdd ? <Input
              label="Definir senha"
              color={true}
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> : <div className='text-sm'>
              <h1 className='mb-3'>Senha</h1>
              <button
                type='button'
                onClick={handleResetPassword}
                className="bg-subMain bg-opacity-5 text-subMain border w-full text-sm p-4 rounded-lg font-light"
              >
                Redefinir Senha
              </button>
            </div>}
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Permissão</p>
              <Select
                selectedPerson={roleId}
                setSelectedPerson={setRoleId}
                datas={roleOptions.roles}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
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
              onClick={handleSubmit}
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
