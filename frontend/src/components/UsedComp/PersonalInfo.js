import React, { useState } from 'react';
import Uploder from '../Uploader';
import { sortsDatas } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';


import { createPatient } from '../../api/PatientsAPI';
import { InputMaskComp } from '../Form';
import { brStateDatas } from '../Datas';



function PersonalInfo({ titles }) {
  const [title, setTitle] = useState(sortsDatas.title[0]);
  const [date, setDate] = useState(new Date());

  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');

  const [age, setAge] = useState();
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);

  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const [isAdd, setIsAdd] = useState(true);
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(brStateDatas.states[7]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPatient({
      fullName,
      cpf,
      age,
      bloodType: bloodType.name,
      gender: gender.name,
      address,
      region,
      city,
      state: state.UF,
      phoneNumber,
      emergencyContact,

    });
    if (createPatient) {
      toast.success('Patient created successfully');
      // reset input fields
      setFullName('');

      // redirect to patients page
      window.location.href = '/patients';
    } else {
      toast.error('Failed to create patient');
    }
  };



  return (
    <form>
      <div className="flex-colo gap-6">
        {/* uploader */}
        {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
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

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {/* fullName */}
          <Input
            label="Nome Completo"
            color={true}
            required={true}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {/* cpf */}
          <InputMaskComp
            label="CPF"
            color={true}
            mask="999.999.999-99"
            placeholder={'999.999.999-99'}
            unmask={true}
            required={true}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-4 w-full">
          {/* age */}
          <Input
            label="Idade"
            color={true}
            required={true}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {/* bloodType */}
          <div className="flex w-full flex-col gap-3">
            {!titles && (
              <>
                <div className="flex w-full flex-col gap-3">
                  <p className="text-black text-sm">Tipo Sanguíneo</p>
                  <Select
                    selectedPerson={bloodType}
                    setSelectedPerson={setBloodType}
                    datas={sortsDatas.bloodTypeFilter}
                  >
                    <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                      {bloodType?.name} <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
              </>
            )}
          </div>
          {/* gender */}
          {!titles && (
            <>
              {/* gender */}
              <div className="flex w-full flex-col gap-3">
                <p className="text-black text-sm">Gênero</p>
                <Select
                  selectedPerson={gender}
                  setSelectedPerson={setGender}
                  datas={sortsDatas.genderFilter}
                >
                  <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                    {gender?.name} <BiChevronDown className="text-xl" />
                  </div>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
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
          <InputMaskComp
            label="Contato de Emergência"
            color={true}
            mask="(99) 9 9999-9999"
            placeholder={'(__) _ ____-____'}
            unmask={true}
            required={true}
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
          />
        </div>
        <div className="grid sm:grid-cols-4 gap-4 w-full">
          {/* address */}
          <Input
            label="Endereço"
            color={true}
            required={true}
            value={address}
            placeholder={'Rua, Número'}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* region */}
          <Input
            label="Bairro"
            color={true}
            required={true}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          {/* city */}
          <Input
            label="Cidade"
            color={true}
            required={true}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="flex w-full flex-col gap-3">
            {/* state */}
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



        {/* submit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Button
            label={'Delete Account'}
            Icon={RiDeleteBin5Line}
            onClick={() => {
              toast.error('This feature is not available yet');
            }}
          />
          <Button
            label={'Cadastrar'}
            Icon={HiOutlineCheckCircle}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
