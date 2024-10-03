import React, { useState, useEffect } from 'react';

// components - import
import { Link, useParams, useNavigate } from 'react-router-dom';


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
import { HiOutlinePhone, HiOutlineCalendarDays, HiOutlineIdentification, HiOutlineMapPin, HiOutlineCheckCircle, HiMiniPencilSquare, HiArrowLeft, HiOutlineHome, HiMiniFingerPrint, HiOutlineCreditCard, HiOutlineHomeModern } from 'react-icons/hi2';


function EventDetailsPatientInfo({ data, onStatus }) {
  const nav = useNavigate();

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
              {/* <Link to={handleViewPatientsDetails} className="flex items-center gap-2 px-6 py-2 border border-subMain hover:border-main rounded-md text-subMain hover:text-main transitions"> */}
              <HiMiniPencilSquare className="text-xl" />
              <p className="font-normal">Ver detalhes</p>
              {/* </Link> */}
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
      {/* table */}
      
      {/* table */}
    </>
  );
}

export default EventDetailsPatientInfo;