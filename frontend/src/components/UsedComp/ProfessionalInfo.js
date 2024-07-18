// dependencies - import
import { useState, useEffect } from 'react';

// components - import
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { InputMaskComp, Button, ButtonNegative, Input, SelectListBox } from '../Form';

// datas - import
import { sortsDatas, genderDatas, specialties, councilDatas, brStateDatas } from '../Datas';

// api - import
import { recoveryUser } from '../../api/UsersAPI';
import { updateProfessional, deleteProfessional } from '../../api/ProfessionalsAPI';

// icons
import { BiChevronDown, BiArchiveIn } from 'react-icons/bi';
import { HiOutlineCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi';

// utils
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

function ProfessionalInfo({ data, onStatus }) {
  //controllers
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  //User data
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [email, setEmail] = useState(data.email);
  const [address, setAddress] = useState(data.address);
  const [region, setRegion] = useState(data.region);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(brStateDatas.states[data.state - 1]);
  const [gender, setGender] = useState(genderDatas.gender[data.gender - 1]);

  //Professional data
  const [fullName, setFullName] = useState(data.fullName);
  const [rg, setRg] = useState(data.rg);
  const [rgInssuance, setRgInssuance] = useState(data.rgInssuance);
  const [cpf, setCpf] = useState(data.cpf);
  const [specialty, setSpecialty] = useState(specialties.specialty[data.specialty - 1]);
  const [council, setCouncil] = useState(councilDatas.council[data.council - 1]);
  const [councilNumber, setCouncilNumber] = useState(data.councilNumber);

  //set data on edit mode
  useEffect(() => {
    setFullName(data.fullName);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhoneNumber(data.phoneNumber);
    setEmail(data.email);
    setAddress(data.address);
    setRegion(data.region);
    setCity(data.city);
    setState(brStateDatas.states[data.state - 1]);
    setRg(data.rg);
    setRgInssuance(data.rgInssuance);
    setCpf(data.cpf);
    setGender(genderDatas.gender[data.gender - 1]);
    setSpecialty(specialties.specialty[data.specialty - 1]);
    setCouncil(councilDatas.council[data.council - 1]);
    setCouncilNumber(data.councilNumber);
  }, [data]);

  //check if the data has changed in order to enable the save button
  useEffect(() => {

    if (
      fullName !== data.fullName ||
      firstName !== data.firstName ||
      lastName !== data.lastName ||
      email !== data.email ||
      phoneNumber !== data.phoneNumber ||
      address !== data.address ||
      region !== data.region ||
      city !== data.city ||
      data.state !== state.id ||
      rg !== data.rg ||
      cpf !== data.cpf ||
      data.council !== council.id ||
      data.specialty !== specialty.id ||
      data.gender !== gender.id ||
      rgInssuance !== data.rgInssuance ||
      councilNumber !== data.councilNumber
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [fullName, firstName, lastName, phoneNumber, email, address, region, city, state, rg, rgInssuance, cpf, councilNumber, data.fullName, data.firstName, data.lastName, data.phoneNumber, data.email, data.address, data.region, data.city, data.rg, data.rgInssuance, data.cpf, data.councilNumber, data.council, council.id, data.state, data.specialty, data.gender, specialty.id, gender.id])

  //edit professional
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
    );

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

  //change to edit mode
  const handleChange2Edit = () => {
    setIsEdit(!isEdit);
    setIsDisabled(true);
    onStatus(true);
  }

  //reactivate professional
  const handleReactiveProfessional = async () => {
    setLoading(true);
    const response = await recoveryUser(data.userId);
    if (response) {
      toast.success('Profissional restaurado com sucesso');
      onStatus(true);
      setLoading(false);
    } else {
      toast.error('Não foi possível restaurar o profissional');
    }
  }

  //delete professional
  const handleDeleteProfessional = async () => {
    const response = await deleteProfessional(data.userId)
    if (response) {
      toast.success('Profissional deletado com sucesso');
      onStatus(true);
      setIsConfirmationOpen(false);
      setLoading(false);
    } else {
      toast.error('Não foi possível deletar o profissional');
    }
  }

  //close confirmation modal
  const onCloseModal = () => {
    setIsConfirmationOpen(false);
    setLoading(false);
  };
  //open confirmation modal
  const handleClickDeactivateProfessional = () => {
    setIsConfirmationOpen(true);
    setLoading(true);
  }

  const [query, setQuery] = useState('')

  const bloodTypeFilter =
    query === ''
      ? sortsDatas.bloodTypeFilter
      : sortsDatas.bloodTypeFilter.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

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
        {data.deletedAt ?
          <Button
            label={'Restaurar Profissional'}
            Icon={HiOutlinePencilAlt}
            loading={loading}
            onClick={handleReactiveProfessional}
          />
          :
          <ButtonNegative
            label={'Deletar Profissional'}
            Icon={BiArchiveIn}
            loading={loading}
            onClick={handleClickDeactivateProfessional}
          />
        }
        <Button
          label={'Editar Professional'}
          disabled={data.deletedAt ? true : false}
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
            <SelectListBox
              label={'Gênero'}
              color={true}
              selectedPerson={gender}
              setSelectedPerson={setGender}
              datas={genderDatas.gender}
              iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
            />
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
          <SelectListBox
            label={'Especialidades'}
            color={true}
            selectedPerson={specialty}
            setSelectedPerson={setSpecialty}
            datas={specialties.specialty}
            iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <SelectListBox
              label={'Conselho'}
              color={true}
              selectedPerson={council}
              setSelectedPerson={setCouncil}
              datas={councilDatas.council}
              iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
            />
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