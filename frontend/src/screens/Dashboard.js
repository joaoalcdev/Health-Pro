import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpRight, BsCheckCircleFill, BsClockFill, BsXCircleFill } from 'react-icons/bs';
import { TbCalendar, TbFile, TbUsers } from 'react-icons/tb';
import { DashboardBigChart, DashboardSmallChart } from '../components/Charts';
import { getPatients } from '../api/PatientsAPI';
import { appointmentsData, memberData, transactionData } from '../components/Datas';
import { Transactiontable } from '../components/Tables';
import { Link } from 'react-router-dom';


function Dashboard() {
  const [dataPatient, setDataPatient] = useState([]);
  const [status, setStatus] = useState(false);

  // api - get patients
  const fetchPatients = async () => {
    const responseDataPatient = await getPatients();
    if (responseDataPatient.length === 0) {
      return
    }
    setDataPatient(responseDataPatient)
    setStatus(false)
  }

  // dependencies
  useEffect(() => {
    fetchPatients()
  }, [status])


  // boxes data - months
  const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

  const dynamicMonths = months.map((month) => {
    const monthData = dataPatient.filter((item) => {
      const date = new Date(item.createdAt);
      return date.getMonth() === parseInt(month);
    });
    return monthData.length
  });

  const totalPatientsCalcPercent = (data) => {
    // compare with the last month data
    const last30Days = dataPatient.filter((item) => {
      const date = new Date(item.createdAt);
      return date.getMonth() === new Date().getMonth() - 1;
    }
    );

    // total patients archived
    const archived = dataPatient.filter((item) => item.status === 'archived');


    const total = dataPatient.length;
    const difference = total - last30Days.length;
    const percent = (difference / total) * 100;
    return percent.toFixed(2);
  }

  const dashboardCards = [
    {
      id: 1,
      title: 'Pacientes Totais (Ativos)',
      icon: TbUsers,
      value: [dataPatient.length],
      percent: [totalPatientsCalcPercent(dataPatient.length)],
      color: ['bg-subMain', 'text-subMain', '#66B5A3'],
      datas: [dynamicMonths[0], dynamicMonths[1], dynamicMonths[2], dynamicMonths[3], dynamicMonths[4], dynamicMonths[5], dynamicMonths[6], dynamicMonths[7], dynamicMonths[8], dynamicMonths[9], dynamicMonths[10], dynamicMonths[11]],
    },
    {
      id: 2,
      title: 'Atendimentos',
      icon: TbCalendar,
      value: 1,
      percent: 25.06,
      color: ['bg-yellow-500', 'text-yellow-500', '#F9C851'],
      datas: [6, 3, 8, 3, 7, 9, 5, 2, 5, 6, 9, 11],
    },
    {
      id: 3,
      title: 'Prescriptions',
      icon: TbFile,
      value: 4160,
      percent: 65.06,
      color: ['bg-green-500', 'text-green-500', '#34C759'],
      datas: [92, 80, 45, 15, 49, 77, 70, 51, 110, 20, 90, 60],
    },
    {
      id: 4,
      title: 'Total Earnings',
      icon: TbFile,
      value: 4590,
      percent: 45.06,
      color: ['bg-red-500', 'text-red-500', '#FF3B30'],
      datas: [20, 50, 75, 15, 108, 97, 70, 41, 50, 20, 90, 60],
    },
  ];

  return (
    <Layout>
      {/* boxes */}
      <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {dashboardCards.map((card, index) => (
          <div
            key={card.id}
            className=" bg-white rounded-xl border-[1px] border-border p-5"
          >
            <div className="flex gap-4 items-center">
              <div
                className={`w-10 h-10 flex-colo bg-opacity-10 rounded-md ${card.color[1]} ${card.color[0]}`}
              >
                <card.icon />
              </div>
              <h2 className="text-sm font-medium">{card.title}</h2>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-4 bg-dry py-5 px-8 items-center rounded-xl">
              <div className="col-span-5">
                {/* statistc */}
                <DashboardSmallChart data={card.datas} colors={card.color[2]} />
              </div>
              <div className="flex flex-col gap-4 col-span-3">
                <h4 className="text-md font-medium">
                  {card.value}
                  {
                    // if the id === 4 then add the $ sign
                    card.id === 4 ? '$' : '+'
                  }
                </h4>
                <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                  {card.percent > 50 && <BsArrowUpRight />}
                  {card.percent > 30 && card.percent < 50 && (
                    <BsArrowDownRight />
                  )}
                  {card.percent < 30 && <BsArrowDownLeft />}
                  {card.percent}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-6  w-full">
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <div className="flex-btn gap-2">
              <h2 className="text-sm font-medium">
                Gráfico (alterar)
              </h2>
              <p className="flex gap-4 text-sm items-center">
                5.44% (alterar)
                <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                  +2.4% (alterar)
                </span>
              </p>
            </div>
            {/* Earning Reports */}
            <div className="mt-4">
              <DashboardBigChart />
            </div>
          </div>
          {/* transaction */}
          <div className="mt-6 bg-white rounded-xl border-[1px] border-border p-5">
            <div className="flex-btn gap-2">
              <h2 className="text-sm font-medium">Recent Transaction</h2>
              <p className="flex gap-4 text-sm items-center">
                Today{' '}
                <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                  27000$
                </span>
              </p>
            </div>
            {/* table */}
            <div className="mt-4 overflow-x-scroll">
              <Transactiontable
                data={transactionData.slice(0, 5)}
                action={false}
              />
            </div>
          </div>
        </div>
        {/* side 2 */}
        <div
          // data-aos="fade-left"
          // data-aos-duration="1000"
          // data-aos-delay="10"
          // data-aos-offset="200"
          className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"
        >
          {/* recent patients */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <h2 className="text-sm font-medium">Recent Patients</h2>
            {memberData.slice(3, 8).map((member, index) => (
              <Link
                to={`/patients/preview/${member.id}`}
                key={index}
                className="flex-btn gap-4 mt-6 border-b pb-4 border-border"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={member.image}
                    alt="member"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-medium">{member.title}</h3>
                    <p className="text-xs text-gray-400">{member.phone}</p>
                  </div>
                </div>
                <p className="text-xs text-textGray">2:00 PM</p>
              </Link>
            ))}
          </div>
          {/* today apointments */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
            <h2 className="text-sm mb-4 font-medium">Today Appointments</h2>
            {appointmentsData.map((appointment, index) => (
              <div
                key={appointment.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <p className="text-textGray text-[12px] col-span-3 font-light">
                  {appointment.time}
                </p>
                <div className="flex-colo relative col-span-2">
                  <hr className="w-[2px] h-20 bg-border" />
                  <div
                    className={`w-7 h-7 flex-colo text-sm bg-opacity-10
                   ${appointment.status === 'Pending' &&
                      'bg-orange-500 text-orange-500'
                      }
                  ${appointment.status === 'Cancel' && 'bg-red-500 text-red-500'
                      }
                  ${appointment.status === 'Approved' &&
                      'bg-green-500 text-green-500'
                      }
                   rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    {appointment.status === 'Pending' && <BsClockFill />}
                    {appointment.status === 'Cancel' && <BsXCircleFill />}
                    {appointment.status === 'Approved' && <BsCheckCircleFill />}
                  </div>
                </div>
                <Link
                  to="/appointments"
                  className="flex flex-col gap-1 col-span-6"
                >
                  <h2 className="text-xs font-medium">
                    {appointment.user?.title}
                  </h2>
                  <p className="text-[12px] font-light text-textGray">
                    {appointment.from} - {appointment.to}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
