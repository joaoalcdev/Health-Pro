import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { brStateDatas, roleOptions, specialties, councilDatas, genderDatas } from '../Datas';
import { InputMaskComp } from '../Form';
import { createProfessional } from '../../api/ProfessionalsAPI';
import { getSpecialties } from '../../api/specialtiesAPI';

function AddProfessionalModal({ closeModal, isOpen, professional, datas, status }) {
  //controllers
  const [loading, setLoading] = useState(false);

  //specialties options
  const [specialties, setSpecialties] = useState([])

  //users properties
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(brStateDatas.states[5]);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(genderDatas.gender[2]);

  //professional properties
  const [fullName, setFullName] = useState("");
  const [rg, setRg] = useState("");
  const [rgInssuance, setRgInssuance] = useState("");
  const [cpf, setCpf] = useState("");
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [council, setCouncil] = useState(councilDatas.council[0]);
  const [councilNumber, setCouncilNumber] = useState("");

  //form steps
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  const fetchSpecialties = async () => {
    const response = await getSpecialties()
    setSpecialties(response)
    setSpecialty(response[0])
  }

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await createProfessional(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        address,
        region,
        city,
        state: state.id,
        gender: gender.id,
        fullName,
        rg,
        rgInssuance,
        cpf,
        specialty: specialty.id,
        council: council.id,
        councilNumber,
      }
    )

    if (error) {
      if (error.response.status === 422) {
        toast.error("Email já cadastrado!")
      } else {
        toast.error("Erro ao criar profissional!")
      }
      setLoading(false)
      return
    }


    closeModal(true)
    status(true)
    setLoading(false);
    toast.success("Profissional criado com sucesso!", {
      position: "top-center",
    })
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
    >{step1 ?
      <>
        <form onSubmit={handleChangeStep}>
          <h1 className='text-md font-light mb-4'>Passo 1: Informações para criação de Usuário/Acesso</h1>
          <div className="flex-colo gap-6">
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <Input
                label="Primeiro Name"
                color={true}
                required={true}
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Sobrenome"
                color={true}
                required={true}
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <Input
                label="Email"
                required={true}
                color={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <Input
                label="Endereço"
                color={true}
                required={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
                <Input
                  label="Cidade"
                  color={true}
                  required={true}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
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
              <Input
                label="Password"
                color={true}
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
      :
      <>
        <form onSubmit={handleSubmit}>
          <h1 className='text-md font-light mb-4'>Passo 2: Informações Complementares</h1>
          {/* Full name */}
          <div className="flex-colo gap-6">
            <Input
              label="Nome Completo"
              color={true}
              required={true}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* RG CPF Gender */}
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <div className="grid sm:grid-cols-2 gap-4 w-full">
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
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">

                <InputMaskComp
                  label={'CPF'}
                  color={true}
                  mask="999.999.999-99"
                  autoClear={true}
                  placeholder={'___.___.___-__'}
                  unmask={true}
                  required={false}
                  value={cpf}
                  onChange={(e) =>
                    setCpf(e.target.value)
                  }
                  className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
                />
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


            {/* specialty and  council*/}
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <div className="flex w-full flex-col gap-3">
                <p className="text-black text-sm">Especialidade</p>
                <Select
                  selectedPerson={specialty}
                  setSelectedPerson={setSpecialty}
                  datas={specialties}
                >
                  <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                    {specialty ? specialty.name : 'Sem dados'}<BiChevronDown className="text-xl" />
                  </div>
                </Select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
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
                <Input
                  label="Numero do Conselho"
                  color={true}
                  value={councilNumber}
                  maxLength={10}
                  onChange={(e) => setCouncilNumber(e.target.value)}
                />

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
      </>
      }
    </Modal >
  );
}

export default AddProfessionalModal;
