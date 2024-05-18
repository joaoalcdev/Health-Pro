import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import Layout from '../../Layout';
import { ProfessionalsTable } from '../../components/Tables';
import { doctorsData } from '../../components/Datas';
import { useNavigate } from 'react-router-dom';
import AddProfessionalModal from '../../components/Modals/AddProfessionalModal';
import { getProfessionals } from '../../api/ProfessionalsAPI';

function Professionals() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(true);

  const fetch = async () => {
    const response = await getProfessionals()
    setData(response)
    setStatus(false)
  }

  useEffect(() => {
    fetch()
  }, [status])

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const preview = (data) => {
    navigate(`/professionals/preview/${data.id}`);
  };

  return (
    <Layout>
      {
        // add doctor modal
        isOpen && (
          <AddProfessionalModal
            closeModal={onCloseModal}
            isOpen={isOpen}
            doctor={true}
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

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            <input
              type="text"
              placeholder='Pesquise por nome...'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <ProfessionalsTable
            doctor={true}
            data={data}
            functions={{
              preview: preview,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Professionals;
