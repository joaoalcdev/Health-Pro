/* eslint-disable react-hooks/exhaustive-deps */

// dependencies - import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components - import 
import Layout from '../../Layout';
import PatientRecord from './PatientRecord';
import { Link, useParams } from 'react-router-dom';
import PatientInfo from '../../components/UsedComp/PatientInfo';

// datas - import
import { patientTab } from '../../components/Datas';

// api - import
import { getPatient } from '../../api/PatientsAPI';

// icons - import
import { IoArrowBackOutline } from 'react-icons/io5';

// utils - import
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import toast from 'react-hot-toast';

function PatientProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const [patientData, setPatientData] = useState([]);

  const fetch = async () => {
    setLoading(true);
    const response = await getPatient(id)
    if (response.status === 400) {
      toast.error('Paciente não encontrado')
      navigate('/patients')
      setLoading(false)
      return
    }
    if (response.status === 200) {
      setPatientData(response.data)
      setStatus(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <PatientInfo titles={false} data={patientData} status={setStatus} />;
      case 2:
        return <PatientRecord data={patientData} />;
      default:
        return;
    }
  };

  // if patientData.gender === masculino return img 
  // else return img

  const genderImageMale = '/images/male.jpg';
  const genderImageFemale = '/images/female.jpg';
  const genderImageOther = '/images/other.jpg';

  function dynamicImageGender() {
    if (patientData.gender === 1) {
      return genderImageMale;
    }
    if (patientData.gender === 2) {
      return genderImageFemale;
    }
    else {
      return genderImageOther;
    }
  }

  return (
    loading ?
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main"></div>
      </div >
      :

      <Layout>
        <div className="flex items-center gap-4">
          <Link
            to="/patients"
            className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
          >
            <IoArrowBackOutline />
          </Link >
          <h1 className="text-xl font-semibold">{patientData.fullName}</h1>
        </div >
        <div className=" grid grid-cols-12 gap-6 my-8 items-start">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
          >
            <img
              src={dynamicImageGender()}
              alt="setting"
              className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
            />
            <div className="gap-2 flex-colo">
              <h2 className="text-sm font-semibold">{patientData.fullName}</h2>
              <p className="text-xs">
                {formatPhoneNumber(patientData.phoneNumber)} <br />
                {formatPhoneNumber(patientData.emergencyContact)}
              </p>
            </div>
            {/* tabs */}
            <div className="flex-colo gap-3 px-2  w-full">
              {patientTab.map((tab, index) => (
                <button
                  onClick={() => setActiveTab(tab.id)}
                  key={index}
                  className={`
                    ${activeTab === tab.id
                      ? 'bg-text text-subMain'
                      : 'bg-dry text-main hover:bg-text hover:text-subMain'
                    }
                    text-xs gap-4 flex items-center w-full p-4 rounded`}
                >
                  <tab.icon className="text-lg" /> {tab.title}
                </button>
              ))}
            </div>
          </div>
          {/* tab panel */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
          >
            {patientData && tabPanel()}
          </div>
        </div>
      </Layout>
  )

}
export default PatientProfile;
