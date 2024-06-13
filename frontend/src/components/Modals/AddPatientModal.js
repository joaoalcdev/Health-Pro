import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { brStateDatas, genderDatas, maritalDatas } from '../Datas';
import { InputMaskComp, ButtonNegative, DatePickerComp } from '../Form';
import { createPatient } from '../../api/PatientsAPI';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { HiArrowLeft, HiMiniXMark } from 'react-icons/hi2';

import ptBR from 'date-fns/locale/pt-BR';



registerLocale('pt', ptBR);
setDefaultLocale('pt');

function AddPatientModal({ closeModal, isOpen, patient, datas, status }) {
  const [loading, setLoading] = useState(false);


  // patient info
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);
  const [marital, setMarital] = useState(maritalDatas.marital[2]);
  const [dateBirth, setDateBirth] = useState(new Date());
  const [gender, setGender] = useState(genderDatas.gender[2]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(brStateDatas.states[5]);

  // family info
  const [paternalFiliation, setPaternalFiliation] = useState('');
  const [maternalFiliation, setMaternalFiliation] = useState('');
  const [paternalFiliationContact, setPaternalFiliationContact] = useState('');
  const [maternalFiliationContact, setMaternalFiliationContact] = useState('');

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (
    //   !fullName
    // ) {
    //   return toast.error('Favor, informe o nome do paciente!',
    //     {
    //       position: "top-center",
    //     }
    //   );
    // }
    // if (
    //   !cpf || cpf.length < 11
    // ) {
    //   return toast.error('Favor, informe o CPF do paciente!',
    //     {
    //       position: "top-center",
    //     }
    //   );
    // }
    // informe ao menos um telefone
    // if ((!phoneNumber && !emergencyContact) || (phoneNumber.length < 11 && emergencyContact.length < 11)) {
    //   return toast.error('Informe ao menos um telefone de contato!',
    //     {
    //       position: "top-center",
    //     }
    //   );
    // }
    // setLoading(true);


    const response = await createPatient(
      {
        fullName,
        cpf,
        // age,
        bloodType: bloodType.id,
        marital: marital.id,
        gender: gender.id,
        dateBirth,
        phoneNumber,
        emergencyContact,
        address,
        region,
        city,
        state: state.id,
        paternalFiliation,
        maternalFiliation,
        paternalFiliationContact,
        maternalFiliationContact
      }
    )

    if (response.response && response.response.data.code === 4001) {
      toast.error("CPF existente", {
        position: "top-center",
      })
      setLoading(false)
      return
    }
    if (response.status && response.status === 200) {
      toast.success("Paciente criado com sucesso!", {
        position: "top-center",
      })
      status(true)
      closeModal(true)
      setLoading(false);
    } else {
      toast.error("Erro ao cadastrar novo paciente, tente novamente!", {
        position: "top-center",
      })
      setLoading(false);
    }
  }

  const handleChangeStep = (e) => {
    e.preventDefault();
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
      title={'Adicionar Paciente'}
      width={'max-w-6xl'}
      height={'sm:min-h-[73svh]'}
    > <>
        {step1 ? <>
          <form onSubmit={handleChangeStep} className=''>
            <h1 className='text-md font-light mb-4'>Passo 1: Informações pessoais do Paciente</h1>
            <div className="flex-colo gap-6">
              <div className="grid sm:grid-cols-3 gap-4 w-full">
                {/* Full Name */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Nome Completo
                    <span className='text-required'>*</span>
                  </p>
                  <Input
                    color={true}
                    required={true}
                    placeholder="Maria..."
                    type={'text'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                {/* CPF */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    CPF
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <InputMaskComp
                    color={true}
                    mask="999.999.999-99"
                    autoClear={true}
                    placeholder={'___.___.___-__'}
                    unmask={true}
                    required={false}
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Data de Nascimento
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  {/* DatePicker */}
                  <DatePickerComp
                    color={true}
                    showYearDropdown={true}
                    scrollableYearDropdown={true}
                    closeOnScroll={true}
                    popperPlacement="top-end"
                    yearDropdownItemNumber={80}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={'__/__/____'}
                    locale="pt"
                    startDate={dateBirth}
                    onChange={(dateBirth) => setDateBirth(dateBirth)}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 w-full">
                <div className="flex w-full flex-col gap-1">
                  <p className="text-black text-sm">
                    Tipo Sanguíneo
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Select
                    selectedPerson={bloodType}
                    setSelectedPerson={setBloodType}
                    datas={sortsDatas.bloodTypeFilter}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded focus:border focus:border-subMain overflow-auto">
                      {bloodType.name} <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <p className="text-black text-sm">
                    Estado Civil
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Select
                    selectedPerson={marital}
                    setSelectedPerson={setMarital}
                    datas={maritalDatas.marital}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded focus:border focus:border-subMain overflow-auto">
                      {marital.name} <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <p className='pl-1 text-sm text-black'>
                    Gênero
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Select
                    selectedPerson={gender}
                    setSelectedPerson={setGender}
                    datas={genderDatas.gender}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded focus:border focus:border-subMain overflow-auto">
                      {gender.name}<BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {/* Tel */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Telefone de Contato
                    {/* <span className='text-warn'>*</span> */}
                  </p>
                  <InputMaskComp
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    autoClear={true}
                    required={false}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
                {/* Emergncy Contact */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Telefone de emergência
                    {/* <span className='text-warn'>*</span> */}
                  </p>
                  <InputMaskComp
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    required={false}
                    autoClear={true}
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {/* Address */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Endereço
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Input
                    color={true}
                    required={false}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={'Rua, Número'}
                  />
                </div>
                {/* Region */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Bairro
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Input
                    color={true}
                    required={false}
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder={'Centro'}
                  />
                </div>
                {/* City */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Cidade
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Input
                    color={true}
                    required={false}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={'Russas'}
                  />
                </div>
                {/* State */}
                <div className="flex w-full flex-col gap-1">
                  <p className='pl-1 text-sm text-black'>
                    Estado
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Select
                    selectedPerson={state}
                    setSelectedPerson={setState}
                    datas={brStateDatas.states}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded focus:border focus:border-subMain overflow-auto">
                      {state.name} ({state.UF}) <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
              </div>
            </div>
            {/* buttones */}
            <div className="pt-8 grid sm:grid-cols-2 gap-4 w-full">
              {/* <button
                className='gap-4 w-full bg-red-400 bg-opacity-5 text-red-400 border border-red-400 text-sm p-3 rounded font-light hover:bg-opacity-25 hover:text-red-700 transition-color duration-300'
                onClick={closeModal}
              >
                <p className='flex flex-row w-full justify-center items-center text-center text-sm font-medium'>
                  Cancelar
                  <HiMiniXMark className='text-xl mx-2' />
                </p>
              </button> */}
              <ButtonNegative label="Cancelar" onClick={closeModal} />
              <Button label="Próximo" Icon={HiArrowRight} loading={loading} disable={loading} />
            </div>
            {/* </div> */}
          </form>
        </> :
          <form onSubmit={handleSubmit}>
            <h1 className='text-md font-light mb-4'>Passo 2: Informações dos familiares do paciente</h1>
            <div className="flex-colo gap-6">
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {/* paternalFiliation */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Filiação Paterna
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Input
                    color={true}
                    required={false}
                    value={paternalFiliation}
                    onChange={(e) => setPaternalFiliation(e.target.value)}
                    placeholder={'Joaquim Bezerra'}
                  />
                </div>
                {/* maternalFiliation */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Filiação Materna
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <Input
                    color={true}
                    required={false}
                    value={maternalFiliation}
                    onChange={(e) => setMaternalFiliation(e.target.value)}
                    placeholder={'Lúcia Agostinho'}
                  />
                </div>
                {/* paternalFiliationContact */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Contato do responsável 1
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <InputMaskComp
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    autoClear={true}
                    required={false}
                    value={paternalFiliationContact}
                    onChange={(e) => setPaternalFiliationContact(e.target.value)}
                    className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
                {/* maternalFiliationContact */}
                <div className=''>
                  <p className='pl-1 mb-[-7px] text-sm text-black'>
                    Contato do responsável 2
                    {/* <span className='text-required'>*</span> */}
                  </p>
                  <InputMaskComp
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    autoClear={true}
                    required={false}
                    value={maternalFiliationContact}
                    onChange={(e) => setMaternalFiliationContact(e.target.value)}
                    className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
              </div>

              {/* buttones */}
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className='flex flex-row w-full'>
                  <button
                    className='gap-4 w-full bg-subMain bg-opacity-5 text-subMain border border-subMain text-sm p-3 rounded font-light hover:bg-opacity-25 hover:text-subMain transition-color duration-300'
                    onClick={handleChangeStep}
                  >
                    <p className='flex flex-row w-full justify-center items-center text-center text-sm font-medium'>
                      Voltar
                      <HiArrowLeft className='text-xl mx-2' />
                    </p>
                  </button>
                </div>
                <Button label="Cadastrar" disable={loading} loading={loading} Icon={HiOutlineCheckCircle} />
              </div>
            </div>
          </form>
        }
      </>

    </Modal>
  );
}

export default AddPatientModal;
