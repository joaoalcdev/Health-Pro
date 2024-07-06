import React, { useEffect, useState } from "react";
import { eventTypes } from "../../components/Datas";
import { Select, Input, DatePickerComp, Button, OutLinedButton, ButtonNegative } from "../../components/Form";
import { agreements } from "../../components/Datas";
import { BiChevronDown, BiSave } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { updateEvent } from "../../api/EventsAPI";
import EventCheckInModal from "../../components/Modals/EventCheckInModal";
import toast from "react-hot-toast";
import { formatDate, formatDateTime } from "../../utils/formatDate";

function EventDetailsInfo({ data, onStatus }) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [viewCheckIn, setViewCheckIn] = useState(false);


  const [agreement, setAgreement] = useState({});
  const [authorizationCode, setAuthorizationCode] = useState(null);
  const [authorizationDate, setAuthorizationDate] = useState(null);
  const [prePassword, setPrePassword] = useState(null);
  const [prePasswordDate, setPrePasswordDate] = useState(null);


  useEffect(() => {
    data ? setLoading(false) : setLoading(true);
    data.agreementId === 0 ? setAgreement('') : setAgreement(agreements.agreement[data.agreementId - 1]);
    data.agAuthCode ? setAuthorizationCode(data.agAuthCode) : setAuthorizationCode(null);
    data.agAuthDate ? setAuthorizationDate(new Date(data.agAuthDate)) : setAuthorizationDate(null);
    data.agPreCode ? setPrePassword(data.agPreCode) : setPrePassword(null);
    data.agPreCodeDate ? setPrePasswordDate(new Date(data.agPreCodeDate)) : setPrePasswordDate(null);
  }, [data]);

  useEffect(() => {
    //enable Button when all fields have changed
    if (agreement.id !== 1) {
      if (authorizationCode !== data.agAuthCode || authorizationDate !== data.agAuthDate || prePassword !== data.agPreCode || prePasswordDate !== data.agPreCodeDate) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      if (agreement.id !== data.agreementId) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  }, [agreement, authorizationCode, authorizationDate, prePassword, prePasswordDate]);


  const handleUpdateAgreement = async () => {
    setLoading(true)
    setDisabled(true)
    const agreementData = {
      agreementId: agreement.id,
      agAuthCode: agreement.id === 1 ? null : authorizationCode,
      agAuthDate: agreement.id === 1 ? null : authorizationDate,
      agPreCode: agreement.id === 1 ? null : prePassword,
      agPreCodeDate: agreement.id === 1 ? null : prePasswordDate
    }
    const response = await updateEvent(agreementData, data.eventInstanceId);
    console.log(response)
    if (response.response && response.response.status >= 400) {
      toast.error('Erro ao atualizar o agendamento!');
      setLoading(false)
      setDisabled(false)
      return
    }

    toast.success('Agendamento atualizado com sucesso!');
    setLoading(false);
    setDisabled(true);
    onStatus(true);
  }

  //Clear Authorization Date input
  const handleClearAuth = () => {
    setAuthorizationDate(null)
  }

  //Clear PrePassword Date input
  const handleClearPreP = () => {
    setPrePasswordDate(null)
  }

  const handleOpenCheckIn = () => {
    setViewCheckIn(true)
  }



  return (loading ? <div>Carregando...</div> :
    <>
      {viewCheckIn &&
        <EventCheckInModal
          closeModal={() => setViewCheckIn(false)}
          isOpen={viewCheckIn}
          datas={data}
          status={onStatus}
        />

      }

      <div className="flex flex-col gap-6 ">
        <header className="">
          <h1 className="text-xl ">Detalhes do Agendamento</h1>
        </header>
        <body className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex w-full flex-col gap-1">
              <h1 className=" text-gray-400 text-sm">Tipo de agendamento</h1>
              <p className="text-black text-md font-semibold">{eventTypes[data.eventType - 1].name}</p>
            </div>
            {data.eventType < 4 ?
              <div className="flex w-full flex-col gap-1">
                <h1 className="text-gray-400 text-sm">Serviço</h1>
                <p className="text-black text-md font-semibold">{data.serviceName}</p>
              </div>
              :
              <div></div>
            }
            <div className="flex w-full flex-col gap-1">
              <h1 className="text-gray-400 text-sm">Profissional</h1>
              <p className="text-black text-md font-semibold">{data.professionalFirstName} {data.professionalLastName}</p>
            </div>
            <div className="flex w-full flex-col gap-1">
              <h1 className="text-gray-400 text-sm">Paciente</h1>
              <p className="text-black text-md font-semibold">{data.patientFullName}</p>
            </div>
          </div>
          {data.eventType !== 5 &&

            <div className="flex flex-col border-[3px] border-subMain/70 rounded-lg p-4 gap-2">
              <h1 className=" text-black text-md">Convênio?</h1>
              <div className="grid sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
                <Select
                  selectedPerson={agreement}
                  setSelectedPerson={setAgreement}
                  datas={agreements.agreement}
                >
                  <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                    {agreement.name ? agreement.name : ""}<BiChevronDown className="text-xl" />
                  </div>
                </Select>
                <div className="w-[50%]">
                  <Button
                    label="Salvar"
                    Icon={BiSave}
                    onClick={handleUpdateAgreement}
                    loading={loading}
                    disabled={disabled}
                  ></Button>
                </div>
              </div>
              {
                agreement.id > 1 &&
                <div className="grid sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
                  <Input
                    label="Código de Autorização"
                    value={authorizationCode}
                    color={true}
                    placeholder={'Opcional'}
                    type="text"
                    onChange={(e) => {
                      e.target.value === "" ? setAuthorizationCode(null) : setAuthorizationCode(e.target.value)
                    }}
                  />
                  <div className='relative'>
                    <p className='pl-1 mb-[-7px] text-sm text-black'>Data da Autorização</p>
                    {/* DatePicker */}
                    <div className="relative cursor-pointer border-gray-400">
                      <DatePickerComp
                        closeOnScroll={true}
                        color={true}
                        popperPlacement="top-end"
                        dateFormat="dd/MM/yyyy"
                        placeholderText={'__/__/____ (Opcional)'}
                        locale="pt"
                        startDate={authorizationDate}
                        maxDate={new Date()}
                        onChange={(date) => {
                          setAuthorizationDate(date)
                        }}
                      >
                        <div className="">
                          <button className="p-2 text-subMain font-semibold" onClick={handleClearAuth}>
                            <span className="">
                              Limpar
                            </span>
                          </button>
                        </div>
                      </DatePickerComp>
                    </div>
                  </div>
                  <Input
                    label="Pré-Senha"
                    value={prePassword}
                    color={true}
                    placeholder={'Opcional'}
                    type="text"
                    onChange={(e) => {
                      e.target.value === "" ? setPrePassword(null) : setPrePassword(e.target.value)
                    }}
                  />
                  <div className='relative'>
                    <p className='pl-1 mb-[-7px] text-sm text-black'>Data da Pré-Senha</p>
                    {/* DatePicker */}
                    <div className="relative cursor-pointer border-gray-400">

                      <DatePickerComp
                        closeOnScroll={true}
                        color={true}
                        popperPlacement="top-end"
                        dateFormat="dd/MM/yyyy"
                        placeholderText={'__/__/____ (Opcional)'}
                        locale="pt"
                        startDate={prePasswordDate}
                        maxDate={new Date()}
                        onChange={(date) => {
                          setPrePasswordDate(date)
                        }}
                      >
                        <div className="">
                          <button className="p-2 text-subMain font-semibold" onClick={handleClearPreP}>
                            <span className="">
                              Limpar
                            </span>
                          </button>
                        </div>
                      </DatePickerComp>
                    </div>
                  </div>
                </div>
              }
            </div >
          }
        </body >
        <footer>
          {
            data.eventStatus === 1 &&
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <ButtonNegative
                  label="Desmarcar"
                  className="flex-1"
                  //disabled={true}
                  onClick={() => { toast.error('Desmarcar') }}
                />
                <OutLinedButton
                  label="Reagendar"
                  className="flex-1"
                  //disabled={true}
                  onClick={() => { toast.error('Reagendar') }}
                />
              </div>
              <div className="grid sm:grid-cols-1 gap-4">
                <Button
                  label="Realizar check-in"
                  className="flex"
                  //disabled={true}
                  onClick={() => { handleOpenCheckIn() }}
                />
              </div>
            </div>
          }
          {data.eventStatus === 3 &&
            <div className="flex p-2 text-subMain justify-end items-center">
              <span className="mr-2"><GiConfirmed /></span>
              Check-in realizado por {data.checkInName}, {formatDate(data.checkInDate)} às {formatDateTime(data.checkInDate)}.
            </div>
          }
        </footer>
      </div>
    </>
  );
}

export default EventDetailsInfo;