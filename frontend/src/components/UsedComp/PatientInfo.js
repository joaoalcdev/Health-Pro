import React, { useEffect, useState } from 'react';
import { sortsDatas, bloodTypeFilter } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
// import { HiOutlineCheckCircle, HiPencilAlt, HiArrowSmLeft } from 'react-icons/hi';
import { HiOutlinePhone, HiOutlineCalendarDays, HiOutlineIdentification, HiOutlineMapPin, HiOutlineCheckCircle, HiMiniPencilSquare, HiArrowLeft, HiMap, HiCake, HiOutlineHome, HiMiniFingerPrint } from 'react-icons/hi2';
import { RiDropFill, RiDropLine, RiGenderlessLine, RiGenderlessFill } from "react-icons/ri";
import { TbUserHeart } from "react-icons/tb";
import { LiaGenderlessSolid } from "react-icons/lia";
import { LiaTintSolid } from "react-icons/lia";
import { brStateDatas, genderDatas, maritalDatas } from '../Datas';
import { InputMaskComp } from '../Form';
import { updatePatient, getPatient } from '../../api/PatientsAPI';
import { formatDate } from '../../utils/formatDate';
import { formatCPF } from '../../utils/formatCPF';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { set } from 'rsuite/esm/utils/dateUtils';

