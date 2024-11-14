import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Button, MonthlyPicker, Select } from '../../components/Form';
import { moneyFormat2BR } from '../../utils/moneyFormatBR';
import {
  MdFilterList,
  MdOutlineCloudDownload,
} from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PaymentsAgreementsDisclosure, PaymentsProfessionalsDisclosure, PaymentsProfessionalsDisclosureSubTitle, PaymentsAgreementsDisclosureSubTitle, PaymentsServicesDisclosure, PaymentsAgreementsDisclosureChildren } from '../../components/Disclosures';
import { getPayroll, exportPayroll } from '../../api/PaymentsAPI'
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { TbUserDollar } from 'react-icons/tb';
import Drawer from 'react-modern-drawer';
import DrawerContent from '../../components/DrawerContent';
import { IoIosArrowForward } from "react-icons/io";


function Payments() {
  const today = new Date();
  const navigate = useNavigate();

  //states
  const [monthRange, setMonthRange] = useState(new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //data
  const [payroll, setPayroll] = useState([]);
  const [filteredPayroll, setFilteredPayroll] = useState([]);
  const [summary, setSummary] = useState({});

  const fetchPayroll = async () => {
    setLoading(true);
    const response = await getPayroll(`01-${monthRange.getMonth() + 1}-${monthRange.getFullYear()}`);
    if (response.error || response.length === 0) {
      toast.error('Nenhum pagamento encontrado');
      return;
    }
    if (response) {
      setPayroll(response.professionals);
      setFilteredPayroll(response.professionals);
      setSummary(response.summary);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayroll();
    setOpenDrawer(false);
  }, [status]);

  useEffect(() => {
    setPayroll(filteredPayroll.filter((item) => {
      if (item.professionalName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item
      }
      else {
        return null
      }
    })
    )
  }, [searchTerm])

  // boxes
  const boxes = [
    {
      id: 1,
      title: 'Total de Receitas',
      value: summary.totalGrossValue ? moneyFormat2BR(summary.totalGrossValue) : '0,00',
      color: ['bg-subMain', 'text-subMain'],
      icon: GiTakeMyMoney,
    },
    {
      id: 2,
      title: 'Pagamentos',
      value: summary.totalAmountDue ? moneyFormat2BR(summary.totalAmountDue) : '0,00',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: TbUserDollar,
    },
    {
      id: 3,
      title: 'Impostos',
      value: summary.totalTax ? moneyFormat2BR(summary.totalTax) : '0,00',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: GiPayMoney,
    },
    {
      id: 4,
      title: 'Saldo da Clínica',
      value: summary.totalProfit ? moneyFormat2BR(summary.totalProfit) : '0,00',
      color: ['bg-green-500', 'text-green-500'],
      icon: GiReceiveMoney,
    },
  ];

  const hideOtherDisclosuresHandle = (_id) => {

    const buttons = document.querySelectorAll('button[data-headlessui-state="open"]');
    buttons.forEach(button => {
      if (button?.id !== _id) {
        //@ts-ignore: Unreachable code error
        button?.click();
      }
    });
  };

  const [drawerData, setDrawerData] = useState({});
  const [drawerAgreementName, setDrawerAgreementName] = useState('');
  const [drawerProfessionalName, setDrawerProfessionalName] = useState('');

  const handleClickService = (serviceData, agreementName, professionalName) => {
    setDrawerData(serviceData);
    setDrawerAgreementName(agreementName);
    setDrawerProfessionalName(professionalName);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setDrawerData({});
    setOpenDrawer(false);
  };

  const handleExport = async (data) => {
    setLoading(true);
    await exportPayroll(data, monthRange);
    setLoading(false);
  };
  return (
    <Layout>
      {openDrawer && (
        <>
          <Drawer
            open={openDrawer}
            onClose={handleCloseDrawer}
            direction='right'
            size={700}
            zIndex={40}
            enableOverlay={true}
          >
            <DrawerContent
              datas={drawerData}
              professionalName={drawerProfessionalName}
              agreementName={drawerAgreementName}
              onClose={handleCloseDrawer}
              onStatus={() => setStatus(!status)}
            />
          </Drawer>
        </>
      )}


      <h1 className="text-xl font-semibold">Pagamentos</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5 hover:-translate-y-2 hover:shadow-md transition-all duration-300 ease-in-out"
          >
            <div className="w-3/4  ">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">

              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-2xl ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </div>
        ))}
      </div>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder='Busque por Profissional'
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
          />

          {/* date */}
          <MonthlyPicker
            value={monthRange}
            startDate={monthRange}
            endDate={monthRange}
            bg="bg-dry"
            onChange={(update) => setMonthRange(update)}
          />
          {/* filter */}
          <div className='h-full'>
            <Button
              label="Filtrar"
              Icon={MdFilterList}
              onClick={() => {
                toast.loading('Carregando...');
                fetchPayroll();
              }}
            />
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col gap-2">
          {
            loading ? (
              <div className=" flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-subMain"></div>
              </div>
            ) : (


              payroll && payroll.length > 0 ? (
                payroll.map((data, index) => {
                  return (
                    <PaymentsProfessionalsDisclosure
                      key={index}
                      data={data}
                      //subTitle={`Produção: ${moneyFormat2BR(data.totalGrossPay)}`} // R$ 1.000,00
                      subTitle={<PaymentsProfessionalsDisclosureSubTitle data={data} />} // R$ 1.000,00
                      hideOtherDisclosuresHandle={hideOtherDisclosuresHandle}
                      keyIndex={index}
                    >
                      <div className="flex flex-col w-full">
                        <div className='p-4 flex flex-col gap-4 w-full'>

                          {data.events &&
                            data.events.map((item, index) => {
                              return (
                                <PaymentsAgreementsDisclosure
                                  key={index}
                                  data={item}
                                  subTitle={<PaymentsAgreementsDisclosureSubTitle data={item} />}
                                  keyIndex={index}
                                >
                                  <div className='flex flex-col gap-4 w-full pb-4'>
                                    <PaymentsAgreementsDisclosureChildren
                                      data={item}
                                      keyIndex={index}

                                    >
                                      {item.events.map((serviceItem, index) => {
                                        return (
                                          <button className="flex w-full bg-white border border-subMain rounded-lg items-center cursor-pointer"
                                            key={index}
                                            onClick={() => handleClickService(serviceItem, item.agreementName, data.professionalName)}
                                          >
                                            <div className='grid grid-cols-5 px-4  py-2 w-full gap-2 items-center'>

                                              <div className="text-sm text-black col-span-2 text-left">{serviceItem.serviceName}</div>
                                              <div className="text-sm text-black text-center">{serviceItem.qty}</div>
                                              <div className="flex flex-col items-center" >
                                                <span className="text-sm text-black">{moneyFormat2BR(serviceItem.total)}</span>
                                                <span className="text-sm text-gray-400">Produção</span>
                                              </div>
                                              <div className="flex flex-col items-center" >
                                                <span className="text-sm text-black">{moneyFormat2BR(serviceItem.amountDue)}</span>
                                                <span className="text-sm text-gray-400">Repasse</span>
                                              </div>
                                            </div>
                                            <div className=" items-center p-2" >
                                              <span className="text-md text-subMain"><IoIosArrowForward /></span>
                                            </div>
                                          </button>
                                        )
                                      })}
                                    </PaymentsAgreementsDisclosureChildren>
                                  </div>
                                </PaymentsAgreementsDisclosure>
                              );
                            })
                          }
                        </div>
                        <div className='p-4 rounded-b-lg grid grid-cols-5'>
                          <div className="flex items-center justify-center col-start-5" >
                            <Button
                              label="Exportar"
                              Icon={MdOutlineCloudDownload}
                              onClick={() => handleExport(data)}
                            />
                          </div>

                        </div>


                        <div className='bg-subMain p-4 rounded-b-lg grid grid-cols-5'>

                          <div className="flex items-center justify-center" >
                            <span className="text-md font-semibold text-white">{data.qty}</span>
                          </div>
                          <div className="flex flex-col items-center" >
                            <span className="text-xl font-semibold text-white">{moneyFormat2BR(data.professionalGrossValue)}</span>
                            <span className="text-sm text-black">Produção</span>
                          </div>
                          <div className="flex flex-col items-center" >
                            <span className="text-xl font-semibold text-white">{moneyFormat2BR(data.professionalAmountDue)}</span>
                            <span className="text-sm text-black">Repasse</span>
                          </div>
                          <div className="flex flex-col items-center" >
                            <span className="text-xl font-semibold text-white">{moneyFormat2BR(data.professionalTax)}</span>
                            <span className="text-sm text-black">Imposto</span>
                          </div>
                          <div className="flex flex-col items-center" >
                            <span className="text-xl font-semibold text-white">{moneyFormat2BR(data.professionalProfit)}</span>
                            <span className="text-sm text-black">Saldo Clínica</span>
                          </div>
                        </div>
                      </div>
                    </PaymentsProfessionalsDisclosure>
                  );
                })
              ) : (
                <div className="flex justify-center items-center">
                  <h1 className="text-lg p-14">Nenhum pagamento encontrado</h1>
                </div>
              )
            )}
        </div>
      </div>
    </Layout >
  );
}

export default Payments;
