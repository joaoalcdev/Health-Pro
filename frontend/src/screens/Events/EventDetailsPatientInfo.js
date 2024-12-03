/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../../hooks/Auth';
import clsx from 'clsx';

// components - import
import { useNavigate, Link } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import EventHistoryShimmer from '../../components/Loadings/EventHistoryShimmer';
import { UsedEventPatientInfo } from './UsedEventPatientInfo';
import { EventDetailsPatientDivider } from '../../components/Dividers/EventDetailsPatientDivider';
import { EventDetailShimmerLoading } from '../../components/Loadings/EventDetailShimmerLoading';
import { Tooltip } from 'react-tooltip';

// utils - import
import { formatDate } from '../../utils/formatDate';

// datas - import
import { genderDatas, insuranceDatas, sortsDatas } from '../../components/Datas';

// api - import
import { getPatient } from '../../api/PatientsAPI';
import { getSpecialties } from '../../api/specialtiesAPI';

// icons - import
import { LiaGenderlessSolid } from "react-icons/lia";
import { LiaTintSolid } from "react-icons/lia";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineCalendarDays, HiOutlineIdentification, HiOutlineCreditCard, HiOutlineHomeModern } from 'react-icons/hi2';
import { IoIosArrowForward } from 'react-icons/io';
import { BsEye } from 'react-icons/bs';


