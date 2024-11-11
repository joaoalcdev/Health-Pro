// dependencies - import
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components - import 
import { Button, DatePickerComp, Input, Select } from '../Form';
import { toast } from 'react-hot-toast';
import { InputMaskComp, SelectListBox, InputFilterSelect } from '../Form';

// datas - import
import { sortsDatas, bloodTypeFilter } from '../Datas';
import { brStateDatas, genderDatas, maritalDatas, insuranceDatas } from '../Datas';

// api - import
import { updatePatient, getPatient } from '../../api/PatientsAPI';


// icons - import
import { BiChevronDown } from 'react-icons/bi';
import { TbUserHeart } from "react-icons/tb";
import { LiaGenderlessSolid } from "react-icons/lia";
import { LiaTintSolid } from "react-icons/lia";
import { HiOutlinePhone, HiOutlineCalendarDays, HiOutlineIdentification, HiOutlineMapPin, HiOutlineCheckCircle, HiMiniPencilSquare, HiArrowLeft, HiOutlineHome, HiMiniFingerPrint, HiOutlineCreditCard, HiOutlineHomeModern } from 'react-icons/hi2';

// utils - import
import { formatDate } from '../../utils/formatDate';
import { formatCPF } from '../../utils/formatCPF';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';




function PatientInfo({ titles, data, status }) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  // const [title, setTitle] = useState(sortsDatas.title[0]);

  const [fullName, setFullName] = useState(data.fullName);
  const [cpf, setCpf] = useState(data.cpf);
  const [rg, setRg] = useState(data.rg);
  const [dateBirth, setDateBirth] = useState(new Date(data.dateBirth));
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[data.bloodType - 1]);
  const [cardNumber, setCardNumber] = useState(data.cardNumber);
  const [gender, setGender] = useState(genderDatas.gender[data.gender - 1]);
  const [marital, setMarital] = useState(maritalDatas.marital[data.marital - 1]);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [emergencyContact, setEmergencyContact] = useState(data.emergencyContact);
  const [address, setAddress] = useState(data.address);
  const [region, setRegion] = useState(data.region);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(brStateDatas.states[data.state - 1]);
  const [insurance, setInsurance] = useState(insuranceDatas.insurance[data.insurance - 1]);
  const [paternalFiliation, setPaternalFiliation] = useState(data.paternalFiliation);
  const [maternalFiliation, setMaternalFiliation] = useState(data.maternalFiliation);
  const [paternalFiliationContact, setPaternalFiliationContact] = useState(data.paternalFiliationContact);
  const [maternalFiliationContact, setMaternalFiliationContact] = useState(data.maternalFiliationContact);

  const handleChange2Edit = () => {
    setIsEdit(!isEdit)

    // reset values
    setFullName(data.fullName);
    setCpf(data.cpf);
    setRg(data.rg);
    setDateBirth(new Date(data.dateBirth));
    setBloodType(sortsDatas.bloodTypeFilter[data.bloodType - 1]);
    setGender(genderDatas.gender[data.gender - 1])
    setMarital(maritalDatas.marital[data.marital - 1])
    setPhoneNumber(data.phoneNumber);
    setEmergencyContact(data.emergencyContact);
    setAddress(data.address);
    setRegion(data.region);
    setCity(data.city);
    setInsurance(insuranceDatas.insurance[data.insurance - 1]);
    setCardNumber(data.cardNumber);
    setPaternalFiliation(data.paternalFiliation);
    setMaternalFiliation(data.maternalFiliation);
    setPaternalFiliationContact(data.paternalFiliationContact);
    setMaternalFiliationContact(data.maternalFiliationContact);
    setState(brStateDatas.states[data.state - 1]);
  }

  const handleEditPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updatePatient(data.id,
      {
        fullName,
        cpf,
        rg,
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
        insurance: insurance.id,
        cardNumber,
        paternalFiliation,
        maternalFiliation,
        paternalFiliationContact,
        maternalFiliationContact
      }
    )
    if (response.response && response.response.data.code === "CPF001") {
      toast.error("Erro ao atualizar! Este CPF já está em uso.", {
        position: "top-center",
      })
      setLoading(false)
      return
    }
    if (response.response && response.response.data.code === "RG001") {
      toast.error("Erro ao atualizar! Este RG já está em uso.", {
        position: "top-center",
      })
      setLoading(false)
      return
    }
    if (response.status && response.status === 200) {
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

  const [query, setQuery] = useState('')

  const bloodTypeFilter =
    query === ''
      ? sortsDatas.bloodTypeFilter
      : sortsDatas.bloodTypeFilter.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  function handleInsurance() {
    if (insurance.id !== 1) {

      return (
        <>
          <div className=''>
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
    } else {
      return (
        <>
          <div className='!cursor-not-allowed'>
            <Input
              label={'Nº Cartão (Convênio) - Indisponível'}
              color={true}
              required={false}
              placeholder={'Opção indisponível para este convênio.'}
              type={'number'}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              disabled={insurance.id === 1 ? true : false}
            />
          </div>
        </>
      )
    }
  }

  useEffect(() => {
    setCardNumber('');
  }, [insurance])

  return (
    !data.fullName && loading ?
      <div className="flex absolute items-center justify-center w-full h-1/2">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main"></div>
      </div>
      :
      !isEdit
        ?
        <>
          <div className="grid grid-cols-1 gap-4" id='editPatient'>
            <form className='w-full h-full'>
              <h1 className='text-md mb-4 font-medium'>Informações do paciente</h1>
              <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div className="grid sm:grid-cols-2 gap-4 w-full">
                  <div className='col-span-2'>
                    <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Nome Completo<span className='text-required'></span></p>
                    <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                      <p className='flex text-2xl font-light pr-1'>
                        <HiOutlineIdentification />
                      </p>
                      <p className='flex text-sm font-medium'>
                        {data.fullName}
                      </p>
                    </div>
                  </div>
                </div>

                {(data.rg || data.cpf || data.dateBirth || data.bloodType || data.marital || data.gender) &&
                  <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {/* RG */}
                    {data.rg &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>RG<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiMiniFingerPrint />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.rg ? data.rg : "-"}
                          </p>
                        </div>
                      </div>}
                    {/* CPF */}
                    {data.cpf &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>CPF<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiMiniFingerPrint />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {formatCPF(data.cpf) ? formatCPF(data.cpf) : "-"}
                          </p>
                        </div>
                      </div>}
                    {/* dateBirth */}
                    {data.dateBirth &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Data de Nascimento<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineCalendarDays />
                            {/* <HiCake /> */}
                          </p>
                          <p className='flex text-sm font-medium'>
                            {formatDate(new Date(data.dateBirth))}
                          </p>
                        </div>
                      </div>}
                    {/* Blood Type */}
                    {data.bloodType &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Tipo Sanguíneo<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <LiaTintSolid />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.bloodType ? sortsDatas.bloodTypeFilter[data.bloodType - 1].name : "-"}
                          </p>
                        </div>
                      </div>}
                    {/* Marital State */}
                    {data.marital &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Estado Civil<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-xl font-light pr-1'>
                            <TbUserHeart />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.marital ? maritalDatas.marital[data.marital - 1].name : "-"}
                          </p>
                        </div>
                      </div>}
                    {/* Gender */}
                    {data.gender &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Gênero<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <LiaGenderlessSolid />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.gender ? genderDatas.gender[data.gender - 1].name : "-"}
                          </p>
                        </div>
                      </div>}
                  </div>}


                {(data.insurance || data.cardNumber) &&
                  <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {/* insurance */}
                    {data.insurance &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Convênio<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineHomeModern />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.insurance ? insuranceDatas.insurance[data.insurance - 1].name : "-"}
                          </p>
                        </div>
                      </div>}
                    {/* cardNumber insurance */}
                    {data.cardNumber &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Nº Cartão (Convênio)<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineCreditCard />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.cardNumber ? data.cardNumber : "-"}
                          </p>
                        </div>
                      </div>}
                  </div>}


                {(data.phoneNumber || data.emergencyContact) &&
                  <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {/* Tel */}
                    {data.phoneNumber &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Telefone de Contato<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlinePhone />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {formatPhoneNumber(data.phoneNumber)}
                          </p>
                        </div>
                      </div>}
                    {/* Emergncy Contact */}
                    {data.emergencyContact &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Telefone de Emergência<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlinePhone />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {formatPhoneNumber(data.emergencyContact)}
                          </p>
                        </div>
                      </div>}
                  </div>}

                {(data.address || data.city) &&
                  <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {/* Address */}
                    {data.address &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Endereço<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-left items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineHome />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.address ? data.address : "-"}, {data.region ? data.region : "-"}
                          </p>
                        </div>
                      </div>}
                    {data.city &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Cidade<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineMapPin />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.city ? data.city : "-"}, ({data.state ? brStateDatas.states[data.state - 1].UF : "-"})
                          </p>
                        </div>
                      </div>}
                  </div>}
                {(data.paternalFiliation || data.maternalFiliation) &&
                  <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {/* paternalFiliation */}
                    {data.paternalFiliation &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Filiação Paterna<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineIdentification />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.paternalFiliation ? data.paternalFiliation : "-"}
                          </p>
                        </div>
                      </div>}
                    {/* maternalFiliation */}
                    {data.maternalFiliation &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Filiação Materna<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlineIdentification />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {data.maternalFiliation ? data.maternalFiliation : "-"}
                          </p>
                        </div>
                      </div>}
                  </div>}

                {(data.paternalFiliationContact || data.maternalFiliationContact) &&
                  <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {/* paternalFiliationContact */}
                    {data.paternalFiliationContact &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Contato do responsável 1<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlinePhone />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {formatPhoneNumber(data.paternalFiliationContact)}
                          </p>
                        </div>
                      </div>}
                    {/* maternalFiliationContact */}
                    {data.maternalFiliationContact &&
                      <div className=''>
                        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Contato do responsável 2<span className='text-required'></span></p>
                        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
                          <p className='flex text-2xl font-light pr-1'>
                            <HiOutlinePhone />
                          </p>
                          <p className='flex text-sm font-medium'>
                            {formatPhoneNumber(data.maternalFiliationContact)}
                          </p>
                        </div>
                      </div>}
                  </div>}
              </div>
            </form >
            {/* submit */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full" >
              <Button
                label={'Editar Informações'}
                Icon={HiMiniPencilSquare}
                onClick={handleChange2Edit}
              />
            </div>
          </div >
        </>
        :

        // edit page
        <>
          <form className='w-full h-full' onSubmit={handleEditPatient}>
            <h1 className='text-md  mb-4 font-medium'>Editando informações do paciente</h1>
            <div className="flex-colo gap-6">
              <div className="grid sm:grid-cols-3 gap-4 w-full">
                {/* Full Name */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Nome Completo'}
                    color={true}
                    required={true}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      setIsDisabled(false)
                    }}
                  />
                </div>
                {/* RG */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'RG'}
                    color={true}
                    required={false}
                    type={'number'}
                    value={rg}
                    onChange={(e) => {
                      setRg(e.target.value)
                      setIsDisabled(false)
                    }}
                  />
                </div>
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
                    onChange={(e) => {
                      setCpf(e.target.value);
                      setIsDisabled(false)
                    }}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>

              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
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
                  // placeholderText={'__/__/____'}
                  locale="pt"
                  startDate={dateBirth}
                  onChange={(dateBirth) => {
                    setDateBirth(dateBirth)
                    setIsDisabled(false)
                  }}
                />
                <div className="flex w-full flex-col">
                  <SelectListBox
                    label={'Tipo Sanguíneos'}
                    color={true}
                    selectedPerson={bloodType}
                    setSelectedPerson={setBloodType}
                    datas={bloodTypeFilter}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>
                <div className="flex w-full flex-col">
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
                    onChange={(e) => {
                      setPhoneNumber(e.target.value)
                      // setIsDisabled(false)
                    }}
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
                    onChange={(e) => {
                      setEmergencyContact(e.target.value)
                      // setIsDisabled(false)
                    }}
                    className="w-full bg-transparent text-sm border border-border font-light rounded focus:border focus:border-subMain"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {/* Address */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Endereço'}
                    color={true}
                    required={false}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      setIsDisabled(false)
                    }}
                  />
                </div>
                {/* Region */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Bairro'}
                    color={true}
                    required={false}
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value)
                      setIsDisabled(false)
                    }}
                  />
                </div>
                {/* City */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Cidade'}
                    color={true}
                    required={false}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value)
                      setIsDisabled(false)
                    }}
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
                {/* paternalFiliation */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Filiação Paterna'}
                    color={true}
                    required={false}
                    value={paternalFiliation}
                    onChange={(e) => {
                      setPaternalFiliation(e.target.value)
                      // setIsDisabled(false)
                    }}
                  />
                </div>
                {/* maternalFiliation */}
                <div className="flex w-full flex-col">
                  <Input
                    label={'Filiação Materna'}
                    color={true}
                    required={false}
                    value={maternalFiliation}
                    onChange={(e) => {
                      setMaternalFiliation(e.target.value)
                      // setIsDisabled(false)
                    }}
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
              </div>
            </div>
            {/* buttones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
              <div className='flex flex-row w-full'>
                <button
                  className='gap-4 w-full bg-subMain bg-opacity-5 text-subMain border border-subMain text-sm p-3 rounded font-light hover:bg-opacity-25 hover:text-subMain transition-color duration-300'
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

export default PatientInfo;