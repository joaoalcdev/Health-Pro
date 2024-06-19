import { useEffect, useState } from 'react';
import { BiPlus, BiChevronDown } from 'react-icons/bi';
import Layout from '../../Layout';
import { FilterSelect } from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import AddProfessionalModal from '../../components/Modals/AddProfessionalModal';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { BiLoaderCircle } from 'react-icons/bi';
import Tab from '../../components/Tab';
import ProfessionalTable from '../../components/Tables/ProfessionalTable';
import { getSpecialties } from '../../api/specialtiesAPI';

function Professionals() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);

  //data
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  //controllers
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [loading, setLoading] = useState(false);

  //filter and search controllers
  const [filterTerm, setFilterTerm] = useState({ id: 0, name: "Todos" });
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    setLoading(true);
    const response = await getProfessionals(tab === 1 ? '' : 'true')
    if (response.length === 0) {
      setNoData(true);
      setNoResult(true);
      setLoading(false);
      return
    }
    setData(response)
    setAllData(response)
    setLoading(false)
    setStatus(false)
  }

  const fetchSpecialties = async () => {
    const response = await getSpecialties()
    setSpecialties(response)
  }

  useEffect(() => {
    fetch()
    fetchSpecialties()
  }, [status, tab])

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onStatus = () => {
    setStatus(true)
  }

  const preview = (data) => {
    navigate(`/professionals/preview/${data.id}`);
  };

  useEffect(() => {
    setData(allData.filter((item) => {
      //case 1 - no filter and no search
      if (searchTerm === "" && filterTerm.id === 0) {
        setNoResult(false)
        return item
      }
      //case 2 - no filter but has search
      if (filterTerm.id === 0 && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        setNoResult(false)
        return item
      }
      //case 3 - no search but has filter
      if (searchTerm === "" && filterTerm.id === item.specialty) {
        setNoResult(false)
        return item
      }
      //case 4 - has filter and search
      if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) && filterTerm.id === item.specialty) {
        setNoResult(false)
        return item
      }
    })
    )
  }, [searchTerm, filterTerm])

  useEffect(() => {
    if (data.length === 0) {
      setNoResult(true)
      return
    }
    setNoResult(false)
  }, [data])

  const onChangeTab = (index) => {
    index === 1 ? setTab(1) : setTab(2);
    setFilterTerm({ id: 0, name: "Todos" });
    setSearchTerm("");
  }

  return (
    <Layout>
      {
        // add doctor modal
        isOpen && (
          <AddProfessionalModal
            closeModal={onCloseModal}
            isOpen={isOpen}
            professional={true}
            status={onStatus}
            datas={null}
          />
        )
      }
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <div className="sm:flex grid grid-cols-1 gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Profissionais</h1>
        <Tab selectedTab={tab} functions={{
          onChangeTab: onChangeTab
        }}
        />
      </div>
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
            className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
          >

            <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
              <input
                type="text"
                placeholder='Pesquise por nome...'
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
              />

              <FilterSelect
                selectedPerson={filterTerm}
                setSelectedPerson={setFilterTerm}
                datas={specialties}
              >
                <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                  <p>{filterTerm.name}</p>
                  <BiChevronDown className="text-xl" />
                </div>
              </FilterSelect>
            </div>
            <div className="mt-8 w-full overflow-x-scroll">
              {noResult ?
                <div className="bg-greyed pt-8 pb-8 flex items-center justify-center h-auto">
                  <p className="text-sm text-main">Nenhum profissional encontrado</p>
                </div>
                :
                < ProfessionalTable
                  doctor={true}
                  data={data}
                  noData={noResult}
                  functions={{
                    preview: preview,
                  }}
                />
              }
            </div>
          </div>
        </>
      }
    </Layout >
  );
}

export default Professionals;
