import { useState, useEffect } from 'react';
import Uploder from '../Uploader';
import { genderDatas, specialties, councilDatas, brStateDatas } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { InputMaskComp } from '../Form';
import { set } from 'rsuite/esm/utils/dateUtils';


function ProfessionalInfo({ data }) {
  const [isEdit, setIsEdit] = useState(false)

  const [firstName, setFirstName] = useState(data.first_name)
  const [lastName, setLastName] = useState(data.last_name)
  const [phoneNumber, setPhoneNumber] = useState(data.phone_number)
  const [email, setEmail] = useState(data.email)
  const [address, setAddress] = useState(data.address)
  const [region, setRegion] = useState(data.region)
  const [city, setCity] = useState(data.city)
  const [state, setState] = useState(brStateDatas.states[data.state - 1]);

  const [fullName, setFullName] = useState(data.full_name)
  const [rg, setRg] = useState(data.rg)
  const [rgInssuance, setRgInssuance] = useState(data.rg_inssuance)
  const [cpf, setCpf] = useState(data.cpf)
  const [gender, setGender] = useState(data.gender)
  const [specialty, setSpecialty] = useState(specialties.specialty[data.specialty - 1]
  );
  const [council, setCouncil] = useState(councilDatas.council[data.council - 1]);
  const [councilNumber, setCouncilNumber] = useState(data.council_number)
  const [councilInssuance, setCouncilInssuance] = useState(brStateDatas.states[data.council_inssuance - 1])

  const handleChange2Edit = () => {
    setIsEdit(!isEdit)
  }


  return (!isEdit ?
    //view mode
    <div className="grid sm:grid-cols-2 gap-4 w-full">
      <div className="flex w-full flex-col gap-3">
        <h1 className="text-black text-sm">Nome</h1>
        <p className="text-black text-md font-semibold">{data.full_name}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Email</h1>
          <p className="text-black text-md font-semibold">{data.email}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Telefone de Contato</h1>
          <p className="text-black text-md font-semibold">{data.phone_number}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">RG</h1>
          <p className="text-black text-md font-semibold">{data.rg}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">RG - Emissor</h1>
          <p className="text-black text-md font-semibold">{data.rg_inssuance}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <h1 className="text-black text-sm">CPF</h1>
        <p className="text-black text-md font-semibold">{data.cpf}</p>
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
        <p className="text-black text-md font-semibold">{data.specialty ? specialties.specialty[data.specialty].name : ""}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Conselho</h1>
          <p className="text-black text-md font-semibold">{data.council ? councilDatas.council[data.council].name : ""} - {data.council_number}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-black text-sm">Estado de Emissão</h1>
          <p className="text-black text-md font-semibold">{data.council_inssuance ? brStateDatas.states[data.council_inssuance - 1].name : ""}</p>
        </div>
      </div>
      {/* submit */}
      <div></div>
      <Button
        label={'Editar Professional'}
        Icon={HiOutlinePencilAlt}
        onClick={handleChange2Edit}
      />
    </div > :




    <div className="grid sm:grid-cols-2 gap-4 w-full">

      {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Imagem de Perfil</p>
        <Uploder />
      </div> */}
      {/* select  */}


      {/* fullName */}
      <Input label="Nome completo" value={fullName} color={true} type="text" />
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
      <Input label="Primeiro Nome" value={firstName} color={true} type="text" />
      <Input label="Sobrenome" value={lastName} color={true} type="text" />

      {/* RG and CPF */}
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <Input label="RG" value={rg} color={true} type="text" />
        <Input label="Emissor" value={rgInssuance} color={true} type="text" />
      </div>
      <Input label="CPF" value={cpf} color={true} type="text" />

      {/* address */}
      <Input label="Endereço" value={address} color={true} type="text" />
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <Input label="Bairro" value={region} color={true} type="text" />
        <Input label="Cidade" value={city} color={true} type="text" />
      </div>

      {/* specialty and council data*/}
      <div className="grid sm:grid-cols-2 gap-4 w-full">
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
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <Input label="Nº Conselho" value={councilNumber} color={true} type="text" />
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Estado de Emissão</p>
          <Select
            selectedPerson={councilInssuance}
            setSelectedPerson={setCouncilInssuance}
            datas={brStateDatas.states}
          >
            <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
              {councilInssuance ? councilInssuance.name : ""}<BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
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
        onClick={() => {
          toast.error('This feature is not available yet');
        }}
      />
    </div>
  );
}

export default ProfessionalInfo;