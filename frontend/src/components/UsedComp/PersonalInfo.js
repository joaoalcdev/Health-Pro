import React, { useEffect, useState } from 'react';
import { sortsDatas, bloodTypeFilter } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { HiOutlineCheckCircle, HiPencilAlt, HiArrowSmLeft } from 'react-icons/hi';
import { brStateDatas, genderDatas, maritalDatas } from '../Datas';
import { InputMaskComp } from '../Form';
import { updatePatient, getPatient } from '../../api/PatientsAPI';
import { formatDate } from '../../utils/formatDate';
import { formatCPF } from '../../utils/formatCPF';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

function PersonalInfo({ titles, data, status }) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  // const [title, setTitle] = useState(sortsDatas.title[0]);

  const [fullName, setFullName] = useState(data.fullName);
  const [cpf, setCpf] = useState(data.cpf);
  const [dateBirth, setDateBirth] = useState(new Date(data.dateBirth));
  const [bloodType, setBloodType] = useState(data.bloodType); // select broken
  const [gender, setGender] = useState(data.gender); // select broken
  const [marital, setMarital] = useState(data.marital); // select broken
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [emergencyContact, setEmergencyContact] = useState(data.emergencyContact);
  const [address, setAddress] = useState(data.address);
  const [region, setRegion] = useState(data.region);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(data.state); // select broken


  const { id } = useParams();

  const handleChange2Edit = () => {
    setIsEdit(!isEdit)

    // reset values
    setFullName(data.fullName);
    setCpf(data.cpf);
    setDateBirth(new Date(data.dateBirth));
    setBloodType(data.bloodType);
    setGender(data.gender)
    setMarital(data.marital)
    setPhoneNumber(data.phoneNumber);
    setEmergencyContact(data.emergencyContact);
    setAddress(data.address);
    setRegion(data.region);
    setCity(data.city);
    setState(data.state);
  }

  const handleEditPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updatePatient(id,
      {
        fullName,
        cpf,
        dateBirth,
        gender,
        bloodType,
        marital,
        phoneNumber,
        emergencyContact,
        address,
        region,
        city,
        state,
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
      // dateBirth !== data.date ||
      gender !== data.gender ||
      bloodType !== data.bloodType ||
      marital !== data.marital ||
      phoneNumber !== data.phoneNumber ||
      emergencyContact !== data.emergencyContact ||
      address !== data.address ||
      region !== data.region ||
      city !== data.city ||
      state !== data.state
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
    gender, data.gender,
    bloodType, data.bloodType,
    marital, data.marital,
    phoneNumber, data.phoneNumber,
    emergencyContact, data.emergencyContact,
    address, data.address,
    region, data.region,
    city, data.city,
    state, data.state
  ])


  return (!isEdit ?
    <>
      <div className="flex-colo gap-4" id='editPatient'>
        {/* uploader */}
        {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Imagem de Perfil</p>
        <Uploder />
      </div> */}
        {/* select  */}
        {/* {titles && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Title</p>
          <Select
            selectedPerson={title}
            setSelectedPerson={setTitle}
            datas={sortsDatas.title}
          >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {title?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )} */}
        <form className='w-full h-full'>
          <h1 className='text-md font-light mb-4 font-medium'>Visualizando Informações do paciente</h1>
          <div className="flex-colo gap-6">
            <div className="grid sm:grid-cols-3 gap-4 w-full">
              {/* Full Name */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Nome Completo<span className='text-required'>*</span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.fullName}
                  </p>
                </div>
              </div>
              {/* CPF */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>CPF<span className='text-required'></span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {formatCPF(data.cpf)}
                  </p>
                </div>
              </div>
              {/* DatePicker */}
              <div className=''>
                <p className='pl-1 mb-[-7px] text-sm text-black'>Data de Nascimento<span className='text-required'></span></p>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {formatDate(new Date(data.dateBirth))}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 w-full">
              {/* <div className="flex w-full flex-col gap-1">
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
              </div> */}
              {/* Blood Type */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Tipo Sanguíneo<span className='text-required'>*</span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.bloodType}
                  </p>
                </div>
              </div>
              {/* Marital State */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Estado Civil<span className='text-required'>*</span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.marital}
                  </p>
                </div>
              </div>
              {/* <div className="flex w-full flex-col gap-1">
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
              </div> */}
              {/* <div className="flex w-full flex-col gap-1">
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
              </div> */}
              {/* Gender */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Gênero<span className='text-required'>*</span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.gender}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* Tel */}
              <div className=''>
                <p className='pl-1 mb-[-7px] text-sm text-black'>Telefone de Contato<span className='text-required'></span></p>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {formatPhoneNumber(data.phoneNumber)}
                  </p>
                </div>
              </div>
              {/* Emergncy Contact */}
              <div className=''>
                <p className='pl-1 mb-[-7px] text-sm text-black'>Telefone de Emergência<span className='text-required'></span></p>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
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
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Endereço<span className='text-required'></span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.address}
                  </p>
                </div>
              </div>
              {/* City */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Cidade<span className='text-required'></span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.city}
                  </p>
                </div>
              </div>
              {/* Region */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Bairro<span className='text-required'></span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.region}
                  </p>
                </div>
              </div>
              {/* State */}
              <div className=''>
                <h3 className='pl-1 mb-[-7px] text-sm text-black'>Estado<span className='text-required'></span></h3>
                <div className='w-full border p-4 mt-3 rounded-lg'>
                  <p className='text-sm font-light'>
                    {data.state}
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
            Icon={HiPencilAlt}
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
                  setCpf(e.target.value)
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
                placeholderText={'__/__/____'}
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

          {/* <div className="grid sm:grid-cols-4 gap-4 mb-8 w-full">
          </div> */}
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
            {/* State */}
            <div className="flex w-full flex-col gap-1">
              <p className='pl-1 text-sm text-black'>Estado<span className='text-required'></span></p>
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
        </div>
        {/* buttones */}
        {/* submit */}
        {/* submit */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full pt-4">
          <Button
            label={'Voltar'}
            Icon={HiArrowSmLeft}
            onClick={handleChange2Edit}
          />
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