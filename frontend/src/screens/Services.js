import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus, BiLoaderCircle } from 'react-icons/bi';
import Layout from '../Layout';
import { Button, FilterSelect } from '../components/Form';
import ServiceTable from '../components/Tables/ServiceTable';
import AddEditServiceModal from '../components/Modals/AddEditServiceModal';
import { getServices } from '../api/ServicesAPI';
import { getSpecialties } from '../api/specialtiesAPI';

function Services() {
  //datas
  const [allData, setAllData] = useState([])
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState({});

  //controllers
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [loading, setLoading] = useState(false);

  //filter and search controllers
  const [specialties, setSpecialties] = useState([]);
  const [filterTerm, setFilterTerm] = useState({ id: 0, name: "Filtre por Especialidade..." });
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    setLoading(true);
    const response = await getServices()
    if (response.length === 0) {
      setNoData(true);
      setNoResult(true);
      setLoading(false);
      return
    }
    setDatas(response)
    setAllData(response)
    setLoading(false)
    setNoResult(false)
    setStatus(false)
  };

  const fetchSpecialties = async () => {
    const response = await getSpecialties()
    setSpecialties(response)
  }

  useEffect(() => {
    fetch();
    fetchSpecialties();
  }, [status]);

  const onCloseModal = () => {
    setIsOpen(false);
    setData({});
  };

  const onEdit = (datas) => {
    setIsOpen(true);
    setData(datas);
  };

  return (
    <Layout>
      {isOpen && (
        <AddEditServiceModal
          datas={data}
          isOpen={isOpen}
          closeModal={onCloseModal}
          setStatus={setStatus}
        />
      )}
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Serviços</h1>
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
            <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
              <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
                <input
                  type="text"
                  placeholder='Pesquise por serviço...'
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
            </div>
            <div className="mt-8 w-full overflow-x-scroll">
              {noResult ?
                <div className="bg-greyed pt-8 pb-8 flex items-center justify-center h-auto">
                  <p className="text-sm text-main">Nenhum serviço encontrado</p>
                </div>
                :
                <ServiceTable
                  data={datas}
                  onEdit={onEdit}
                  noData={noResult}
                />
              }
            </div>
          </div>
        </>
      }
    </Layout>
  );
}

export default Services;
