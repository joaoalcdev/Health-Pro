/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';

// components - import
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


// datas - import
import { sortsDatas, bloodTypeFilter } from '../../components/Datas';
import { brStateDatas, genderDatas, maritalDatas, insuranceDatas } from '../../components/Datas';

// api - import
import { getPatient } from '../../api/PatientsAPI';

// icons - import
import { BiChevronDown } from 'react-icons/bi';
import { TbUserHeart } from "react-icons/tb";
import { LiaGenderlessSolid } from "react-icons/lia";
import { LiaTintSolid } from "react-icons/lia";
import { HiEllipsisVertical, HiMiniCalendarDays } from "react-icons/hi2";

import { HiOutlinePhone, HiOutlineCalendarDays, HiOutlineIdentification, HiOutlineMapPin, HiOutlineCheckCircle, HiMiniPencilSquare, HiArrowLeft, HiOutlineHome, HiMiniFingerPrint, HiOutlineCreditCard, HiOutlineHomeModern } from 'react-icons/hi2';


function EventDetailsPatientInfo({ data, onStatus }) {
  const nav = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [gender, setGender] = useState(genderDatas.gender[data.patientGender - 1]);
  const { id } = useParams();

  const [patientData, setPatientData] = useState([]);

  const fetch = async () => {
    const response = await getPatient(id)
    setPatientData(response.data[0])
    // setStatus(false)
  }

  useEffect(() => {
    fetch()
    console.log("Effect")
  }, [])

  const handleViewPatientsDetails = () => {
    nav(`/patients/preview/${data.patientId}`);
  }
  const thclass = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

  return (
    <>
      <div className="flex-colo gap-6">
        <div className="flex justify-end w-full">
          <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
            <button
              className="flex items-center gap-2 px-6 py-2 border border-subMain hover:border-main rounded-md text-subMain hover:text-main transitionss"
              onClick={handleViewPatientsDetails}
            >
              <HiMiniPencilSquare className="text-xl" />
              <p className="font-normal">Ver detalhes</p>
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {/* Full Name */}
          <div className=''>
            <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Nome Completo<span className='text-required'></span></p>
            <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
              <p className='flex text-2xl font-light pr-1'>
                <HiOutlineIdentification />
              </p>
              <p className='flex text-sm font-medium'>
                {data.patientFullName}
              </p>
            </div>
          </div>
          {/* Gender */}
          <div className=''>
            <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Gênero<span className='text-required'></span></p>
            <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
              <p className='flex text-2xl font-light pr-1'>
                <LiaGenderlessSolid />
              </p>
              <p className='flex text-sm font-medium'>
                {data.patientGender ? genderDatas.gender[data.patientGender - 1].name : "Não informado"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {/* dateBirth */}
          <div className=''>
            <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Data de Nascimento<span className='text-required'></span></p>
            <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
              <p className='flex text-2xl font-light pr-1'>
                <HiOutlineCalendarDays />
                {/* <HiCake /> */}
              </p>
              <p className='flex text-sm font-medium'>
                {data.dateBirth ? data.dateBirth : "-"}
              </p>
            </div>
          </div>
          {/* Blood Type */}
          <div className=''>
            <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Tipo Sanguíneo<span className='text-required'></span></p>
            <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
              <p className='flex text-2xl font-light pr-1'>
                <LiaTintSolid />
              </p>
              <p className='flex text-sm font-medium'>
                Lorem ipsum
              </p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {/* insurance */}
          <div className=''>
            <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Convênio<span className='text-required'></span></p>
            <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
              <p className='flex text-2xl font-light pr-1'>
                <HiOutlineHomeModern />
              </p>
              <p className='flex text-sm font-medium'>
                {data.insurance ? insuranceDatas.insurance[data.insurance - 1].name : "-"}
              </p>
            </div>
          </div>
          {/* cardNumber insurance */}
          <div className=''>
            <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>Nº Cartão (Convênio)<span className='text-required'></span></p>
            <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
              <p className='flex text-2xl font-light pr-1'>
                <HiOutlineCreditCard />
              </p>
              <p className='flex text-sm font-medium'>
                {data.cardNumber ? data.cardNumber : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* divider */}
      <div class="flex w-full items-center rounded-full">
        <div class="flex-1 border-b border-gray-300"></div>
        <span class="text-gray-500 text-md font-medium leading-8 px-8 py-6">agenda</span>
        <div class="flex-1 border-b border-gray-300"></div>
      </div>
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
        <TabPanels>
          {data.lenght > 0 && data.map((item, index) => (
            <TabPanel className={`flex flex-col w-full justify-center items-center space-y-2`}>
              {/* <div className="flex flex-col w-full justify-center items-center space-y-2"> */}
              <div key={item} className="flex w-full justify-center items-center bg-gray-200 hover:bg-gray-100 hover:translate-y-[-0.5rem] rounded-lg p-4 group transitions">
                <div className="w-full flex justify-center items-center">
                  {/* N */}
                  <span className="flex flex-col justify-center items-center ">
                    <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>{(index + 1)}</p>
                  </span>
                  {/* Paciente / Nome */}
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                    {/* <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      <p className='flex text-sm text-black'>Paciente</p>
                      <p className='flex text-xs text-gray-500'>João Alcântara</p>
                    </div> */}
                    {/* Serviço / Profissional */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      <p className='flex text-sm text-black'>Serviço</p>
                      <p className='flex text-xs text-gray-500'>Profissional</p>
                    </div>
                    {/* Tipo de evento */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      {/* <p className='flex text-sm text-black'>Tipo de evento</p> */}
                      <p className='flex text-sm text-gray-500'>Evento x</p>
                    </div>
                    {/* Data */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      {/* <p className='flex text-sm text-black'>Data</p> */}
                      <p className='flex text-sm text-gray-500'>__/__/____</p>
                    </div>
                    {/* Config */}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button className="flex size-9 justify-center items-center rounded-lg">
                      <h3><HiEllipsisVertical className="text-2xl text-black" /></h3>
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </TabPanel>
          ))}
          <TabPanel>
            <div className="flex flex-col w-full justify-center items-center space-y-2">
              <div className="flex w-full justify-center items-center bg-gray-200 rounded-lg p-4 group">
                <div className="w-full flex justify-center items-center">
                  {/* N */}
                  <span className="flex flex-col justify-center items-center ">
                    <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>01</p>
                  </span>
                  {/* Paciente / Nome */}
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                    {/* <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      <p className='flex text-sm text-black'>Paciente</p>
                      <p className='flex text-xs text-gray-500'>João Alcântara</p>
                    </div> */}
                    {/* Serviço / Profissional */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start order-first">
                      <p className='flex text-sm text-black'>Serviço</p>
                      <p className='flex text-xs text-gray-500'>Profissional</p>
                    </div>
                    {/* Tipo de evento */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start order-last sm:order-3">
                      {/* <p className='flex text-sm text-black'>Tipo de evento</p> */}
                      <p className='flex text-sm text-gray-500'>Evento x</p>
                    </div>
                    {/* Data */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start order-2 sm:order-2">
                      {/* <p className='flex text-sm text-black'>Data</p> */}
                      <p className='flex text-sm text-gray-500'>__/__/____</p>
                    </div>
                    {/* Config */}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button className="flex size-9 justify-center items-center rounded-lg">
                      <h3><HiEllipsisVertical className="text-2xl text-black" /></h3>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center items-center bg-gray-200 rounded-lg p-4 group">
                <div className="w-full flex justify-center items-center">
                  {/* N */}
                  <span className="flex flex-col justify-center items-center ">
                    <p className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-white rounded-lg'>01</p>
                  </span>
                  {/* Paciente / Nome */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full justify-items-center">
                    {/* <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      <p className='flex text-sm text-black'>Paciente</p>
                      <p className='flex text-xs text-gray-500'>João Alcântara</p>
                    </div> */}
                    {/* Serviço / Profissional */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      <p className='flex text-sm text-black'>Serviço</p>
                      <p className='flex text-xs text-gray-500'>Profissional</p>
                    </div>
                    {/* Tipo de evento */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      {/* <p className='flex text-sm text-black'>Tipo de evento</p> */}
                      <p className='flex text-sm text-gray-500'>Evento x</p>
                    </div>
                    {/* Data */}
                    <div className="flex text-center flex-col justify-center items-center sm:items-start">
                      {/* <p className='flex text-sm text-black'>Data</p> */}
                      <p className='flex text-sm text-gray-500'>__/__/____</p>
                    </div>
                    {/* Config */}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button className="flex size-9 justify-center items-center rounded-lg">
                      <h3><HiEllipsisVertical className="text-2xl text-black" /></h3>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default EventDetailsPatientInfo;