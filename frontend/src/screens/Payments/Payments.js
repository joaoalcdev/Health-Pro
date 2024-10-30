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
import { getPayroll } from '../../api/PaymentsAPI'
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { TbUserDollar } from 'react-icons/tb';

function Payments() {
  const today = new Date();
  const [monthRange, setMonthRange] = useState(new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0));
  const [monthFilter, setMonthFilter] = useState(new Date());
  const navigate = useNavigate();

  const [payroll, setPayroll] = useState([]);
  const [summary, setSummary] = useState({});

  const fetchPayroll = async () => {
    const response = await getPayroll(`01-${monthRange.getMonth() + 1}-${monthRange.getFullYear()}`);
    console.log('Response', response);
    if (response.error || response.length === 0) {
      toast.error('Nenhum pagamento encontrado');
      return;
    }
    if (response) {
      setPayroll(response.professionals);
      setSummary(response.summary);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

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

  const editPayment = (id) => {
    navigate(`/payments/edit/${id}`);
  };
  // preview
  const previewPayment = (id) => {
    navigate(`/payments/preview/${id}`);
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

  const handleClick = () => {
    toast.success('Cliquei');
  };
  return (
    <Layout>
      {/* add button */}
      {/* <button
        onClick={() => {
          console.log('Data', payroll);
          toast.error('Exporting is not available yet');
        }}
        className="w-16 hover:w-44 group transitions hover:h-14 h-16 border border-border z-50 bg-subMain text-white rounded-full flex-rows gap-4 fixed bottom-8 right-12 button-fb"
      >
        <p className="hidden text-sm group-hover:block">Export</p>
        <MdOutlineCloudDownload className="text-2xl" />
      </button> */}
      <h1 className="text-xl font-semibold">Pagamentos</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
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
            className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
          />

          {/* date */}
          <MonthlyPicker
            value={monthRange}
            startDate={monthFilter}
            endDate={monthFilter}
            bg="bg-dry"
            onChange={(update) => setMonthRange(update)}
          />
          {/* export */}
          <Button
            label="Filtrar"
            Icon={MdFilterList}
            onClick={() => {
              toast.loading('Carregando...');
              fetchPayroll();
            }}
          />
        </div>
        <div className="mt-8 w-full flex flex-col gap-2">
          {payroll && payroll.length > 0 &&
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
                                  handleClick={() => toast('Cliquei')}
                                />
                                {/* <div className='bg-greyed p-4 rounded-b-lg grid grid-cols-2'>
                                  <div className="flex items-center" >
                                    <span className="text-md text-subMain">Totais</span>
                                  </div>
                                  <div className='grid grid-cols-4 items-center gap-4 '>
                                    <div className="flex flex-col items-center" >
                                      <span className="text-md text-subMain">{item.qty}</span>
                                    </div>
                                    <div className="flex flex-col items-center" >
                                      <span className="text-md text-subMain">{moneyFormat2BR(item.total)}</span>
                                      <span className="text-sm text-gray-600">Produção</span>
                                    </div>
                                    <div className="flex flex-col items-center" >
                                      <span className="text-md text-subMain">{moneyFormat2BR(item.amountDue)}</span>
                                      <span className="text-sm text-gray-600">Repasse</span>
                                    </div>
                                    <div className="flex flex-col items-center" >
                                      <span className="text-md text-subMain">{moneyFormat2BR(item.tax)}</span>
                                      <span className="text-sm text-gray-600">Imposto</span>
                                    </div>
                                  </div>

                                </div> */}
                              </div>
                            </PaymentsAgreementsDisclosure>
                          );
                        })
                      }
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

          }

        </div>
      </div>
    </Layout >
  );
}

export default Payments;
