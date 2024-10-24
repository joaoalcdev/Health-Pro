/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';

// components - import
import { useNavigate } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import EventHistoryShimmer from '../../components/Loadings/EventHistoryShimmer';
import { UsedEventPatientInfo } from './UsedEventPatientInfo';
import { EventDetailsPatientDivider } from '../../components/Dividers/EventDetailsPatientDivider';
import { EventDetailPatientShimmer } from '../../components/Loadings/EventDetailPatientShimmer';

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
import { HiEllipsisVertical, HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineCalendarDays, HiOutlineIdentification, HiMiniPencilSquare, HiArrowLeft, HiOutlineHome, HiMiniFingerPrint, HiOutlineCreditCard, HiOutlineHomeModern } from 'react-icons/hi2';


function EventDetailsPatientInfo({ data, onStatus }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [patientHistory, setPatientHistory] = useState([]);

  const [patientData, setPatientData] = useState([]);

  const [specialties, setSpecialties] = useState([]);

  const fetch = async () => {
    setLoading(true)
    if (data) {
      const response = await getPatient(data.patientId)
      const specialtiesData = await getSpecialties()
      setLoading(false)
      console.log(response.data[0])
      if (response.lenght === 0) {
        setLoading(false)
        return
      }
      setLoading(false)
      setSpecialties(specialtiesData)
      console.log(specialtiesData)
      setPatientData(response.data[0])
      setPatientHistory(response.data[0].history)
    }
  }

  useEffect(() => {
    console.log("Effect", data)
    fetch()
  }, [])

  const handleViewPatientsDetails = () => {
    nav(`/patients/preview/${data.patientId}`);
  }

  return (
    <>
      <div className="flex-colo gap-6">
        <div className="flex justify-end w-full">
          <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
            <button
              className="flex items-center gap-2 px-6 py-2 border border-subMain hover:border-main rounded-md text-subMain hover:text-main transitions"
              onClick={handleViewPatientsDetails}
            >
              <HiMiniPencilSquare className="text-xl" />
              <p className="font-normal">Ver detalhes</p>
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {loading ?
            <>
              <EventDetailPatientShimmer TitleInfo="Paciente" Label={''} Icon={HiOutlineIdentification} /> {/* loading Full Name */}
              <EventDetailPatientShimmer TitleInfo="Gênero" Label={''} Icon={LiaGenderlessSolid} /> {/* loading Gender */}
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
              <EventDetailPatientShimmer TitleInfo="CPF" Label={''} Icon={HiOutlineCalendarDays} /> {/* loading CPF */}
              <EventDetailPatientShimmer TitleInfo="Tipo Sanguíneo" Label={''} Icon={LiaTintSolid} /> {/* loading Blood Type */}
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
              <EventDetailPatientShimmer TitleInfo="Convênio" Label={''} Icon={HiOutlineHomeModern} /> {/* loading insurance */}
              <EventDetailPatientShimmer TitleInfo="Nº Cartão (Convênio)" Label={''} Icon={HiOutlineCreditCard} /> {/* loading cardNumber insurance */}
            </>
            :
            <>
              <UsedEventPatientInfo TitleInfo="Convênio" Icon={HiOutlineHomeModern} DataInfo={patientData.insurance ? insuranceDatas.insurance[patientData.insurance - 1].name : "-"} Label={''} /> {/* insurance */}
              <UsedEventPatientInfo TitleInfo="Nº Cartão (Convênio)" Icon={HiOutlineCreditCard} DataInfo={patientData.cardNumber ? patientData.cardNumber : "-"} Label={''} />  {/* cardNumber insurance */}
            </>
          }
        </div>
      </div>
      {/* divider */}
      <EventDetailsPatientDivider Label="agenda" />
      {/* table */}
      <TabGroup
        selectedIndex={selectedIndex} onChange={setSelectedIndex}
      >
        <TabList className="flex flex-col w-full justify-end md:flex-row md:w-full items-center gap-4 py-3">
          <div className='flex flex-col w-full justify-start md:flex-row md:w-full items-center'>
            <h1 className='flex flex-col font-semibold text-2xl text-black text-center md:text-left w-full text-wrap'>{selectedIndex ? "Agendamentos futuros" : "Histórico de Agendamentos"}</h1>
          </div>
          <div className='flex flex-col sm:flex-row gap-1 md:gap-2'>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={clsx("flex w-full justify-center items-center gap-1 px-4 py-1 md:gap-2 md:px-6 md:py-2 border border-subMain text-subMain bg-gray-100 hover:border-main hover:text-main hover:bg-white rounded-md text-nowrap transitions", hover && "", selected && "bg-subMain text-white")}
                >
                  <HiMiniPencilSquare className="text-xl" />
                  <p className="font-normal text-center">Histórico</p>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={clsx("flex w-full justify-center items-center gap-1 px-4 py-1 md:gap-2 md:px-6 md:py-2 border border-subMain text-subMain bg-gray-100 hover:border-main hover:text-main hover:bg-white rounded-md text-nowrap transitions", hover && "", selected && "bg-subMain text-white")}
                >
                  <HiMiniCalendarDays className="text-xl" />
                  <p className="font-normal text-center">Proximas consultas</p>
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
                {patientHistory.length > 0 && patientHistory.map((item, index) => (
                  <div key={index} className="flex w-full justify-center items-center bg-greyed hover:bg-gray-200 rounded-lg p-4 group transitions" >
                    <div className="w-full flex justify-center items-center">
                      <div className="flex flex-col sm:flex-col justify-center items-center ">
                        <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>{(index + 1)}</p>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                        <div className="flex text-center flex-col justify-start items-center sm:items-start">
                          <p className='flex text-sm text-black'>
                            {specialties.find((specialty) => {
                              if (specialty.id === item.specialtyId) {
                                return specialty
                              }
                            }).name}</p>
                          <p className='flex text-xs text-gray-500'>{item.professionalFirstName} {item.professionalLastName}</p>
                        </div>
                        {/* Tipo de evento */}
                        <div className="flex text-center flex-col justify-center items-center sm:items-start">
                          <p className='flex text-sm text-gray-500'>{item.serviceName}</p>
                        </div>
                        {/* Data */}
                        <div className="flex text-center flex-col justify-center items-center sm:items-start">
                          <p className='flex text-sm text-gray-500'>{formatDate(item.startTime)}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <button className="flex size-9 justify-center items-center rounded-lg">
                          <h3><HiEllipsisVertical className="text-2xl text-black" /></h3>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabPanel>
              <TabPanel className={`flex flex-col w-full justify-center items-center space-y-2`}>
                <div className="flex">
                  <p className="text-black">Proximas consultas</p>
                </div>
              </TabPanel>
            </TabPanels>
          </>
        }
      </TabGroup>
      <>
      </>
    </>
  );
}

export default EventDetailsPatientInfo;