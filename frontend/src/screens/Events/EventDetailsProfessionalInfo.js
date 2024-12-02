/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../../hooks/Auth';

// components - import
import { useNavigate } from 'react-router-dom';
import { UsedEventProfessionalInfo } from './UsedEventProfessionalInfo';
import { EventDetailShimmerLoading } from '../../components/Loadings/EventDetailShimmerLoading';


// datas - import
import { brStateDatas, councilDatas, specialties } from '../../components/Datas';

// api - import
import { getProfessionalById } from '../../api/ProfessionalsAPI';
import { getSpecialties } from '../../api/specialtiesAPI';


// icons - import
import { HiOutlineIdentification, HiMiniPencilSquare } from 'react-icons/hi2';

function EventDetailsProfessionalInfo({ data, onStatus }) {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [professionalData, setProfessionalData] = useState({});

  const fetch = async () => {
    setLoading(true)

    if (data) {
      const response = await getProfessionalById(data.professionalId)
      const specialtiesData = await getSpecialties()
      if (response.status === 400) {
        setLoading(false)
        return
      }
      if (response.status === 200) {
        setLoading(false)
        setSpecialties(specialtiesData)
        setProfessionalData(response.data)
      }
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleViewProfessionalDetails = () => {
    navigate(`/professionals/preview/${data.professionalId}`);
  }


  return (professionalData && specialties &&
    <>
      <div className="flex-colo gap-6">
        <div className="flex justify-end w-full">
          <div className="w-full md:col-span-1 flex sm:justify-between items-center">
            <div className="flex">
              <h1 className='flex flex-col font-semibold text-2xl text-black text-center md:text-left w-full text-wrap'>Dados do profissional</h1>
            </div>
            <div className={`${user.roleId === 1 ? 'block' : 'hidden'}`} >
              <button
                className="flex items-center gap-2 px-6 py-2 border border-subMain hover:border-main rounded-md text-subMain hover:text-main transitions"
                onClick={handleViewProfessionalDetails}
              >
                <HiMiniPencilSquare className="text-xl" />
                <p className="font-normal">Ver detalhes</p>
              </button>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {loading ?
            <>
              <EventDetailShimmerLoading TitleInfo="Profissional" Label={''} Icon={HiOutlineIdentification} /> {/* loading Full Name */}
              <EventDetailShimmerLoading TitleInfo="RG" Label={''} Icon={HiOutlineIdentification} /> {/* loading RG */}
            </>
            :
            <>
              <UsedEventProfessionalInfo TitleInfo="Profissional" Icon={HiOutlineIdentification} DataInfo={professionalData.fullName} Label={''} /> {/* Full Name */}
              <UsedEventProfessionalInfo TitleInfo="RG | Órgão Expedidor" Icon={HiOutlineIdentification} DataInfo={(professionalData.rg) + ' | ' + ((professionalData.rgInssuance))} Label={''} /> {/* RG */}
            </>
          }
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {loading ?
            <>
              <EventDetailShimmerLoading TitleInfo="Conselho" Label={''} Icon={HiOutlineIdentification} /> {/* loading Council */}
              <EventDetailShimmerLoading TitleInfo="Especialidade" Label={''} Icon={HiOutlineIdentification} /> {/* loading Specialty */}
            </>
            :
            <>
              <UsedEventProfessionalInfo TitleInfo="Conselho | Nº Conselho" Icon={HiOutlineIdentification}
                DataInfo={
                  (professionalData.council ? councilDatas.council[professionalData.council - 1].name : "Não informado") + '-' +
                  (professionalData.councilInssuance ? brStateDatas.states[professionalData.councilInssuance - 1].UF : "Não informado") + ' | ' +
                  (professionalData.councilNumber ? professionalData.councilNumber : "Não informado")
                }
                Label={''}
              /> {/* Council */}
              {specialties.find((specialty) => {
                if (specialty.id === data.specialtyId) {
                  return specialty
                }
              }) ?
                <UsedEventProfessionalInfo TitleInfo="Especialidade" Icon={HiOutlineIdentification}
                  DataInfo={specialties.find((specialty) => {
                    if (specialty.id === data.specialtyId) {
                      return specialty
                    }
                  }).name}
                  Label={''}
                />
                :
                <UsedEventProfessionalInfo TitleInfo="Especialidade" Icon={HiOutlineIdentification}
                  DataInfo={"Não informado"}
                  Label={''}
                />
              }
            </>
          }
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">

        </div>
      </div >
    </>
  );
}

export default EventDetailsProfessionalInfo;