import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { sortsDatas } from '../../components/Datas';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronDown, BiPlus, BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdFilterList, MdOutlineCalendarMonth } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { Button, FromToDate, Select } from '../../components/Form';
import { PatientTable } from '../../components/Tables';
import { BiLoaderCircle } from 'react-icons/bi';
import ViewUserModal from '../../components/Modals/ViewUserModal';


import AddPatientModal from '../../components/Modals/AddPatientModal';
import { PatientsTable } from '../../components/Tables';
import { deletePatient, getPatients, recoveryPatient } from '../../api/PatientsAPI';
// import ViewUserModal from '../components/Modals/ViewUserModal';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import Tab from '../../components/Tab';


function Patients() {
  const navigate = useNavigate();
  // const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  // const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  // const [startDate, endDate] = dateRange;

  // const sorts = [
  //   {
  //     id: 2,
  //     selected: status,
  //     setSelected: setStatus,
  //     datas: sortsDatas.filterPatient,
  //   },
  //   {
  //     id: 3,
  //     selected: gender,
  //     setSelected: setGender,
  //     datas: sortsDatas.genderFilter,
  //   },
  // ];

  // boxes
  const boxes = [
    {
      id: 1,
      title: 'Today Patients',
      // value from api
      value: '20',
      color: ['bg-subMain', 'text-subMain'],
      icon: BiTime,
    },
    {
      id: 2,
      title: 'Monthly Patients',
      value: '230',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: 'Yearly Patients',
      value: '1,500',
      color: ['bg-green-500', 'text-green-500'],
      icon: MdOutlineCalendarMonth,
    },
  ];

  // preview
  // const preview = (id) => {
  //   navigate(`/patients/preview/${id}`);
  // };



  //data
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([]);
  const [patient, setPatient] = useState();

  //controllers
  const [isOpen, setIsOpen] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(1);
  //controllers
  const [status, setStatus] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [isAdd, setIsAdd] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    setLoading(true)
    const response = await getPatients(tab === 1 ? '' : 'true')
    if (response.length === 0) {
      setNoData(true)
      setNoResult(true)
      setLoading(false)
      return
    }
    setData(response)
    setAllData(response)
    setNoResult(false)
    setLoading(false)
    setStatus(false)
  }

  useEffect(() => {
    fetch()
  }, [status, tab])


  const handleDelete = async () => {
    setLoading(true)
    const response = await deletePatient(patient)
    if (response) {
      toast.success('Paciente arquivado com sucesso',
        { position: 'top-center' }
      )
      setStatus(true)
      setIsConfirmationOpen(false)
      setLoading(false)
    } else {
      toast.error('Não foi possível arquivar o paciente. Talvez tenha consultas vinculadas ao paciente.',
        { position: 'top-center' })
    }
  }

  const onChangeTab = (index) => {
    index === 1 ? setTab(1) : setTab(2);
    setSearchTerm("");
  }

  const onCloseModal = () => {
    setIsOpen(false);
    setIsAdd(false);
    setIsConfirmationOpen(false);
  };

  const preview = (id) => {
    navigate(`/patients/preview/${id}`);
  };

  const removePatient = (patient) => {
    setPatient(patient)
    setIsConfirmationOpen(true)
  };

  const restorePatient = async (patient) => {
    setLoading(true);
    const response = await recoveryPatient(patient);
    if (response) {
      toast.success('Paciente restaurado com sucesso', { position: 'top-center' });
      setStatus(true);
      setLoading(false);
    } else {
      toast.error('Não foi possível restaurar o paciente', { position: 'top-center' });
    }
  };


  // dynamic used patients
  const [dynamicUsed, setDynamicUsed] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setDynamicUsed(true);
      } else {
        setDynamicUsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    setData(allData.filter((item) => {
      //case 1 - no filter and no search
      if (searchTerm === "") {
        setNoResult(false)
        return item
      }
      //case 2 - no filter but has search
      if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        setNoResult(false)
        return item
      }
      //case 3 - no search but has filter
      if (searchTerm === "") {
        setNoResult(false)
        return item
      }
      //case 4 - has filter and search
      if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        setNoResult(false)
        return item
      }
    })
    )
  }, [searchTerm])

  useEffect(() => {
    if (data.length === 0) {
      setNoResult(true)
      return
    }
    setNoResult(false)
  }, [data])

  return (
    <Layout>
      {
        //confirmation modal
        isConfirmationOpen && (
          <ConfirmationModal
            title={'Desativar Paciente'}
            closeModal={onCloseModal}
            isOpen={isConfirmationOpen}
            loading={loading}
            question={"Você tem certeza que deseja desativar esse paciente?"}
            onConfirm={handleDelete}
          />
        )
      }
      {
        // add patient modal
        isOpen && (
          <AddPatientModal
            closeModal={onCloseModal}
            isOpen={isOpen}
            patient={true}
            status={setStatus}
            datas={isAdd ? data : patient}
          />
        )
      }
      {/* add button */}
      <button
        onClick={() => {
          setIsOpen(true)
          // setIsAdd(true)
        }}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      <div className="sm:flex grid grid-cols-1 gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Pacientes</h1>
        <Tab
          selectedTab={tab}
          functions={{ onChangeTab }}
        />
      </div>
      {/* <h1 className="text-xl font-semibold">Pacientes</h1> */}
      {/* boxes */}
      {
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
            >
              <div className="w-3/4">
                <h2 className="text-sm font-medium">{box.title}</h2>
                <h2 className="text-xl my-6 font-medium">{box.value}</h2>
                <p className="text-xs text-textGray">
                  Total Patients <span className={box.color[1]}>{box.value}</span>{' '}
                  {box.title === 'Today Patients'
                    ? 'today'
                    : box.title === 'Monthly Patients'
                      ? 'this month'
                      : 'this year'}
                </p>
              </div>
              <div
                className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
              >
                <box.icon />
              </div>
            </div>
          ))}
        </div>
      }
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
            data-aos-delay="10"
            data-aos-offset="200"
            className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
          >
            <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder='Pesquisar por paciente...'
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
              />
              {/* sort  */}
              {/* {sorts.map((item) => (
                <Select
                  key={item.id}
                  selectedPerson={item.selected}
                  setSelectedPerson={item.setSelected}
                  datas={item.datas}
                >
                  <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                    <p>{item.selected.name}</p>
                    <BiChevronDown className="text-xl" />
                  </div>
                </Select>
              ))} */}
              {/* date */}
              {/* <FromToDate
                startDate={startDate}
                endDate={endDate}
                bg="bg-dry"
                onChange={(update) => setDateRange(update)}
              /> */}
              {/* export */}
              {/* <Button
                label="Filter"
                Icon={MdFilterList}
                onClick={() => {
                  toast.error('Filter data is not available yet');
                }}
              /> */}
            </div>
            <div className="mt-8 w-full overflow-x-scroll">
              {noResult ?
                <>
                  <div className="bg-greyed pt-8 pb-8 flex items-center justify-center h-auto">
                    <p className="text-sm text-main">Nenhum paciente encontrado</p>
                  </div>
                </>
                :
                <PatientsTable
                  patientData={data}
                  noData={noResult}
                  functions={{
                    preview: preview,
                    deletePatient: removePatient,
                    restorePatient: restorePatient,
                  }}
                  used={dynamicUsed}
                />
              }
            </div>
          </div>
        </>
      }
    </Layout >
  );
}

export default Patients;
