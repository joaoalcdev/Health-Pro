// dependencies - import
import React, { useState, useEffect } from 'react';

// components - import
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import { Button, Input, InputFilterSelect, SelectListBox, InputMaskComp } from '../Form';

// datas - import
import { sortsDatas, roleOptions, brStateDatas, genderDatas } from '../Datas';

// api - import
import { createUser, updateUser } from '../../api/UsersAPI';

// icons
import { PiPassword } from "react-icons/pi";
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';

// utils



function AddUserModal({ closeModal, isOpen, datas, isAdd, status }) {

  const [loading, setLoading] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [region, setRegion] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(brStateDatas.states[5]);
  const [gender, setGender] = useState(genderDatas.gender[2])
  const [password, setPassword] = useState("")
  const [roleId, setRoleId] = useState(roleOptions.roles[1]);

  const roles = roleOptions.roles.filter((role) => {
    if (role.id !== 3) {
      return role
    }
  })

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
    setLoading(true)
    if (!isAdd) {
      await updateUser(datas.id,
        {
          id: datas.id,
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          roleId: roleId.id,
          address,
          region,
          city,
          state: state.id,
          gender: gender.id,
        }
      )

      closeModal(true)
      status(true)
      setLoading(false)
      toast.success("Usuário atualizado com sucesso!", {
        position: "top-center",
      })
    } else {
      const { data, error } = await createUser(
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          roleId: roleId.id,
          address,
          region,
          city,
          state: state.id,
          gender: gender.id,
        }
      )

      if (error) {
        if (error.response.status === 422) {
          toast.error("Email já cadastrado!")
        } else {
          toast.error("Erro ao criar usuário!")
        }
        setLoading(false)
        return
      }

      closeModal(true)
      status(true)
      setLoading(false)
      toast.success("Usuário criado com sucesso!", {
        position: "top-center",
      })
    }
  };

  const handleResetPassword = () => {
    setPassword("senha1234")
    toast.success("Senha redefinida com sucesso!")
  };

  // combo box
  const [query, setQuery] = useState('')

  const bloodTypeFilter =
    query === ''
      ? sortsDatas.bloodTypeFilter
      : sortsDatas.bloodTypeFilter.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })


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
              placeholder={'João'}
              color={true}
              required={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Sobrenome"
              placeholder={'Silva'}
              color={true}
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type="email"
              placeholder={'joao@gmail.com'}
              label="Email"
              color={true}
              required={true}
              disabled={!isAdd ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <InputMaskComp
                label={'Telefone'}
                color={true}
                autoClear={true}
                mask="(99) 9 9999-9999"
                placeholder={'(__) _ ____-____'}
                unmask={true}
                required={false}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
              />
              <div className="flex w-full flex-col">
                <SelectListBox
                  label={'Gênero'}
                  color={true}
                  selectedPerson={gender}
                  setSelectedPerson={setGender}
                  datas={genderDatas.gender}
                  iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                />
              </div>
            </div>

          </div>

          {/* Address*/}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Address */}
            <div className="flex w-full flex-col">
              <Input
                label={'Endereço'}
                color={true}
                required={false}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={'Rua, Número'}
              />
            </div>
            {/* Region */}
            <div className="flex w-full flex-col">
              <Input
                label={'Bairro'}
                color={true}
                required={false}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder={'Centro'}
              />
            </div>
            {/* City */}
            <div className="flex w-full flex-col">
              <Input
                label={'Cidade'}
                color={true}
                required={false}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={'Russas'}
              />
            </div>
            {/* State */}
            <div className="flex w-full flex-col">
              <InputFilterSelect
                label={'Estado'}
                color={true}
                selectedPerson={state}
                setSelectedPerson={setState}
                query={query}
                setQuery={setQuery}
                datas={brStateDatas.states}
                iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
              >
              </InputFilterSelect>
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
                className="bg-subMain bg-opacity-5 text-subMain border w-full text-sm p-4 rounded-lg flex space-x-4 justify-center  font-light"
              >
                <h1>Redefinir Senha</h1>
                <PiPassword className="text-xl" />
              </button>
            </div>}
            <div className="flex w-full flex-col">
              <SelectListBox
                label={'Gênero'}
                color={true}
                selectedPerson={roleId}
                setSelectedPerson={setRoleId}
                datas={roles}
                iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
              />
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
              disabled={loading}
              loading={loading}
              Icon={HiOutlineCheckCircle}
            />
          </div>
        </div>
      </form>

    </Modal>
  );
}

export default AddUserModal;
