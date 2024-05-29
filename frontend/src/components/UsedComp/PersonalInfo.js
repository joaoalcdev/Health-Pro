import React, { useEffect, useState } from 'react';
import Uploder from '../Uploader';
import { sortsDatas, bloodTypeFilter } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { brStateDatas, genderDatas, maritalDatas } from '../Datas';
import { InputMaskComp } from '../Form';
import { updatePatient, getPatient } from '../../api/PatientsAPI';

function PersonalInfo({ titles, data, status }) {
  const [title, setTitle] = useState(sortsDatas.title[0]);

  const [fullName, setFullName] = useState(data.fullName);
  const [cpf, setCpf] = useState(data.cpf);
  const [dateBirth, setDateBirth] = useState(new Date());
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

  
  const handleUpdate = async () => {
    await updatePatient(id, {
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
    toast.success("Paciente atualizado com sucesso!", {
      position: "top-center",
    })
    status(true)
  }


  return (
    <div className="flex-colo gap-4" id='editPatient'>
      {/* uploader */}
      {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Imagem de Perfil</p>
        <Uploder />
      </div> */}
      {/* select  */}
      {titles && (
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
      )}
      <form className='w-full h-full'>
        <h1 className='text-md font-light mb-4'>Informações do paciente</h1>
        <div className="flex-colo gap-6">
          <div className="grid sm:grid-cols-3 gap-4 w-full">
            {/* Full Name */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Nome Completo<span className='text-required'>*</span></p>
              <Input
                color={true}
                required={true}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                required={true}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
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
                onChange={(dateBirth) => setDateBirth(dateBirth)}
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
            {/* Emergncy Contact */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Telefone de emergência<span className='text-warn'></span></p>
              <InputMaskComp
                color={true}
                mask="(99) 9 9999-9999"
                placeholder={'(__) _ ____-____'}
                unmask={true}
                required={false}
                autoClear={true}
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
              />
            </div>
          </div>

          {/* <div className="grid sm:grid-cols-4 gap-4 mb-8 w-full">

          </div> */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Address */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Endereço<span className='text-required'>*</span></p>
              <Input
                color={true}
                required={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={'Rua, Número'}
              />
            </div>
            {/* City */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Cidade<span className='text-required'>*</span></p>
              <Input
                color={true}
                required={true}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={'Russas'}
              />
            </div>
            {/* Region */}
            <div className=''>
              <p className='pl-1 mb-[-7px] text-sm text-black'>Bairro<span className='text-required'>*</span></p>
              <Input
                color={true}
                required={true}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder={'Centro'}
              />
            </div>
            {/* State */}
            <div className="flex w-full flex-col gap-1">
              <p className='pl-1 text-sm text-black'>Estado<span className='text-required'>*</span></p>
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

        {/* </div> */}
      </form>
      {/* submit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Button
          label={'Deletar Paciente'}
          Icon={RiDeleteBin5Line}
          onClick={() => {
            toast.error('Ainda não disponível');
          }}
        />
        <Button
          label={'Salvar alterações'}
          Icon={HiOutlineCheckCircle}
          onClick={handleUpdate}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;