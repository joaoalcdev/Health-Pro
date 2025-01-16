// react - imports
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Auth";

// icons - imports  
import { BiChevronDown, BiLoaderCircle, BiSave } from "react-icons/bi";
import { GiCancel, GiConfirmed } from "react-icons/gi";

// components - imports
import { Tooltip } from 'react-tooltip';
import { Input, DatePickerComp, Button, OutLinedButton, ButtonNegative, SelectListBox } from "../../components/Form";
import toast from "react-hot-toast";
import EventCheckInModal from "../../components/Modals/EventCheckInModal";
import EventCancelationModal from "../../components/Modals/EventCancelationModal";

// api - imports
import { updateEvent, cancelEvent } from "../../api/EventsAPI";

// datas - imports
import { agreements } from "../../components/Datas";
import { eventTypes } from "../../components/Datas";

// utils - imports
import { formatDate, formatDateTime } from "../../utils/formatDate";


function EventDetailsInfo({ data, onStatus, openEdit, openReschedule }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [disabled, setDisabled] = useState(true);
  const [viewCheckIn, setViewCheckIn] = useState(false);
  const [viewCancelationModal, setViewCancelationModal] = useState(false);

  const [cancelationType, setCancelationType] = useState(null);

  const [agreement, setAgreement] = useState({});
  const [authorizationCode, setAuthorizationCode] = useState('');
  const [authorizationDate, setAuthorizationDate] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [prePasswordDate, setPrePasswordDate] = useState('');
  const [eventStatus, setEventStatus] = useState('');


  useEffect(() => {
    data ? setLoading(false) : setLoading(true);
    data.agreementId === 0 ? setAgreement('') : setAgreement(agreements.agreement[data.agreementId - 1]);
    data.agAuthCode ? setAuthorizationCode(data.agAuthCode) : setAuthorizationCode('');
    data.agAuthDate ? setAuthorizationDate(new Date(data.agAuthDate)) : setAuthorizationDate('');
    data.agPreCode ? setPrePassword(data.agPreCode) : setPrePassword('');
    data.agPreCodeDate ? setPrePasswordDate(new Date(data.agPreCodeDate)) : setPrePasswordDate('');
    data.eventStatus ? setEventStatus(data.eventStatus) : setEventStatus('');
  }, [data]);

  //Update Agreement data
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

  //Cancel Event
  const handleCancelEvent = async () => {
    setLoading(true)
    setDisabled(true)
    const response = await cancelEvent(data.eventInstanceId,
      {
        eventInstanceId: data.eventInstanceId,
        eventId: data.id,
        cancelType: cancelationType,
        eventStartTime: data.startTime
      }
    );
    if (response.response && response.response.status >= 400) {
      toast.error('Erro ao cancelar o agendamento!');
      setLoading(false)
      setDisabled(false)
      return
    }

    toast.success('Agendamento cancelado com sucesso!');
    setLoading(false);
    setDisabled(true);
    onStatus(true);
    setViewCancelationModal(false)
  }

  //Clear Authorization Date input
  const handleClearAuth = () => {
    setAuthorizationDate('')
  }

  //Clear PrePassword Date input
  const handleClearPreP = () => {
    setPrePasswordDate('')
  }

  //Open CheckIn Modal
  const handleOpenCheckIn = () => {
    setViewCheckIn(true)
  }

  //Open Cancelation Modal
  const handleOpenCancelationModal = () => {
    setViewCancelationModal(true)
  }

  return (loading ?
    <div className="flex  items-center justify-center w-full h-1/2 ">
      <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
    </div> :
    <>
      {viewCheckIn &&
        <EventCheckInModal
          closeModal={() => setViewCheckIn(false)}
          isOpen={viewCheckIn}
          datas={data}
          status={onStatus}
        />

      }
      {viewCancelationModal &&
        <EventCancelationModal
          closeModal={() => setViewCancelationModal(false)}
          title={'Desmarcar'}
          question={data.eventType <= 3 ? 'Deseja desmarcar todos os agendamentos ou somente este?' : 'Você tem certeza que deseja desmarcar este agendamento?'}
          isOpen={viewCancelationModal}
          datas={data}
          status={onStatus}
          setCancelationType={setCancelationType}
          onConfirm={handleCancelEvent}
          eventType={data.eventType}
        />
      }

      <div className="flex flex-col gap-6 ">
        <header className="">
          <h1 className='text-md mb-4 font-medium'>Detalhes do Agendamento</h1>
        </header>
        <div className="flex flex-col gap-4">
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

          {/* Box with Agreement data */}
          {data.eventType !== 5 && user.roleId !== 3 &&

            <div className="flex flex-col border-[3px] border-subMain/70 rounded-lg p-4 gap-4">
              <div className="flex justify-between">
                <h1 className=" text-black text-md">Convênio?</h1>
                <div className="w-6 h-6 cursor-pointer" onClick={handleUpdateAgreement}>
                  {/* button save */}
                  <span data-tooltip-id="my-tooltip" data-tooltip-content="Salvar" className="text-subMain"><BiSave className="w-full h-full" /></span>
                  <Tooltip id="my-tooltip" className="!bg-subMain border-2 border-subMain" arrowColor="text-gray-300" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
                <div className="col-start-1 col-end-3">
                  <SelectListBox label={'Convênio'}
                    color={true}
                    selectedPerson={agreement}
                    setSelectedPerson={setAgreement}
                    datas={agreements.agreement}
                    disabled={data.eventStatus !== 1}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
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
                      setAuthorizationCode(e.target.value)
                    }}
                  />
                  <div className='relative'>
                    {/* DatePicker */}
                    <div className="relative cursor-pointer border-gray-400">
                      <DatePickerComp
                        label={'Data da Autorização'}
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
                      setPrePassword(e.target.value)
                    }}
                  />
                  <div className='relative'>
                    {/* DatePicker */}
                    <div className="relative cursor-pointer border-gray-400">
                      <DatePickerComp
                        label={'Data da Pré-Senha'}
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
        </div >
        <footer>
          {
            data.eventStatus === 1 && user.roleId !== 3 &&
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <ButtonNegative
                  label="Desmarcar"
                  className="flex-1"
                  //disabled={true}
                  onClick={() => { handleOpenCancelationModal() }}
                />
                <OutLinedButton
                  label="Remarcar"
                  className="flex-1"
                  //disabled={true}
                  onClick={openReschedule}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <OutLinedButton
                  label="Editar Recorrência"
                  className="flex-1"
                  //disabled={true}
                  onClick={openEdit}
                />
                <Button
                  label="Realizar check-in"
                  className="flex"
                  //disabled={true}
                  onClick={() => { handleOpenCheckIn() }}
                />
              </div>
            </div>
          }
          {eventStatus === 3 &&
            <div className="flex p-2 text-subMain justify-end items-center">
              <span className="mr-2"><GiConfirmed /></span>
              Check-in realizado por {data.checkInName}, {formatDate(data.checkInDate)} às {formatDateTime(data.checkInDate)}.
            </div>
          }
          {eventStatus === 5 &&
            <div className="flex p-2 text-red-600 justify-end items-center">
              <span className="mr-2"><GiCancel /></span>
              Agendamento cancelado.
            </div>
          }

        </footer>
      </div>
    </>
  );
}

export default EventDetailsInfo;