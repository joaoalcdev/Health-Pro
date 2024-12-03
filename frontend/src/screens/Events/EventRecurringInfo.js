import { useEffect, useState } from "react";
import { eventTypes } from "../../components/Datas";
import { DatePickerComp } from "../../components/Form";
import { BiLoaderCircle, BiSave } from "react-icons/bi";
import { dischargeEvent } from "../../api/EventsAPI";
import toast from "react-hot-toast";

function EventRecurringInfo({ data, onStatus, openEdit }) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const [dischargedDate, setDischargedDate] = useState('');


  useEffect(() => {
    data ? setLoading(false) : setLoading(true);
    data.dischargedDate ? setDischargedDate(new Date(data.dischargedDate)) : setDischargedDate('');
  }, [data]);

  //Update Agreement data
  const handleDischarge = async () => {
    setLoading(true)
    setDisabled(true)

    const response = await dischargeEvent({ dischargedDate: dischargedDate }, data.id);

    if (response.response && response.response.status >= 400) {
      toast.error('Erro ao atualizar o agendamento!');
      setLoading(false)
      setDisabled(false)
      return
    }

    toast.success('Alta definida com sucesso!');
    setLoading(false);
    setDisabled(true);
    onStatus(true);
  }

  //Clear Discharge Date input
  const handleClearDischargeDate = () => {
    setDischargedDate('')
  }

  return (loading ?
    <div className="flex  items-center justify-center w-full h-1/2 ">
      <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
    </div> :
    <div className="flex flex-col gap-6 ">
      <header className="">
        <h1 className='text-md mb-4 font-medium'>Detalhes da Recorrência</h1>
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
        {data.eventType !== 5 &&

          <div className="flex flex-col border-[3px] border-subMain/70 rounded-lg p-4 gap-4">
            <div className="flex justify-between">
              <h1 className=" text-black text-md">Informações da Alta</h1>
              <div className="w-6 h-6 cursor-pointer" onClick={handleDischarge}>
                <span className="text-subMain"><BiSave className="w-full h-full" /></span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 w-full">
              <div className='relative'>
                {/* DatePicker */}
                <div className="relative cursor-pointer border-gray-400">
                  <DatePickerComp
                    //label={'Data da Alta'}
                    closeOnScroll={true}
                    color={true}
                    popperPlacement="top-end"
                    dateFormat="dd/MM/yyyy "
                    placeholderText={'Selecione a data'}
                    locale="pt"
                    startDate={dischargedDate}
                    minDate={new Date()}
                    onChange={(date) => {
                      setDischargedDate(date)
                    }}
                  >
                    <div className="">
                      <button className="p-2 text-subMain font-semibold" onClick={handleClearDischargeDate}>
                        <span className="">
                          Limpar
                        </span>
                      </button>
                    </div>
                  </DatePickerComp>
                </div>
              </div>
              <div className="flex col-span-3 text-sm items-center">
                Importante: Todos os agendamentos após a data de alta serão cancelados.
              </div>
            </div>
          </div >
        }
      </div >

    </div>
  );
}

export default EventRecurringInfo;