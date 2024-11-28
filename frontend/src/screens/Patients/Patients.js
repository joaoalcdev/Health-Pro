// dependencies - libraries
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// data - api
import { deletePatient, getPatients, recoveryPatient } from '../../api/PatientsAPI';
import { getProfessionals } from '../../api/ProfessionalsAPI';

// icons
import { HiOutlineTrash, HiMiniUserGroup, HiOutlineClock, HiOutlinePlus, HiMiniCalendarDays } from "react-icons/hi2";
import { BiLoaderCircle, BiChevronDown } from 'react-icons/bi';

// components
import Layout from '../../Layout';
import Tab from '../../components/Tab';
import AddPatientModal from '../../components/Modals/AddPatientModal';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { PatientsTable } from '../../components/Tables/PatientTable';
import { FilterSelect } from '../../components/Form';

function Patients(superIndex) {
  const navigate = useNavigate();

  // data
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([]);
  const [patient, setPatient] = useState();
  const [professionals, setProfessionals] = useState([]);

  // controllers
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(1);
  const [status, setStatus] = useState(false);

  //filter and search controllers
  const [filterTerm, setFilterTerm] = useState({ id: 0, fullName: "Todos profissionais" });


  // api - get patients
  const fetch = async () => {
    setLoading(true)
    const response = await getPatients(tab === 1 ? '' : 'true')
    const professionals = await getProfessionals()
    if (response.status !== 200 || professionals.status !== 200) {
      setNoData(true)
      setNoResult(true)
      setLoading(false)
      return
    }
    if (response.status === 200 && professionals.status === 200) {
      setData(response.data)
      setAllData(response.data)
      const allProfessionals = professionals.data.map((item) => {
        return {
          ...item,
          name: item.firstName + ' ' + item.lastName + ' (' + item.specialtyName + ')',
        }
      })
      setProfessionals(allProfessionals)
      setNoResult(false)
      setLoading(false)
      setStatus(false)
    }
  }

  // dependencies
  useEffect(() => {
    fetch()
  }, [status, tab])

  const fetchPatients = async () => {
    setLoading(true)
    const response = await getPatients(tab === 1 ? '' : 'true', filterTerm.id === 0 ? '' : filterTerm.id)
    if (response.status !== 200) {
      setNoData(true)
      setNoResult(true)
      setLoading(false)
      return
    }
    if (response.status === 200) {
      setData(response.data)
      setAllData(response.data)
      setNoResult(false)
      setLoading(false)
      setStatus(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [filterTerm])

  // api - preview patient
  const preview = (id) => {
    navigate(`/patients/preview/${id}`);
  };

  // api - delete patient
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

  // api - remove patient (confirmation)
  const removePatient = (patient) => {
    setPatient(patient)
    setIsConfirmationOpen(true)
  };

  // api - restore patient
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

  // modal controllers
  const onCloseModal = () => {
    setIsOpen(false);
    setIsAdd(false);
    setIsConfirmationOpen(false);
  };

  // search data
  const [searchTerm, setSearchTerm] = useState("");

  // search cases
  useEffect(() => {
    setData(allData.filter((item) => {
      // case 1 - no filter and no search
      if (searchTerm === "") {
        setNoResult(false)
        return item
      }
      // case 2 - no filter but has search
      if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        setNoResult(false)
        return item
      }
      // case 3 - no search but has filter
      if (searchTerm === "") {
        setNoResult(false)
        return item
      }
      // case 4 - has filter and search
      if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        setNoResult(false)
        return item
      }
    })
    )
  }, [searchTerm])

  // data - no result
  useEffect(() => {
    if (data.length === 0) {
      setNoResult(true)
      return
    }
    setNoResult(false)
  }, [data])

  // tab controllers
  const onChangeTab = (index) => {
    index === 1 ? setTab(1) : setTab(2);
    setFilterTerm({ id: 0, fullName: "Todos profissionais" });
    setSearchTerm("");
  };

  // boxes data - last30Days
  const today = new Date();
  const last30Days = new Date(today.setDate(today.getDate() - 30));
  const valueOnRange = data.filter((item) => {
    const date = new Date(item.createdAt);
    return date >= last30Days;
  });
  const last30DaysPatients = valueOnRange.length;

  // archived patients
  const archivedPatients = data.filter((item) => item.deletedAt !== null).length;

  const diaryPatients = data.filter((item) => {
    const date = new Date(item.createdAt);
    return date.toDateString() === new Date().toDateString();
  });

  // component - boxes data
  const boxes = tab === 1 ? [
    {
      id: 1,
      title: 'Pacientes Diários',
      value: ['+', diaryPatients.length, ''],
      text: 'No Data :(',
      color: ['bg-subMain', 'text-subMain'],
      icon: HiOutlineClock,
    },
    {
      id: 2,
      title: 'Pacientes Mensais',
      value: ['+', last30DaysPatients, ''],
      text: 'novos pacientes',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: HiMiniCalendarDays,
    },
    {
      id: 3,
      title: 'Pacientes Ativos (Total)',
      value: ['', data.length, ' pacientes'],
      text: 'ativos',
      color: ['bg-green-500', 'text-green-500'],
      icon: HiMiniUserGroup,
    },
  ] : [
    {
      id: 4,
      title: 'Pacientes Arquivados (Total)',
      value: ['', archivedPatients, ''],
      text: ['pacientes arquivados'],
      color: ['bg-red-500', 'text-red-500'],
      icon: HiOutlineTrash,
    },
  ];

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
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener('resize', handleResize, { passive: true });
  }, []);

  // pagination states
  const [records, setRecords] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  superIndex = (currentPage * recordsPerPage) - recordsPerPage;

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
        <HiOutlinePlus className="text-2xl" />
      </button>
      <div className="sm:flex grid grid-cols-1 gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Pacientes</h1>
        <Tab
          selectedTab={tab}
          functions={{ onChangeTab }}
        />
      </div>
      {/* boxes */}
      {
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {boxes.map((box) => (
            <div
              // data-aos="fade-up"
              // data-aos-duration="800"
              // data-aos-delay="10"
              // data-aos-offset="100"
              // data-aos-easing="ease"
              // data-aos-once="true"
              className=""
              key={box.id}
            >
              <div
                className="select-text bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5 hover:-translate-y-2 hover:shadow-md transition-all duration-300 ease-in-out"
              >
                <div className="w-3/4">
                  <h2 className="text-sm font-medium">{box.title}</h2>
                  <h2 className="text-xl my-6 font-medium">{box.value}</h2>
                  <p className="text-xs text-textGray">
                    <span className={box.color[1]}> {box.value} {box.text}</span>{' '}
                    {
                      box.title === 'Pacientes Diários'
                        ? ''
                        : box.title === 'Pacientes Mensais'
                          ? 'esse mês'
                          : 'na clínica'
                    }
                  </p>
                </div>
                <div
                  className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
                >
                  <box.icon />
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      {/* datas */}
      {loading ?
        <div className="flex relative w-full h-1/2 top-20 justify-center items-center"> {/* resolve style: generating scroll x = flex absolute items-center justify-center w-full h-1/2*/}
          <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
        </div>
        :
        <>
          <div
            // data-aos="fade-up"
            // data-aos-duration="1000"
            // data-aos-delay="10"
            // data-aos-offset="200"
            className="bg-white my-8 rounded-xl border-[1px] border-border px-5"
          >
            <div className="grid lg:grid-cols-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 pt-5">
              <input
                type="text"
                placeholder='Pesquisar por paciente...'
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
              />
              <FilterSelect
                selectedPerson={filterTerm}
                setSelectedPerson={setFilterTerm}
                datas={professionals}
              >
                <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                  <p>{filterTerm.fullName}</p>
                  <BiChevronDown className="text-xl" />
                </div>
              </FilterSelect>
            </div>
            <div className="w-full">
              {noResult ?
                <>
                  <div className="bg-greyed mt-8 pt-8 pb-8 flex items-center justify-center h-auto">
                    <p className="text-sm text-main">Nenhum paciente encontrado</p>
                  </div>
                </>
                :
                <>
                  {/* ini table main */}
                  <div className="mt-6 bg-white rounded-xl border-[1px] border-border px-5">
                    {/* ini table child */}
                    <div className="mt-4 overflow-x-auto">
                      <PatientsTable
                        patientData={records}
                        noData={noResult}
                        superIndex={superIndex}
                        functions={{
                          preview: preview,
                          deletePatient: removePatient,
                          restorePatient: restorePatient,
                        }}
                        used={dynamicUsed}
                      />
                    </div>
                    {/* end table child */}
                  </div>
                  {/* end table main */}
                </>
              }
              <div className='flex flex-row w-full items-center justify-center mx-auto'>
                <Pagination
                  records={data}
                  setRecords={setRecords}
                  recordsPerPage={recordsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </>
      }
    </Layout >
  );
}

export default Patients;