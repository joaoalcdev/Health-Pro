import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { brStateDatas, roleOptions, specialties, councilDatas } from '../Datas';
import { InputMaskComp } from '../Form';
import { set } from 'rsuite/esm/utils/dateUtils';

function AddProfessionalModal({ closeModal, isOpen, doctor, datas }) {
  const [instraction, setInstraction] = useState(sortsDatas.title[0]);

  const [fullName, setFullName] = useState("")
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

  const [specialty, setSpecialty] = useState(specialties.specialty[0]);
  const [council, setCouncil] = useState(councilDatas.council[0]);

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);


  const onSubmit = () => {
    toast.error('This feature is not available yet');
  };

  const handleChangeStep = () => {
    if (step2) {
      setStep2(false);
      setStep1(true);
    } else {
      setStep1(false);
      setStep2(true);
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={'Adicionar Profissional'}
      width={'max-w-3xl'}
    >{step1 ? <>
      <h1 className='text-md font-light mb-4'>Passo 1: Informações do Usuário</h1>
      <div className="flex-colo gap-6">
        <Input label="Nome Completo" color={true} />

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Primeiro Name" color={true} placeholder="John" />
          <Input label="Sobrenome" color={true} placeholder="Doe" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Email" color={true} />
          <InputMaskComp
            label="Telefone"
            color={true}
            mask="(99) 9 9999-9999"
            placeholder={'(__) _ ____-____'}
            unmask={true}
            required={true}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Endereço" color={true} />
          <Input label="Bairro" color={true} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input label="Cidade" color={true} />
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
          {/* password */}
          <Input label="Password" color={true} />
        </div>
        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button label="Próximo" Icon={HiArrowRight} onClick={handleChangeStep} />
        </div>
      </div>
    </>
      : <>
        <h1 className='text-md font-light mb-4'>Passo 2: Informações Profissionais</h1>

        <div className="flex-colo gap-6">
          {/* specialty and  council*/}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Especialidade</p>
              <Select
                selectedPerson={specialty}
                setSelectedPerson={setSpecialty}
                datas={specialties.specialty}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {specialty.name}<BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Conselho</p>
              <Select
                selectedPerson={council}
                setSelectedPerson={setCouncil}
                datas={councilDatas.council}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {council.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input label="Numero do Conselho" color={true} />
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Conselho (UF)</p>
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


          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button
              onClick={handleChangeStep}
              className="bg-subMain bg-opacity-5 text-subMain border text-sm p-3 rounded-lg font-light"
            >
              Voltar
            </button>
            <Button label="Save" Icon={HiOutlineCheckCircle} onClick={onSubmit} />
          </div>
        </div>


      </>}
    </Modal>
  );
}

export default AddProfessionalModal;
