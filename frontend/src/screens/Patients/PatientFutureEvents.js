import { Link } from 'react-router-dom';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { IoIosArrowForward } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';

function PatientFutureEvents({ datas }) {

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-md font-medium sm:block hidden">
          Próximos Agendamentos
        </h1>
        <div className='flex flex-col gap-2'>

          {datas.length > 0 ? datas.map((item, index) => (
            <div key={index} className="flex w-full justify-center items-center bg-greyed hover:bg-gray-200 rounded-lg p-4 group transitions" >
              <div className="w-full flex justify-center items-center">
                <div className="flex flex-col sm:flex-col justify-center items-center ">
                  <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>{(index + 1)}</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                  <div className="flex text-center flex-col justify-center items-center sm:items-start">
                    <p className='flex text-sm text-main'>{item.professionalFirstName} {item.professionalLastName}</p>
                  </div>
                  {/* Tipo de evento */}
                  <div className="flex text-center flex-col justify-center items-center sm:items-start">
                    <p className='flex text-sm text-main'>{item.eventType <= 3 ? item.serviceName : item.eventType === 4 ? 'Consulta' : 'Retorno'}</p>
                  </div>
                  {/* Data */}
                  <div className="flex text-center flex-col justify-center items-center sm:items-start">
                    <p className='flex text-sm text-main'>{formatDate(item.startTime)} - {formatDateTime(item.startTime)}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-6 h-6 cursor-pointer">
                    {/* button redirect event */}
                    <span data-tooltip-id="my-tooltip" data-tooltip-content="Ver detalhes" className="text-subMain">
                      <button className="flex justify-center items-center rounded-lg">
                        <Link replace to={`/events/details/${item.eventInstanceId}`} target='_blank'>
                          <h3><IoIosArrowForward className="text-2xl text-subMain" /></h3>
                        </Link>
                      </button>
                    </span>
                    <Tooltip id="my-tooltip" className="!bg-subMain border-2 border-subMain" arrowColor="text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          )) :
            <div className='flex justify-center'>
              <p className="mt-8 text-black">Nenhum agendamento encontrado</p>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default PatientFutureEvents;
