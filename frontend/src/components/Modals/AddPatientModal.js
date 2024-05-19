import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { brStateDatas, genderDatas } from '../Datas';
import { InputMaskComp } from '../Form';
// import { set } from 'rsuite/esm/utils/dateUtils';
import { createPatient } from '../../api/PatientsAPI';

function AddPatientModal({ closeModal, isOpen, patient, datas, status }) {
  const [loading, setLoading] = useState(false);


  const [fullName, setFullName] = useState("")
  const [cpf, setCpf] = useState("")
  const [age, setAge] = useState()
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [address, setAddress] = useState("")
  const [region, setRegion] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(brStateDatas.states[5]);

  const [rg, setRg] = useState("")
  const [rgInssuance, setRgInssuance] = useState("")

  const [gender, setGender] = useState(genderDatas.gender[2])

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await createPatient(
      {
        fullName,
        cpf,
        age,
        bloodType: bloodType.name,
        gender: gender.name,
        phoneNumber,
        emergencyContact,
        address,
        region,
        city,
        state: state.UF,
        // rg,
        // rgInssuance,
      }
    )

    // Conditions

    if (!fullName || !cpf || !age || !bloodType || !gender || !address || !region || !city || !state) {
      return toast.error('Favor, preencha todas as informações obrigatórias');
    }
    if (!phoneNumber && !emergencyContact) {
      return toast.error('Favor, preencha ao menos um contato');
    }

    if (response) {
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
      title={'Adicionar Profissional'}
      width={'max-w-3xl'}
    >{step1 ? <>
      <form onSubmit={handleChangeStep}>
        <h1 className='text-md font-light mb-4'>Passo 1: Informações para criação de Usuário/Acesso</h1>
        <div className="flex-colo gap-6">
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Full Name */}
            <Input
              label="Nome Completo"
              color={true}
              required={true}
              placeholder="John"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* CPF */}
            <InputMaskComp
              label="CPF"
              color={true}
              mask="999.999.999-99"
              placeholder={'___.___.___-__'}
              unmask={true}
              required={true}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Age */}
            <Input
              label="Idade"
              required={true}
              color={true}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {/* Tel */}
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
            {/* Emergncy Contact */}
            <InputMaskComp
              label="emergencyContact"
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
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* Address */}
            <Input
              label="Endereço"
              color={true}
              required={true}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* Region */}
            <Input
              label="Bairro"
              color={true}
              required={true}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* City */}
              <Input
                label="Cidade"
                color={true}
                required={true}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {/* State */}
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
          </div>
          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button
              onClick={closeModal}
              className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
            >
              Cancel
            </button>
            <Button label="Próximo" Icon={HiArrowRight} />
          </div>
        </div>
      </form>
    </>
      : <>
        <form onSubmit={handleSubmit}>
          <h1 className='text-md font-light mb-4'>Passo 2: Informações Profissionais</h1>
          <div className="flex-colo gap-6">
            {/* RG Gender */}
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* <div className="grid sm:grid-cols-2 gap-4 w-full">
                <Input
                  label="RG"
                  color={true}
                  required={true}
                  value={rg}
                  maxLength={13}
                  onChange={(e) => setRg(e.target.value)}
                />
                <Input
                  label="Expedição"
                  color={true}
                  value={rgInssuance}
                  onChange={(e) => setRgInssuance(e.target.value)}
                />
              </div> */}

              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="flex w-full flex-col gap-3">
                  <p className="text-black text-sm">Gênero</p>
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

            </div>

            {/* bloodType */}
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <div className="flex w-full flex-col gap-3">
                <p className="text-black text-sm">Tipo Sanguíneo</p>
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
            </div>


            {/* buttones */}
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <button
                onClick={handleChangeStep}
                className="bg-subMain bg-opacity-5 text-subMain border text-sm p-3 rounded-lg font-light"
              >
                Voltar
              </button>
              <Button label="Save" disable={loading} loading={loading} Icon={HiOutlineCheckCircle} />
            </div>
          </div>
        </form>
      </>}
    </Modal>
  );
}

export default AddPatientModal;
