import { useState, useEffect } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import { Button, MultiplesDatePickers } from '../Form';
import { rescheduleSingleEvent } from '../../api/EventsAPI';
import { toast } from 'react-hot-toast';
import { weekDays } from '../Datas';
import 'moment/locale/pt-br';

export default function RescheduleEventsForm({ datas, onClose, status, isEdit }) {

  const today = new Date();
  today.setHours(6, 0, 0, 0);

  //controllers
  const [loading, setLoading] = useState(false);

  //input data
  const [startDate, setStartDate] = useState(new Date(datas.startTime));

  useEffect(() => {
    console.log(datas)
  }, [datas])

  const handleSave = async () => {
    setLoading(true)

    const data = {
      startTime: startDate,
    };

    await rescheduleSingleEvent(data, datas.eventInstanceId).then(response => {
      if (response.status === 200) {
        toast.success('Reagendamento realizado com sucesso!')
        onClose()
        status(true)
      } else {
        toast.error('Erro ao reagendar evento!')
      }
    })
  }

  return (
    loading ? <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-subMain"></div>
    </div> :
      <>

        <div className='relative h-full z-50 grid grid-cols-1'>

          {/* Header */}
          <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
            <h1 className="text-md font-semibold">Remarcar</h1>
            <button
              onClick={onClose}
              className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
            <div className="flex w-full flex-col gap-1 ">
              <p className="text-black text-sm">Data do agendamento</p>
              <div className='flex  w-full    bg-white text-sm border items-center border-border font-light rounded-lg focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain'>
                <div className='px-4'>
                  <MultiplesDatePickers
                    showTimeSelect={true}
                    minDate={today}
                    color={'red-600'}
                    dateFormat={'dd/MM/yyyy - hh:mm aa'}
                    placeholderText={"Selecionar data"}
                    locale={'pt-BR'}
                    startDate={startDate}
                    onChange={(date) => {
                      setStartDate(date)
                      // setIsDisabled(false)
                    }}
                  />
                </div>
                <div className='w-full h-full p-4 bg-gray-50 border-l cursor-default'>
                  <p className='text-md font-light capitalize text-gray-400 bg-gray-50 '>
                    {weekDays[startDate.getDay()].name}
                  </p>
                </div>
              </div>
            </div>
          </div >

          {/* Footer */}
          <div className="fixed flex inset-x-0 bottom-0 p-4 " >
            <div className='flex gap-4 items-end w-full'>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className='col-start-2'>

                  <Button
                    label={"Salvar"}
                    Icon={HiOutlineCheckCircle}
                    onClick={() => handleSave()}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div >
      </>
  );

}