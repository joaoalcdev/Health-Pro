import { useState, useEffect } from 'react';
import Uploder from '../Uploader';
import { genderDatas, specialties, councilDatas, brStateDatas } from '../Datas';
import { Button, ButtonNegative, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi';
import { BiArchiveIn } from "react-icons/bi";
import { InputMaskComp } from '../Form';
import { updateProfessional, deleteProfessional } from '../../api/ProfessionalsAPI';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { set } from 'rsuite/esm/utils/dateUtils';

function ProfessionalInfo({ data, onStatus }) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const [firstName, setFirstName] = useState(data.firstName)
  const [lastName, setLastName] = useState(data.lastName)
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber)
  const [email, setEmail] = useState(data.email)
  const [address, setAddress] = useState(data.address)
  const [region, setRegion] = useState(data.region)
  const [city, setCity] = useState(data.city)
  const [state, setState] = useState(brStateDatas.states[data.state - 1]);

  const [fullName, setFullName] = useState(data.fullName)
  const [rg, setRg] = useState(data.rg)
  const [rgInssuance, setRgInssuance] = useState(data.rgInssuance)
  const [cpf, setCpf] = useState(data.cpf)
  const [gender, setGender] = useState(genderDatas.gender[data.gender - 1])
  const [specialty, setSpecialty] = useState(specialties.specialty[data.specialty - 1]);
  const [council, setCouncil] = useState(councilDatas.council[data.council - 1]);
  const [councilNumber, setCouncilNumber] = useState(data.councilNumber)

  const handleChange2Edit = () => {
    setIsEdit(!isEdit)
    setIsDisabled(true)
    onStatus(true)
  }

  useEffect(() => {
    setFullName(data.fullName)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setPhoneNumber(data.phoneNumber)
    setEmail(data.email)
    setAddress(data.address)
    setRegion(data.region)
    setCity(data.city)
    setState(brStateDatas.states[data.state - 1])
    setRg(data.rg)
    setRgInssuance(data.rgInssuance)
    setCpf(data.cpf)
    setGender(genderDatas.gender[data.gender - 1])
    setSpecialty(specialties.specialty[data.specialty - 1])
    setCouncil(councilDatas.council[data.council - 1])
    setCouncilNumber(data.councilNumber)
  }, [data])

  useEffect(() => {

    if (fullName !== data.fullName || firstName !== data.firstName || lastName !== data.lastName || phoneNumber !== data.phoneNumber || email !== data.email || address !== data.address || region !== data.region || city !== data.city || rg !== data.rg || rgInssuance !== data.rgInssuance || cpf !== data.cpf || councilNumber !== data.councilNumber) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [fullName, firstName, lastName, phoneNumber, email, address, region, city, state, rg, rgInssuance, cpf, councilNumber])

  const handleEditProfessional = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateProfessional(data.id,
      {
        userId: data.userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        region,
        city,
        state: state.id,
        fullName,
        rg,
        rgInssuance,
        cpf,
        gender: gender.id,
        specialty: specialty.id,
        council: council.id,
        councilNumber,
      }
    )

    if (response) {
      toast.success("Profissional atualizado com sucesso!", {
        position: "top-center",
      })
      setLoading(false);
      setIsEdit(false);
      setIsDisabled(true);
      onStatus(true);
    } else {
      toast.error("Erro ao atualizar o profissional, tente novamente!", {
        position: "top-center",
      })
      setLoading(false);
    }
  }

  const handleDeleteProfessional = async () => {
    const response = await deleteProfessional(data.userId)
    if (response) {
      toast.success('Profissional deletado com sucesso')
      onStatus(true)
      setIsConfirmationOpen(false)
    } else {
      toast.error('Não foi possível deletar o profissional')
    }
  }

  const onCloseModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleClickDeactivateProfessional = () => {
    setIsConfirmationOpen(true)
  }

  return (!isEdit ?
    //view mode
    <>
      { //confirmation modal
        isConfirmationOpen && (
          <ConfirmationModal
            title={'Deletar Profissional'}
            closeModal={onCloseModal}
            isOpen={isConfirmationOpen}
            onConfirm={handleDeleteProfessional}
            question={"Você tem certeza que deseja deletar esse profissional?"}
          />
        )}
      <h1 className='text-md mb-4 font-medium'>Informações do Profissional</h1>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Nome</h1>
          <p className="text-black text-md font-semibold">{data.fullName}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">Email</h1>
            <p className="text-black text-md font-semibold">{data.email}</p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">Telefone de Contato</h1>
            <p className="text-black text-md font-semibold">{formatPhoneNumber(data.phoneNumber)}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">RG</h1>
            <p className="text-black text-md font-semibold">{data.rg}</p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">RG - Emissor</h1>
            <p className="text-black text-md font-semibold">{data.rgInssuance}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">CPF</h1>
            <p className="text-black text-md font-semibold">{data.cpf}</p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">Gênero</h1>
            <p className="text-black text-md font-semibold">{data.gender ? genderDatas.gender[data.gender - 1].name : ""}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Endereço</h1>
          <p className="text-black text-md font-semibold">{data.address}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">Bairro</h1>
            <p className="text-black text-md font-semibold">{data.region}</p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-black text-sm">Cidade</h1>
            <p className="text-black text-md font-semibold">{data.city} - {data.state ? brStateDatas.states[data.state - 1].UF : ""}</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Especialidade</h1>
          <p className="text-black text-md font-semibold">{data.specialty ? specialties.specialty[data.specialty - 1].name : ""}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Conselho</h1>
          <p className="text-black text-md font-semibold">{data.council ? councilDatas.council[data.council - 1].name : ""} - {data.councilNumber}</p>
        </div>
        {/* buttons */}
        <ButtonNegative
          label={'Desativar Profissional'}
          Icon={BiArchiveIn}
          onClick={handleClickDeactivateProfessional}
        />
        <Button
          label={'Editar Professional'}
          Icon={HiOutlinePencilAlt}
          onClick={handleChange2Edit}
        />
      </div >
    </>
    :
    <>
      <h1 className='text-md mb-4 font-medium'>Editar Profissional</h1>
      <form className="grid sm:grid-cols-2 gap-4 w-full" onSubmit={handleEditProfessional}>
        {/* fullName */}
        <Input
          label="Nome completo"
          value={fullName}
          color={true}
          type="text"
          onChange={(e) => setFullName(e.target.value)}
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
        <Input
          label="Primeiro Nome"
          value={firstName}
          color={true}
          onChange={(e) =>
            setFirstName(e.target.value)
          }
          type="text"
        />

        <Input
          label="Sobrenome"
          value={lastName}
          color={true}
          onChange={(e) =>
            setLastName(e.target.value)
          }
          type="text"
        />

        {/* RG and CPF */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            label="RG"
            value={rg}
            color={true}
            onChange={(e) =>
              setRg(e.target.value)
            }
            type="text"
          />

          <Input
            label="Emissor"
            value={rgInssuance}
            color={true}
            onChange={(e) =>
              setRgInssuance(e.target.value)
            }
            type="text"
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
                {gender.name ? gender.name : ""}<BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>


        {/* address */}
        <Input
          label="Endereço"
          value={address}
          color={true}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          type="text"
        />
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            label="Bairro"
            value={region}
            color={true}
            onChange={
              (e) =>
                setRegion(e.target.value)
            }
            type="text"
          />
          <Input
            label="Cidade"
            value={city}
            color={true}
            onChange={(e) =>
              setCity(e.target.value)
            }
            type="text"
          />
        </div>

        {/* specialty and council data*/}
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Especialidade</p>
          <Select
            selectedPerson={specialty}
            setSelectedPerson={setSpecialty}
            datas={specialties.specialty}
          >
            <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
              {specialty.name ? specialty.name : ""}<BiChevronDown className="text-xl" />
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
                {council ? council.name : ""}<BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <Input
            label="Nº Conselho"
            value={councilNumber}
            color={true}
            onChange={(e) =>
              setCouncilNumber(e.target.value)
            }
            type="text"
          />

        </div>

        {/* submit */}
        <button
          onClick={handleChange2Edit}
          className="bg-subMain bg-opacity-5 text-subMain border text-sm p-3 rounded-lg font-light"
        >
          Voltar
        </button>
        <Button
          label={'Salvar'}
          Icon={HiOutlineCheckCircle}
          disabled={isDisabled}
          loading={loading}
        />
      </form>
    </>
  );
}

export default ProfessionalInfo;