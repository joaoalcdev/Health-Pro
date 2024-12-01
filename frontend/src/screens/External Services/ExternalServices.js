/* eslint-disable react-hooks/exhaustive-deps */

// dependencies - import
import { useState, useEffect } from 'react';

import Drawer from 'react-modern-drawer';

// components - import 
import Layout from '../../Layout';
import ExternalServicesSummary from './ExternalServicesSummary';
import Companies from './Companies';

import { externalServicesTabs } from '../../components/Datas';
import CompaniesForm from '../../components/Forms/CompaniesForm';
import ExternalServiceForm from '../../components/Forms/ExternalServiceForm';

// utils - import
import { getCompanies, getExternalServices, removeExternalService, exportExternalServices } from '../../api/ExternalServicesAPI';
import toast from 'react-hot-toast';
import { MonthlyPicker } from '../../components/Form';
import { moneyFormat2BR } from '../../utils/moneyFormatBR';

function ExternalServices() {
  const today = new Date();

  const [activeTab, setActiveTab] = useState(1);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState({});

  const [monthRange, setMonthRange] = useState(new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0));


  const [companies, setCompanies] = useState([]);
  const [externalServices, setExternalServices] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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
    const res = await getExternalServices(`01-${monthRange.getMonth() + 1}-${monthRange.getFullYear()}`);
    if (res.status !== 200) {
      setLoading(false);
      setDrawerData({});
      return;
    }
    if (res.status === 200) {
      setExternalServices(res.data.externalServices);
      setTotalValue(res.data.totalValue);
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

  const handleRemove = async (id) => {
    setLoading(true);
    const res = await removeExternalService(id);
    if (res.status === 200) {
      fetchExternalServices();
      toast.success('Serviço Externo removido com sucesso');
      return;
    }
    if (res.status !== 200) {
      setLoading(false);
      toast.error('Erro ao remover Serviço Externo');
      return;
    }
  }
  const handleExport = async () => {
    const res = await exportExternalServices(`01-${monthRange.getMonth() + 1}-${monthRange.getFullYear()}`);
    if (res.status === 200) {
      toast.success('Relatórios exportado com sucesso');
      return;
    }
  }


  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <ExternalServicesSummary data={externalServices} companies={companies} setIsDrawerOpen={onClose} remove={handleRemove} handleExport={handleExport} />;
      case 2:
        return <Companies companies={companies} setIsDrawerOpen={onClose} setDrawerData={setDrawerData} status={() => setStatus(!status)} setIsEdit={setIsEdit} />;
      default:
        return;
    }
  };

  const refreshData = () => {
    fetchCompanies();
    fetchExternalServices();
  }

  useEffect(() => {
    fetchExternalServices();
  }, [monthRange]);

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
              {activeTab === 1 ? <ExternalServiceForm onClose={onClose} status={refreshData} companies={companies} /> :

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

            <div className='w-full cursor-pointer'>
              {/* date */}
              <MonthlyPicker
                value={monthRange}
                startDate={monthRange}
                endDate={monthRange}
                bg="bg-dry"
                onChange={(update) => setMonthRange(update)}
              />
            </div>
            <div className=' bg-text w-full rounded p-2 justify-items-center'>
              <p className="text-lg text-main font-semibold">{moneyFormat2BR(totalValue)}</p>
              <p className="text-sm text-gray-500 font-light">Valor total</p>
            </div>
            {/* tabs */}
            <div className="flex-colo gap-3  w-full">
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