function EventDetailsPatientInfo({ data, onStatus }) {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //data
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientNextEvents, setPatientNextEvents] = useState([]);
  const [patientData, setPatientData] = useState([]);

  const fetch = async () => {
    setLoading(true)
    if (data) {
      const response = await getPatient(data.patientId)
      setLoading(false)
      if (response.status !== 200) {
        setLoading(false)
        return
      }
      if (response.status === 200) {
        setLoading(false)
        setPatientData(response.data)
        setPatientHistory(response.data.history)
        setPatientNextEvents(response.data.nextEvents)
      }
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleViewPatientsDetails = () => {
    navigate(`/patients/preview/${data.patientId}`);
  }

  return (
    <>
      <div className="flex-colo gap-6">
        <div className="flex justify-end w-full">
          <div className="w-full md:col-span-1 flex sm:justify-between items-center">
            <div className="flex">
              <h1 className='flex flex-col text-md  font-medium text-black text-center md:text-left w-full text-wrap'>Dados do paciente</h1>
            </div>
            <div className={`${user.roleId === 3 ? 'hidden' : ''} flex`}>
              <button
                className="flex items-center gap-2 px-6 py-2 border border-subMain hover:opacity-80 rounded-md text-subMain transitions"
                onClick={handleViewPatientsDetails}
              >
                <BsEye className="text-xl" />
                <p className="font-normal">Ver detalhes</p>
              </button>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {loading ?
            <>
              <EventDetailShimmerLoading TitleInfo="Paciente" Label={''} Icon={HiOutlineIdentification} /> {/* loading Full Name */}
              <EventDetailShimmerLoading TitleInfo="Gênero" Label={''} Icon={LiaGenderlessSolid} /> {/* loading Gender */}
            </>
            :
            <>
              <UsedEventPatientInfo TitleInfo="Paciente" Icon={HiOutlineIdentification} DataInfo={data.patientFullName} Label={''} /> {/* Full Name */}
              <UsedEventPatientInfo TitleInfo="Gênero" Icon={LiaGenderlessSolid} DataInfo={data.patientGender ? genderDatas.gender[data.patientGender - 1].name : "Não informado"} Label={''} /> {/* Gender */}
            </>
          }
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {loading ?
            <>
              <EventDetailShimmerLoading TitleInfo="CPF" Label={''} Icon={HiOutlineCalendarDays} /> {/* loading CPF */}
              <EventDetailShimmerLoading TitleInfo="Tipo Sanguíneo" Label={''} Icon={LiaTintSolid} /> {/* loading Blood Type */}
            </>
            :
            <>
              <UsedEventPatientInfo TitleInfo="Data de nascimento" Icon={HiOutlineCalendarDays} DataInfo={formatDate(patientData.dateBirth ? patientData.dateBirth : "-")} Label={''} /> {/* dateBirth */}
              <UsedEventPatientInfo TitleInfo="Tipo Sanguíneo" Icon={LiaTintSolid} DataInfo={patientData.bloodType ? sortsDatas.bloodTypeFilter[patientData.bloodType - 1].name : "-"} Label={''} /> {/* Blood Type */}
            </>
          }
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {loading ?
            <>
              <EventDetailShimmerLoading TitleInfo="Convênio" Label={''} Icon={HiOutlineHomeModern} /> {/* loading insurance */}
              <EventDetailShimmerLoading TitleInfo="Nº Cartão (Convênio)" Label={''} Icon={HiOutlineCreditCard} /> {/* loading cardNumber insurance */}
            </>
            :
            <>
              <UsedEventPatientInfo TitleInfo="Convênio" Icon={HiOutlineHomeModern} DataInfo={patientData.insurance ? insuranceDatas.insurance[patientData.insurance - 1].name : "-"} Label={''} /> {/* insurance */}
              <UsedEventPatientInfo TitleInfo="Nº Cartão (Convênio)" Icon={HiOutlineCreditCard} DataInfo={patientData.cardNumber ? patientData.cardNumber : "-"} Label={''} />  {/* cardNumber insurance */}
            </>
          }
        </div>
      </div>

      {user.roleId !== 3 &&
        <>
          {/* divider */}
          <EventDetailsPatientDivider Label="agenda" />
          {/* table */}
          <TabGroup
            selectedIndex={selectedIndex} onChange={setSelectedIndex}
          >
            <TabList className="flex flex-col w-full justify-end md:flex-row md:w-full items-center gap-4 py-3">
              <div className='flex flex-col w-full justify-start md:flex-row md:w-full items-center'>
                <h1 className='flex flex-col font-semibold text-2xl text-black text-center md:text-left w-full text-wrap'>{selectedIndex ? "Próximos agendamentos" : "Histórico"}</h1>
              </div>
              <div className='flex flex-col sm:flex-row gap-1 md:gap-2'>
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx("flex w-full justify-center items-center gap-1 px-4 py-1 md:gap-2 md:px-6 md:py-2 border border-subMain text-subMain bg-gray-100 hover:opacity-80 rounded-md text-nowrap transitions", hover && "", selected && "bg-subMain text-white")}
                    >
                      <p className="font-normal text-center">Histórico</p>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx("flex w-full justify-center items-center gap-1 px-4 py-1 md:gap-2 md:px-6 md:py-2 border border-subMain text-subMain bg-gray-100 hover:opacity-80 rounded-md text-nowrap transitions", hover && "", selected && "bg-subMain text-white")}
                    >
                      <HiMiniCalendarDays className="text-xl" />
                      <p className="font-normal text-center">Proximos agendamentos</p>
                    </button>
                  )}
                </Tab>
              </div>
            </TabList>
            {loading ?
              <>
                <EventHistoryShimmer />
                <EventHistoryShimmer />
                <EventHistoryShimmer />
              </>
              :
              <>
                <TabPanels>
                  <TabPanel className={`flex flex-col w-full justify-center items-center space-y-2`}>
                    {patientHistory.length > 0 ? patientHistory.map((item, index) => (
                      <div key={index} className="flex w-full justify-center items-center bg-greyed hover:bg-gray-200 rounded-lg p-4 group transitions" >
                        <div className="w-full flex justify-center items-center">
                          <div className="flex flex-col sm:flex-col justify-center items-center ">
                            <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>{(index + 1)}</p>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                            <div className="flex text-center flex-col justify-start items-center sm:items-start">
                              <p className='flex text-sm text-black'>
                                {item.specialtyName}
                              </p>
                              <p className='flex text-xs text-gray-500'>{item.professionalFirstName} {item.professionalLastName}</p>
                            </div>
                            {/* Tipo de evento */}
                            <div className="flex text-center flex-col justify-center items-center sm:items-start">
                              <p className='flex text-sm text-gray-500'>{item.eventType <= 3 ? item.serviceName : item.eventType === 4 ? 'Consulta' : 'Retorno'}</p>
                            </div>
                            {/* Data */}
                            <div className="flex text-center flex-col justify-center items-center sm:items-start">
                              <p className='flex text-sm text-gray-500'>{formatDate(item.startTime)}</p>
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
                      <div>
                        <p className="mt-8 text-black">Nenhum agendamento encontrado</p>
                      </div>
                    }
                  </TabPanel>
                  <TabPanel className={`flex flex-col w-full justify-center items-center space-y-2`}>
                    {patientNextEvents.length > 0 ? patientNextEvents.map((item, index) => (
                      <div key={index} className="flex w-full justify-center items-center bg-greyed hover:bg-gray-200 rounded-lg p-4 group transitions" >
                        <div className="w-full flex justify-center items-center">
                          <div className="flex flex-col sm:flex-col justify-center items-center ">
                            <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>{(index + 1)}</p>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                            <div className="flex text-center flex-col justify-start items-center sm:items-start">
                              <p className='flex text-sm text-black'>
                                {item.specialtyName}
                              </p>
                              <p className='flex text-xs text-gray-500'>{item.professionalFirstName} {item.professionalLastName}</p>
                            </div>
                            {/* Tipo de evento */}
                            <div className="flex text-center flex-col justify-center items-center sm:items-start">
                              <p className='flex text-sm text-gray-500'>{item.eventType <= 3 ? item.serviceName : item.eventType === 4 ? 'Consulta' : 'Retorno'}</p>
                            </div>
                            {/* Data */}
                            <div className="flex text-center flex-col justify-center items-center sm:items-start">
                              <p className='flex text-sm text-gray-500'>{formatDate(item.startTime)}</p>
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
                      <div>
                        <p className="mt-8 text-black">Nenhum agendamento encontrado</p>
                      </div>
                    }
                  </TabPanel>
                </TabPanels>
              </>
            }
          </TabGroup>
        </>
      }

    </>
  );
}

export default EventDetailsPatientInfo;