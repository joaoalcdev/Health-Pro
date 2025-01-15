import { useState, useEffect } from 'react';
import { BiLoaderCircle, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { getSpecialties } from '../api/specialtiesAPI';
import { getAgreements } from '../api/AgreementsAPI';
import { SpecialtyDisclosure, ServiceDisclosure, ServiceDisclosureSubTitle, ServiceDisclosureChildren } from '../components/Disclosures';
import Drawer from 'react-modern-drawer';
import SpecialtyForm from '../components/Forms/SpecialtyForm';
import ServiceForm from '../components/Forms/ServiceForm';
import { Button } from '../components/Form';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineAdd } from 'react-icons/md';

function Specialties() {
  //datas
  const [allData, setAllData] = useState([])
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState({});
  const [agreements, setAgreements] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [specialtyId, setSpecialtyId] = useState();

  //controllers
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState(true);
  const [noData, setNoData] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [enableServiceDrawer, setEnableServiceDrawer] = useState(false);

  //search controllers
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    setLoading(true);
    const response = await getSpecialties()
    await getAgreements().then((res) => {
      setAgreements(res)
    })
    if (response.length === 0) {
      setNoData(true);
      setNoResult(true);
      setLoading(false);
      return
    }
    setDatas(response)
    setSpecialties(response)
    setAllData(response)
    setLoading(false)
    setNoResult(false)
    setStatus(false)
  }

  useEffect(() => {
    fetch()
  }, [status]);

  //search
  useEffect(() => {
    setDatas(allData.filter((item) => {
      //case 1 - no filter and no search
      if (searchTerm === "") {
        setNoResult(false)
        return item
      }
      //case 2 - no filter but has search
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        setNoResult(false)
        return item
      }
    })
    )
    if (datas.length === 0) {
      setNoResult(true)
    }
  }, [searchTerm])

  const onEdit = (datas) => {
    setIsEdit(true);
    setIsOpen(true);
    setData(datas);
  };

  const handleClose = () => {
    setIsEdit(false);
    setIsOpen(!isOpen);
    setData({});
    setEnableServiceDrawer(false);
  };

  const hideOtherDisclosuresHandle = (_id) => {

    const buttons = document.querySelectorAll('button[data-headlessui-state="open"]');
    buttons.forEach(button => {
      if (button?.id !== _id) {
        //@ts-ignore: Unreachable code error
        button?.click();
      }
    });
  };

  return (
    <Layout>
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={handleClose}
          direction='right'
          size={460}
          zIndex={40}
          enableOverlay={true}
        >
          {enableServiceDrawer ?
            <ServiceForm onClose={handleClose} datas={data} agreements={agreements} specialties={specialties} specialtyId={specialtyId} status={setStatus} isEdit={isEdit} />
            :
            <SpecialtyForm onClose={handleClose} datas={data} agreements={agreements} status={setStatus} isEdit={isEdit} />
          }
        </Drawer>
      )}
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-40 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Especialidades & Serviços</h1>
      {/* datas */}
      {loading ?
        <div className="flex absolute items-center justify-center w-full h-1/2">
          <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
        </div>
        :
        <>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="bg-white my-8 rounded-xl border-[1px] border-border p-5 "
          >

            <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
              <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
                <input
                  type="text"
                  placeholder='Pesquise por especialidade...'
                  onChange={(e) => { setSearchTerm(e.target.value) }}
                  className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
                />
              </div>

            </div>
            <div className="mt-8 mb-8 w-full ">
              {noResult ? (
                <div className="bg-greyed pt-8 pb-8 flex items-center justify-center h-auto">
                  <p className="text-sm text-main">Nenhuma especialidade encontrada</p>
                </div>
              ) : datas.length > 0 ? (
                <div className='flex flex-col gap-2'>
                  {datas.map((data, index) => (
                    <SpecialtyDisclosure
                      key={index}
                      keyIndex={index}
                      data={data}
                      subTitle={`${data.services.length > 0 ? data.services.length : ''} ${data.services.length > 1 ? 'serviços' : data.services.length === 1 ? 'serviço' : ''} `}
                      className=""
                      hideOtherDisclosuresHandle={hideOtherDisclosuresHandle}
                    >
                      <div className="flex w-full flex-col gap-4 relative">
                        <div className="flex flex-col gap-6 ">
                          <ServiceDisclosure
                            data={{ name: 'Consultas/Avaliações' }}
                            subTitle={<ServiceDisclosureSubTitle data={data.regularPrices} key={index} />}
                          >
                            <div className="w-full grid grid-cols-4 justify-items-start">
                              <div className='col-span-3'>
                                <ServiceDisclosureChildren data={data.regularPrices} key={index} />
                              </div>
                              <div className='flex justify-items-end w-[10rem] '>
                                <Button
                                  label={"Editar"}
                                  Icon={FiEdit}
                                  onClick={() => onEdit(data)}
                                />
                              </div>
                            </div>
                          </ServiceDisclosure>
                          <div className='flex flex-col gap-2'>
                            <h1 className="text-md text-main">Serviços Relacionados</h1>
                            {data.services.length > 0 ?
                              data.services?.map((service, index) => (
                                <ServiceDisclosure
                                  key={index}
                                  data={service}
                                  subTitle={<ServiceDisclosureSubTitle data={service.prices} key={index} />}
                                >
                                  <div className="w-full grid grid-cols-4 justify-items-start">
                                    <div className='col-span-3'>
                                      <ServiceDisclosureChildren data={service.prices} key={index} />
                                    </div>
                                    <div className='flex justify-items-end w-[10rem] '>
                                      <Button
                                        label={"Editar"}
                                        Icon={FiEdit}
                                        onClick={() => {
                                          setEnableServiceDrawer(true)
                                          setSpecialtyId(data.id)
                                          onEdit(service)
                                        }}
                                      />
                                    </div>
                                  </div>
                                </ServiceDisclosure>
                              ))
                              :
                              <div className='flex items-center justify-center h-20'>
                                <p className="text-sm text-main">Nenhum serviço cadastrado</p>
                              </div>
                            }

                          </div>
                          <div className='flex gap-2'>
                            <Button
                              label={"Editar Especialidade"}
                              Icon={FiEdit}
                              onClick={() => onEdit(data)}
                            />
                            <Button
                              label={"Adicionar Serviço"}
                              Icon={MdOutlineAdd}
                              onClick={() => {
                                setEnableServiceDrawer(true)
                                setSpecialtyId(data.id)
                                setIsOpen(true)
                              }}
                            />
                          </div>

                        </div>
                      </div>
                    </SpecialtyDisclosure>
                  ))}
                </div>
              ) : (
                <div className="bg-greyed pt-8 pb-8 flex items-center justify-center h-auto">
                  <p className="text-sm text-main">Nenhuma especialidade encontrada</p>
                </div>
              )}
            </div>
          </div>
        </>
      }
    </Layout>
  );
}

export default Specialties;
