// react & dep - imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// icons - imports
import { IoArrowBackOutline } from 'react-icons/io5';

// utils - imports
import getAvatar from '../../utils/getAvatar';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

// API's - imports
import { getProfessionalById } from '../../api/ProfessionalsAPI';

// datas - imports
import { professionalTab } from '../../components/Datas';

// components - imports
import Layout from '../../Layout';
import ScheduleUsed from '../../components/UsedComp/ScheduleUsed';
import AppointmentsUsed from '../../components/UsedComp/AppointmentsUsed';
import ProfessionalInfo from '../../components/UsedComp/ProfessionalInfo';
import ProfessionalRecord from './ProfessionalRecord';




function ProfessionalProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const [professional, setProfessional] = useState({});
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams()

  const fetch = async () => {
    const response = await getProfessionalById(id)
    if (response.status === 400) {
      toast.error('Nenhum registro encontrado');
      setLoading(false);
      return;
    }
    if (response.status === 200) {
      setProfessional(response.data);
      setLoading(false);
    }
    console.log(response)
  }

  useEffect(() => {
    fetch()
    setStatus(false)
  }, [id, status])

  const onStatus = (newStatus) => {
    setStatus(newStatus)
  }

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <ScheduleUsed />;
      case 2:
        return <ProfessionalInfo data={professional} onStatus={onStatus} />;
      case 3:
        return <AppointmentsUsed doctor={true} />;
      case 4:
        return <ProfessionalRecord data={professional} />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/professionals"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">{professional.fullName}</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-3 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <img
            src={getAvatar(professional.gender) || getAvatar(3)}
            alt="setting"
            className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
          />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">{professional.firstName} {professional.lastName}</h2>
            <p className="text-xs text-textGray">{professional.email}</p>
            <p className="text-xs">{formatPhoneNumber(professional.phoneNumber)}</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 w-full">
            {professionalTab.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={index}
                className={`
                ${activeTab === tab.id
                    ? ' text-left text-pretty bg-text text-subMain'
                    : ' text-left text-pretty bg-dry text-main hover:bg-text hover:text-subMain'
                  }
                text-xs gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-9 bg-white rounded-xl border-[1px] border-border p-6"
        >
          {tabPanel()}
        </div>
      </div>
    </Layout>
  );
}

export default ProfessionalProfile;
