import { useState, useEffect } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import Drawer from 'react-modern-drawer';
import Layout from '../../Layout';
import { waitlist } from '../../api/specialtiesAPI';
import IncludePatient2Waitlist from '../../components/Forms/IncludePatient2Waitlist';
import { WaitlistDetail } from './WaitlistDetails';

function Waitlist() {
  //datas
  const [allData, setAllData] = useState([])
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState({});

  //controllers
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [loading, setLoading] = useState(false);

  //search controllers
  const [searchTerm, setSearchTerm] = useState("");

  //fetch data
  const fetch = async () => {
    setLoading(true);
    const response = await waitlist()
    if (response.status !== 200) {
      setNoResult(true);
      setLoading(false);
      return
    }
    if (response.status === 200) {
      setAllData(response.data)
      setDatas(response.data)
      setNoResult(false)
      setLoading(false)
      setStatus(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [status])

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

  const includePatient = (specialtyData) => {
    setData(specialtyData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
    setData({});
    fetch();
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
          size={400}
          zIndex={40}
          enableOverlay={true}
        >
          <IncludePatient2Waitlist
            datas={data}
            onClose={handleClose}
          />

        </Drawer>
      )}
      {/*  */}
      <h1 className="text-xl font-semibold">Lista de Espera</h1>
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
                    <WaitlistDetail
                      key={index}
                      data={data}
                      hideOtherDisclosuresHandle={hideOtherDisclosuresHandle}
                      includePatient={includePatient}
                    />
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

export default Waitlist;