function PersonalInfo({ titles, data, status }) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  // const [title, setTitle] = useState(sortsDatas.title[0]);

  const [fullName, setFullName] = useState(data.fullName);
  const [cpf, setCpf] = useState(data.cpf);
  const [dateBirth, setDateBirth] = useState(new Date(data.dateBirth));
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[data.bloodType - 1]);
  const [gender, setGender] = useState(genderDatas.gender[data.gender - 1]);
  const [marital, setMarital] = useState(maritalDatas.marital[data.marital - 1]);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [emergencyContact, setEmergencyContact] = useState(data.emergencyContact);
  const [address, setAddress] = useState(data.address);
  const [region, setRegion] = useState(data.region);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(brStateDatas.states[data.state - 1]);
  const [paternalFiliation, setPaternalFiliation] = useState(data.paternalFiliation);
  const [maternalFiliation, setMaternalFiliation] = useState(data.maternalFiliation);
  const [paternalFiliationContact, setPaternalFiliationContact] = useState(data.paternalFiliationContact);
  const [maternalFiliationContact, setMaternalFiliationContact] = useState(data.maternalFiliationContact);


  const { id } = useParams();

  const handleChange2Edit = () => {
    setIsEdit(!isEdit)

    // reset values
    setFullName(data.fullName);
    setCpf(data.cpf);
    // setDateBirth(new Date(data.dateBirth));
    // setBloodType(data.bloodType);
    // setGender(data.gender)
    // setMarital(data.marital)
    setPhoneNumber(data.phoneNumber);
    setEmergencyContact(data.emergencyContact);
    setAddress(data.address);
    setRegion(data.region);
    setCity(data.city);
    setPaternalFiliation(data.paternalFiliation);
    setMaternalFiliation(data.maternalFiliation);
    setPaternalFiliationContact(data.paternalFiliationContact);
    setMaternalFiliationContact(data.maternalFiliationContact);
    // setState(data.state);
  }

  const handleEditPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updatePatient(id,
      {
        fullName,
        cpf,
        dateBirth,
        gender: gender.id,
        bloodType: bloodType.id,
        marital: marital.id,
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

    if (response) {
      toast.success("Paciente atualizado com sucesso!", {
        position: "top-center",
      })
      setLoading(false);
      setIsEdit(false);
      status(true);
    } else {
      toast.error("Erro ao atualizar o paciente, tente novamente!", {
        position: "top-center",
      })
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      fullName !== data.fullName ||
      cpf !== data.cpf ||
      bloodType.id !== data.bloodType ||
      marital.id !== data.marital ||
      gender.id !== data.gender ||
      phoneNumber !== data.phoneNumber ||
      emergencyContact !== data.emergencyContact ||
      address !== data.address ||
      region !== data.region ||
      city !== data.city ||
      state.id !== data.state ||
      paternalFiliation !== data.paternalFiliation ||
      maternalFiliation !== data.maternalFiliation ||
      paternalFiliationContact !== data.paternalFiliationContact ||
      maternalFiliationContact !== data.maternalFiliationContact
    ) {
      setIsDisabled(false)
      console.log('habilitado (changed)')
    } else {
      setIsDisabled(true)
      console.log('desabilitado (re-change)')
    }
  }, [
    fullName, data.fullName,
    cpf, data.cpf,
    gender.id, data.gender,
    bloodType.id, data.bloodType,
    marital.id, data.marital,
    phoneNumber, data.phoneNumber,
    emergencyContact, data.emergencyContact,
    address, data.address,
    region, data.region,
    city, data.city,
    state.id, data.state,
    paternalFiliation, data.paternalFiliation,
    maternalFiliation, data.maternalFiliation,
    paternalFiliationContact, data.paternalFiliationContact,
    maternalFiliationContact, data.maternalFiliationContact
  ])


  return (!isEdit ?
    <>
      <div className="flex-colo gap-4" id='editPatient'>
        <form className='w-full h-full'>
          <h1 className='text-md font-light mb-4 font-medium'>Visualizando Informações do paciente</h1>
          <div className="flex-colo gap-6">
            <div className="grid sm:grid-cols-3 gap-4 w-full">
              {/* Full Name */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Nome Completo<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineIdentification />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.fullName}
                  </p>
                </div>
              </div>
              {/* CPF */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>CPF<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiMiniFingerPrint />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {formatCPF(data.cpf) ? formatCPF(data.cpf) : "Não informado..."}
                  </p>
                </div>
              </div>
              {/* DatePicker */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Data de Nascimento<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineCalendarDays />
                    {/* <HiCake /> */}
                  </p>
                  <p className='flex text-sm font-medium'>
                    {formatDate(new Date(data.dateBirth))}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 w-full">
              {/* Blood Type */}
              <div className=''>
                <h3 className='pl-0 mb-[-7px] text-sm font-bold text-black'>Tipo Sanguíneo<span className='text-required'></span></h3>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <LiaTintSolid />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.bloodType ? sortsDatas.bloodTypeFilter[data.bloodType - 1].name : "-"}
                  </p>
                </div>
              </div>
              {/* Marital State */}
              <div className=''>
                <h3 className='pl-0 mb-[-7px] text-sm font-bold text-black'>Estado Civil<span className='text-required'></span></h3>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-xl font-light pr-1'>
                    <TbUserHeart />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.marital ? maritalDatas.marital[data.marital - 1].name : "-"}
                  </p>
                </div>
              </div>
              {/* Gender */}
              <div className=''>
                <h3 className='pl-0 mb-[-7px] text-sm font-bold text-black'>Gênero<span className='text-required'></span></h3>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <LiaGenderlessSolid />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.gender ? genderDatas.gender[data.gender - 1].name : "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* Tel */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Telefone de Contato<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlinePhone />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {formatPhoneNumber(data.phoneNumber)}
                  </p>
                </div>
              </div>
              {/* Emergncy Contact */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Telefone de Emergência<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlinePhone />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {formatPhoneNumber(data.emergencyContact)}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="grid sm:grid-cols-4 gap-4 mb-8 w-full">
          </div> */}
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* Address */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Endereço<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineHome />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.address ? data.address : "Não informado..."}, {data.region ? data.region : "Não informado..."}
                  </p>
                </div>
              </div>
              {/* Region */}
              {/* <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Bairro<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineMapPin />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.region ? data.region : "Não informado..."}
                  </p>
                </div>
              </div> */}
              {/* City */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Cidade<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineMapPin />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.city ? data.city : "Não informado..."}, ({data.state ? brStateDatas.states[data.state - 1].UF : "-"})
                  </p>
                </div>
              </div>
              {/* State */}
              {/* <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Estado<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineMapPin />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.state ? brStateDatas.states[data.state - 1].UF : "-"}
                  </p>
                </div>
              </div> */}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* paternalFiliation */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Filiação Paterna<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineIdentification />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.paternalFiliation ? data.paternalFiliation : "Não informado..."}
                  </p>
                </div>

              </div>
              {/* maternalFiliation */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Filiação Materna<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlineIdentification />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {data.maternalFiliation ? data.maternalFiliation : "Não informado..."}
                  </p>
                </div>
              </div>
              {/* paternalFiliationContact */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Contato do responsável 1<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlinePhone />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {formatPhoneNumber(data.paternalFiliationContact)}
                  </p>
                </div>
              </div>
              {/* maternalFiliationContact */}
              <div className=''>
                <p className='pl-0 mb-[-7px] text-sm font-bold text-black'>Contato do responsável 2<span className='text-required'></span></p>
                <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                  <p className='flex text-2xl font-light pr-1'>
                    <HiOutlinePhone />
                  </p>
                  <p className='flex text-sm font-medium'>
                    {formatPhoneNumber(data.maternalFiliationContact)}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </form>
        {/* submit */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full">
          {/* <Button
            label={'Deletar Paciente'}
            Icon={RiDeleteBin5Line}
            onClick={() => {
              toast.error('Ainda não disponível');
            }}
          /> */}
          <Button
            label={'Editar Informações'}
            Icon={HiMiniPencilSquare}
            onClick={handleChange2Edit}
          />
        </div>
      </div>
    </>
    :
    // edit page
    <>
      <form className='w-full h-full' onSubmit={handleEditPatient}>
        <h1 className='text-md font-light mb-4 font-medium'>Editando informações do paciente</h1>
        <div className="flex-colo gap-6">
          <div className="grid sm:grid-cols-3 gap-4 w-full">
            {/* Full Name */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Nome Completo<span className='text-required'>*</span></p>
              <Input
                color={true}
                required={true}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  // setIsDisabled(false)
                }}
                placeholder={'João da Silva'}
              />
            </div>
            {/* CPF */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>CPF<span className='text-required'></span></p>
              <InputMaskComp
                color={true}
                mask="999.999.999-99"
                autoClear={true}
                placeholder={'___.___.___-__'}
                unmask={true}
                required={false}
                value={cpf}
                onChange={(e) => {
                  setCpf(e.target.value);
                  // setIsDisabled(false) 
                }}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Data de Nascimento<span className='text-required'></span></p>
              {/* DatePicker */}
              <DatePickerComp
                color={true}
                showYearDropdown={true}
                scrollableYearDropdown={true}
                closeOnScroll={true}
                popperPlacement="top-end"
                yearDropdownItemNumber={80}
                dateFormat="dd/MM/yyyy"
                // placeholderText={'__/__/____'}
                locale="pt"
                startDate={dateBirth}
                onChange={(dateBirth) => {
                  setDateBirth(dateBirth)
                  // setIsDisabled(false)
                }}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 w-full">
            <div className="flex w-full flex-col gap-1">
              <p className="text-black text-sm">Tipo Sanguíneo<span className='text-required'></span></p>
              <Select
                selectedPerson={bloodType}
                setSelectedPerson={setBloodType}
                datas={sortsDatas.bloodTypeFilter}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {bloodType.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            <div className="flex w-full flex-col gap-1">
              <p className="text-black text-sm">Estado Civil<span className='text-required'></span></p>
              <Select
                selectedPerson={marital}
                setSelectedPerson={setMarital}
                datas={maritalDatas.marital}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {marital.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            <div className="flex w-full flex-col gap-1">
              <p className='pl-1 text-sm text-black'>Gênero<span className='text-required'></span></p>
              <Select
                selectedPerson={gender}
                setSelectedPerson={setGender}
                datas={genderDatas.gender}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {gender.name}<BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Tel */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Telefone de Contato<span className='text-warn'></span></p>
              <InputMaskComp
                color={true}
                mask="(99) 9 9999-9999"
                placeholder={'(__) _ ____-____'}
                unmask={true}
                autoClear={true}
                required={false}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value)
                  // setIsDisabled(false)
                }}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
            {/* Emergncy Contact */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Telefone de Emergência<span className='text-warn'></span></p>
              <InputMaskComp
                color={true}
                mask="(99) 9 9999-9999"
                placeholder={'(__) _ ____-____'}
                unmask={true}
                required={false}
                autoClear={true}
                value={emergencyContact}
                onChange={(e) => {
                  setEmergencyContact(e.target.value)
                  // setIsDisabled(false)
                }}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Address */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Endereço<span className='text-required'></span></p>
              <Input
                color={true}
                required={false}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  // setIsDisabled(false)
                }}
                placeholder={'Rua, Número'}
              />
            </div>
            {/* Region */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Bairro<span className='text-required'></span></p>
              <Input
                color={true}
                required={false}
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value)
                  // setIsDisabled(false)
                }}
                placeholder={'Centro'}
              />
            </div>
            {/* City */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Cidade<span className='text-required'></span></p>
              <Input
                color={true}
                required={false}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value)
                  // setIsDisabled(false)
                }}
                placeholder={'Russas'}
              />
            </div>
            {/* State */}
            <div className="flex w-full flex-col gap-1">
              <p className='pl-1 text-sm text-black'>Estado<span className='text-required'></span></p>
              <Select
                selectedPerson={state}
                setSelectedPerson={setState}
                datas={brStateDatas.states}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                  {/* {data.state ? brStateDatas.states[data.state - 1].UF : "-"} <BiChevronDown className="text-xl" /> */}
                  {state.UF} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            {/* paternalFiliation */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Filiação Paterna<span className='text-required'></span></p>
              <Input
                color={true}
                required={false}
                value={paternalFiliation}
                onChange={(e) => {
                  setPaternalFiliation(e.target.value)
                  // setIsDisabled(false)
                }}
                placeholder={'Joaquim Bezerra'}
              />
            </div>
            {/* maternalFiliation */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Filiação Materna<span className='text-required'></span></p>
              <Input
                color={true}
                required={false}
                value={maternalFiliation}
                onChange={(e) => {
                  setMaternalFiliation(e.target.value)
                  // setIsDisabled(false)
                }}
                placeholder={'Lúcia Agostinho'}
              />
            </div>
            {/* paternalFiliationContact */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Contato do responsável 1<span className='text-required'></span></p>
              <InputMaskComp
                color={true}
                mask="(99) 9 9999-9999"
                placeholder={'(__) _ ____-____'}
                unmask={true}
                autoClear={true}
                required={false}
                value={paternalFiliationContact}
                onChange={(e) => setPaternalFiliationContact(e.target.value)}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
            {/* maternalFiliationContact */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Contato do responsável 2<span className='text-required'></span></p>
              <InputMaskComp
                color={true}
                mask="(99) 9 9999-9999"
                placeholder={'(__) _ ____-____'}
                unmask={true}
                autoClear={true}
                required={false}
                value={maternalFiliationContact}
                onChange={(e) => setMaternalFiliationContact(e.target.value)}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
          </div>
        </div>
        {/* buttones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
          <div className='flex flex-row w-full'>
            <button
              className='gap-4 w-full bg-subMain bg-opacity-5 text-subMain border border-subMain text-sm p-3 rounded-lg font-light hover:bg-opacity-25 hover:text-subMain transition-color duration-300'
              onClick={handleChange2Edit}
            >
              <p className='flex flex-row w-full justify-center items-center text-center text-sm font-medium'>
                Voltar
                <HiArrowLeft className='text-xl mx-2' />
              </p>
            </button>
          </div>
          <Button
            label={'Salvar Alterações'}
            Icon={HiOutlineCheckCircle}
            disabled={isDisabled}
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}

export default PersonalInfo;