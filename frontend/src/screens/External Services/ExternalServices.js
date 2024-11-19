/* eslint-disable react-hooks/exhaustive-deps */

// dependencies - import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from 'react-modern-drawer';

// components - import 
import Layout from '../../Layout';
import ExternalServicesSummary from './ExternalServicesSummary';
import Companies from './Companies';

import { externalServicesTabs } from '../../components/Datas';
import CompaniesForm from '../../components/Forms/CompaniesForm';
import ExternalServiceForm from '../../components/Forms/ExternalServiceForm';

// utils - import
import { getCompanies, getExternalServices } from '../../api/ExternalServicesAPI';

function ExternalServices() {
  const [activeTab, setActiveTab] = useState(1);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState({});

  const [companies, setCompanies] = useState([]);
  const [externalServices, setExternalServices] = useState([]);

  const fetchCompanies = async () => {
    setLoading(true);
    const res = await getCompanies();
    if (res.status !== 200) {
      setLoading(false);
      setDrawerData({});
      return;
    }
    if (res.status === 200) {
      setCompanies(res.data);
      setLoading(false);
      setDrawerData({});
    }
  }

  const fetchExternalServices = async () => {
    setLoading(true);
    const res = await getExternalServices();
    if (res.status !== 200) {
      setLoading(false);
      setDrawerData({});
      return;
    }
    if (res.status === 200) {
      setExternalServices(res.data);
      setLoading(false);
      setDrawerData({});
    }
  }

  useEffect(() => {
    fetchExternalServices();
    fetchCompanies();
  }, []);

  const onClose = () => {
    if (isDrawerOpen) {
      setDrawerData({});
      setIsEdit(false);
    }
    setIsDrawerOpen(!isDrawerOpen);
  }

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <ExternalServicesSummary data={externalServices} companies={companies} setIsDrawerOpen={onClose} />;
      case 2:
        return <Companies companies={companies} setIsDrawerOpen={onClose} setDrawerData={setDrawerData} status={() => setStatus(!status)} setIsEdit={setIsEdit} />;
      default:
        return;
    }
  };

  const refreshData = () => {
    fetchCompanies();
  }


  return (
    loading ?
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main"></div>
      </div >
      :
      <Layout>
        {
          isDrawerOpen && (
            <Drawer
              open={isDrawerOpen}
              onClose={onClose}
              direction="right"
              className="bg-white"
              zIndex={40}
              size={480}
              enableOverlay={true}
            >
              {activeTab === 1 ? <ExternalServiceForm onClose={onClose} data={drawerData} status={refreshData} isEdit={isEdit} companies={companies} /> :

                isEdit ?
                  <CompaniesForm onClose={onClose} data={drawerData} status={refreshData} isEdit={isEdit} />
                  :
                  <CompaniesForm onClose={onClose} status={refreshData} />}
            </Drawer>
          )
        }
        <div className=" grid grid-cols-12 gap-6 my-8 items-start">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 flex-colo gap-6 lg:col-span-3 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
          >

            {/* <div className="gap-2 flex-colo">
              <h2 className="text-sm font-semibold">{patientData.fullName}</h2>
              <p className="text-xs">
              {formatPhoneNumber(patientData.phoneNumber)} <br />
              {formatPhoneNumber(patientData.emergencyContact)}
              </p>
              </div> */}
            {/* tabs */}
            <div className="flex-colo gap-3 px-2  w-full">
              {externalServicesTabs.map((tab, index) => (
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
            className="col-span-12 lg:col-span-9 bg-white rounded-xl border-[1px] border-border p-6"
          >
            {tabPanel()}
          </div>
        </div>
      </Layout >
  )

}
export default ExternalServices;
