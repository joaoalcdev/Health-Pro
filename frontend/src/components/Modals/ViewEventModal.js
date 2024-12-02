import { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonNegative,
  DatePickerComp,
  TimePickerComp,
} from '../Form';
import { BiCalendar } from 'react-icons/bi';
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { weekDays } from '../Datas';


function ViewEventModal({ closeModal, isOpen, datas, status }) {
  const navigate = useNavigate();

  //controllers
  const [open, setOpen] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  //data
  const [startDate, setStartDate] = useState(datas.start);
  const [startTime, setStartTime] = useState(datas.start);

  const handleReschedule = () => {
    toast.error('Implementar função de remarcar');
    // if (!startDate) {
    //   toast.error('Selecione a data');
    //   return;
    // }
    // if (!startTime) {
    //   toast.error('Selecione a hora');
    //   return;
    // }
    // const data = {
    //   appointmentId: datas.id,
    //   patientId: datas.patientId,
    //   professionalId: datas.professionalId,
    //   startTime: new Date(
    //     startDate.getFullYear(),
    //     startDate.getMonth(),
    //     startDate.getDate(),
    //     startTime.getHours(),
    //     startTime.getMinutes(),
    //   ),
    //   endTime: new Date(
    //     startDate.getFullYear(),
    //     startDate.getMonth(),
    //     startDate.getDate(),
    //     startTime.getHours(),
    //     startTime.getMinutes() + 30,
    //   ),
    //};

    //const response = rescheduleAppointment(data, datas.id);
    // if (response) {
    //   toast.success('Agendamento atualizado com sucesso!');
    //   closeModal();
    //   status(true)
    // }
    // status(true);
  }

  const handleDelete = async () => {
    toast.error('Implementar função de deletar');
    // const response = await deleteAppointment(datas.id);
    // if (response.response && response.response.data.error === 1) {
    //   toast.error('Agendamento não pode ser deletado!');
    //   closeModal();
    //   status(true);
    //   return;
    // }
    // if (response.status && response.status === 200) {
    //   toast.success('Agendamento deletado com sucesso!');
    //   closeModal();
    //   status(true)
    // }
  }

  const handleShowReschedule = () => {
    setShowReschedule(!showReschedule);
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={
        datas.eventType === 4 ? 'Consulta' :
          datas.eventType === 5 ? 'Retorno' : 'Atendimento'
      }
      width={'max-w-xl'}
      height={'sm:h-[65%vh]'}
    >

      <div className="flex-colo gap-6 pb-8">
        <div className="grid sm:grid-cols-2 gap-4 w-full">

          <div className="flex w-full flex-col gap-1">
            <h1 className="text-gray-400 text-sm">Profissional</h1>
            <p className="text-black text-md font-semibold">{datas.professionalFirstName} {datas.professionalLastName}</p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <h1 className="text-gray-400 text-sm">Paciente</h1>
            <p className="text-black text-md font-semibold">{datas.patientFullName}</p>
          </div>
        </div>
        {datas.serviceName &&

          <div className="grid sm:grid-cols-1 gap-4 w-full">
            <div className="flex w-full flex-col gap-1">
              <h1 className="text-gray-400 text-sm">Serviço</h1>
              <p className="text-black text-md font-semibold">{datas.serviceName}</p>
            </div>
          </div>
        }

        <div className="grid sm:grid-cols-1 gap-4 w-full">
          {showReschedule ?
            <>
              <div className="grid sm:grid-cols-2 z-[100] gap-4 w-full">
                <DatePickerComp
                  label="Data da consulta"
                  startDate={startDate}
                  color={'subMain'}
                  dateFormat={'dd/MM/yyyy'}
                  placeholderText={"Selecionar data"}
                  onChange={(date) => setStartDate(date)}
                />
                <TimePickerComp
                  label="Horário"
                  startDate={startTime}
                  placeholderText={"Selecionar horário"}
                  onChange={(date) => setStartTime(date)}
                  required
                />

              </div>
              <div className="grid sm:grid-cols-2 mt-8 gap-4 w-full">
                <Button
                  label="Agendar"
                  Icon={BiCalendar}
                  onClick={handleReschedule}
                />
                <ButtonNegative
                  label="Desfazer"
                  //Icon={FaRegEdit}
                  onClick={handleShowReschedule}
                />
              </div>
            </>
            :
            <>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div>
                  <h1 className="text-gray-400 text-sm">Data</h1>
                  <p>{formatDate(datas.startTime)} <span className='text-sm text-gray-500'>({weekDays[new Date(datas.startTime).getDay()].name})</span></p>
                </div>
                <div>
                  <h1 className="text-gray-400 text-sm">Hora</h1>
                  <div className="flex flex-row gap-6">
                    {formatDateTime(datas.startTime)} - {formatDateTime(datas.endTime)}
                    {
                      datas.hasConflict ? <span className=" text-red-500 flex gap-2 items-center">
                        <FiAlertTriangle className='text-md' />
                        Conflito</span> : <HiOutlineCheckCircle className="text-xl text-green-700" />
                    }
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <button
          onClick={closeModal}
          className="bg-subMain bg-opacity-5 text-subMain text-sm p-4 rounded-lg font-light"
        >
          Voltar
        </button>
        <Button
          label="Ver"
          disabled={showReschedule}
          //Icon={FaRegEdit}
          onClick={() => {
            navigate(`/events/details/${datas.eventInstanceId}`)
          }}
        />
      </div>
    </Modal >
  );
}

export default ViewEventModal;
