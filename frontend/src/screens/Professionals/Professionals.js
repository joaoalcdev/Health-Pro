import { useEffect, useState } from 'react';
import { BiPlus, BiChevronDown } from 'react-icons/bi';
import Layout from '../../Layout';
import { FilterSelect } from '../../components/Form';
import { ProfessionalsTable } from '../../components/Tables';
import { useNavigate } from 'react-router-dom';
import AddProfessionalModal from '../../components/Modals/AddProfessionalModal';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { specialties } from '../../components/Datas';
import { BiLoaderCircle } from 'react-icons/bi';

function Professionals() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filterProfessionals, setFilterProfessionals] = useState({ id: 0, name: "Todos" });

  const [searchTerm, setSearchTerm] = useState(null);

  const fetch = async () => {
    setLoading(true)
    const response = await getProfessionals()
    if (response.length === 0) {
      setNoData(true)
      setLoading(false)
      return
    }
    setData(response)
    setAllData(response)
    setLoading(false)
    setStatus(false)
  }

  useEffect(() => {
    fetch()
  }, [status])

  const fetchFilter = async () => {
    setLoading(true)
    if (filterProfessionals.id === 0) {
      fetch()
      setLoading(false)
      return
    }
    const response = await getProfessionals()
    const filtered = response.filter((item) => {
      if (item.specialty === filterProfessionals.id) {
        return item
      }
    })
    if (filtered.length === 0) {
      setNoResult(true)
      setLoading(false)
      return
    }
    setData(filtered)
    setNoResult(false)
    setLoading(false)
    setStatus(false)
  }

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
    fetchFilter()
  }, [filterProfessionals])


  useEffect(() => {
    setData(allData.filter((item) => {
      if (searchTerm === "" || searchTerm === null) {
        return item
      } else if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item
      }
    })
    )
    //setFilterProfessionals({ id: 0, name: "Todos" })
  }, [searchTerm])




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
      <h1 className="text-xl font-semibold">Profissionais</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        {loading && !noData ?
          <div className="flex items-center justify-center h-auto">
            <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
          </div>
          : noData ?
            <div className="flex items-center justify-center h-auto">
              <p className="text-sm text-main">Nenhum dado encontrado</p>
            </div>
            :
            <>
              <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
                <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
                  <input
                    type="text"
                    placeholder='Pesquise por nome...'
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                    }}
                    className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
                  />

                </div>
                <FilterSelect
                  selectedPerson={filterProfessionals}
                  setSelectedPerson={setFilterProfessionals}
                  datas={specialties.specialty}
                >
                  <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                    <p>{filterProfessionals.name}</p>
                    <BiChevronDown className="text-xl" />
                  </div>
                </FilterSelect>
              </div>
              <div className="mt-8 w-full overflow-x-scroll">
                < ProfessionalsTable
                  doctor={true}
                  noData={noResult}
                  data={data}
                  functions={{
                    preview: preview,
                  }}
                />
              </div>
            </>
        }
      </div>
    </Layout>
  );
}

export default Professionals;
