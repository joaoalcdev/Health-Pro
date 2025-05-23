// dependencies - import
import React, { useState } from 'react';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import clsx from 'clsx'

// components - import 
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import { Button, Input, InputMaskComp, ButtonNegative, DatePickerComp, InputFilterSelect, SelectListBox } from '../Form';

// datas - import
import { brStateDatas, genderDatas, maritalDatas, insuranceDatas, sortsDatas } from '../Datas';

// api - import
import { createPatient } from '../../api/PatientsAPI';

// icons - import
import { HiArrowLeft } from 'react-icons/hi2';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';



registerLocale('pt', ptBR);
setDefaultLocale('pt');

function AddPatientModal({ closeModal, isOpen, patient, datas, status }) {
  const [loading, setLoading] = useState(false);


  // patient info
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
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
  const [insurance, setInsurance] = useState(insuranceDatas.insurance[0]);
  const [cardNumber, setCardNumber] = useState('');

  // family info
  const [paternalFiliation, setPaternalFiliation] = useState('');
  const [maternalFiliation, setMaternalFiliation] = useState('');
  const [paternalFiliationContact, setPaternalFiliationContact] = useState('');
  const [maternalFiliationContact, setMaternalFiliationContact] = useState('');

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);


  // combo box
  const [query, setQuery] = useState('')

  const bloodTypeFilter =
    query === ''
      ? sortsDatas.bloodTypeFilter
      : sortsDatas.bloodTypeFilter.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createPatient(
      {
        fullName,
        cpf,
        rg,
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
        insurance: insurance.id,
        cardNumber,
        paternalFiliation,
        maternalFiliation,
        paternalFiliationContact,
        maternalFiliationContact
      }
    )

    if (response.response && response.response.data.code === "CPF001") {
      toast.error("CPF existente", {
        position: "top-center",
      })
      setLoading(false)
      return
    }
    if (response.response && response.response.data.code === "RG001") {
      toast.error("RG existente", {
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



  function handleInsurance() {
    if (insurance.id !== 1) {
      return (
        <>
          <div className="flex w-full flex-col">
            <Input
              label={'Nº Cartão (Convênio)'}
              color={true}
              required={false}
              placeholder={'9821498214949217'}
              type={'number'}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
        </>
      )
    }
  }


  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={'Adicionar Paciente'}
      width={'max-w-5xl'}
      height={'sm:max-h-screen sm:h-auto'}
    > <>
        {step1 ? <>
          <form onSubmit={handleChangeStep} className=''>
            <h1 className='text-md font-light mb-4'>Passo 1: Informações pessoais do Paciente</h1>
            <div className="flex-colo gap-6">
              <div className="grid sm:grid-cols-3 gap-4 w-full">
                {/* Full Name */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Nome Completo'}
                    color={true}
                    required={true}
                    placeholder="Maria de Lima..."
                    type={'text'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                {/* RG */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'RG'}
                    color={true}
                    required={false}
                    placeholder="___________"
                    type={'number'}
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </div>
                {/* CPF */}
                <div className="flex w-full flex-col">
                  <InputMaskComp
                    label={'CPF'}
                    color={true}
                    mask="999.999.999-99"
                    autoClear={true}
                    placeholder={'___.___.___-__'}
                    unmask={true}
                    required={false}
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="flex w-full flex-col">
                  {/* DatePicker */}
                  <DatePickerComp
                    label={'Data de Nascimento'}
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
                <div className="flex w-full flex-col">
                  {/* <Select
                    label={'Estado Civil'}
                    selectedPerson={marital}
                    color={true}
                    setSelectedPerson={setMarital}
                    datas={maritalDatas.marital}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded focus:border focus:border-subMain overflow-auto">
                      {marital.name} <BiChevronDown className="text-xl" />
                    </div>
                  </Select> */}
                  <SelectListBox
                    label={'Estado Civil'}
                    color={true}
                    selectedPerson={marital}
                    setSelectedPerson={setMarital}
                    datas={maritalDatas.marital}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>
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
                <div className="flex w-full flex-col">
                  <SelectListBox
                    label={'Tipo Sanguíneo'}
                    color={true}
                    selectedPerson={bloodType}
                    setSelectedPerson={setBloodType}
                    datas={bloodTypeFilter}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {/* Tel */}
                <div className="flex w-full flex-col">
                  <InputMaskComp
                    label={'Telefone de Contato'}
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    autoClear={true}
                    required={false}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
                {/* Emergncy Contact */}
                <div className="flex w-full flex-col">
                  <InputMaskComp
                    label={'Telefone de Emergência'}
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    required={false}
                    autoClear={true}
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {/* Insurance */}
                <div className="flex w-full flex-col">
                  <SelectListBox
                    label={'Convênio'}
                    color={true}
                    selectedPerson={insurance}
                    setSelectedPerson={setInsurance}
                    datas={insuranceDatas.insurance}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>
                {/* cardNumber (insurance) */}
                {handleInsurance()}
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
                <div className="flex w-full flex-col">
                  <Input
                    label={'Filiação Paterna'}
                    color={true}
                    required={false}
                    value={paternalFiliation}
                    onChange={(e) => setPaternalFiliation(e.target.value)}
                    placeholder={'Joaquim Bezerra'}
                  />
                </div>
                {/* maternalFiliation */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Filiação Materna'}
                    color={true}
                    required={false}
                    value={maternalFiliation}
                    onChange={(e) => setMaternalFiliation(e.target.value)}
                    placeholder={'Lúcia Agostinho'}
                  />
                </div>
                {/* paternalFiliationContact */}
                <div className="flex w-full flex-col">
                  <InputMaskComp
                    label={'Contato do responsável 1'}
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    autoClear={true}
                    required={false}
                    value={paternalFiliationContact}
                    onChange={(e) => setPaternalFiliationContact(e.target.value)}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
                {/* maternalFiliationContact */}
                <div className="flex w-full flex-col">
                  <InputMaskComp
                    label={'Contato do responsável 2'}
                    color={true}
                    mask="(99) 9 9999-9999"
                    placeholder={'(__) _ ____-____'}
                    unmask={true}
                    autoClear={true}
                    required={false}
                    value={maternalFiliationContact}
                    onChange={(e) => setMaternalFiliationContact(e.target.value)}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
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
                  {/* <SelectListBox
                    label={'Estado'}
                    color={true}
                    selectedPerson={state}
                    setSelectedPerson={setState}
                    datas={brStateDatas.states}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  /> */}
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
    </Modal >
  );
}

export default AddPatientModal;
