import { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { BiLoaderCircle } from 'react-icons/bi';
import ChangePassword from '../../components/UsedComp/ChangePassword';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import PatientsUsed from '../../components/UsedComp/PatientsUsed';
import AppointmentsUsed from '../../components/UsedComp/AppointmentsUsed';
import { eventsTab } from '../../components/Datas';
import PaymentsUsed from '../../components/UsedComp/PaymentUsed';
import InvoiceUsed from '../../components/UsedComp/InvoiceUsed';
import Access from '../../components/Access';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../api/EventsAPI';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsPatientInfo from './EventDetailsPatientInfo';
import EventDetailsProfessionalInfo from './EventDetailsProfessionalInfo';
import EventDetailsReminder from './EventDetailsReminder';


function EventDetails() {

  //controllers
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [access, setAccess] = useState({});
  const [eventData, setEventData] = useState({});
  const [status, setStatus] = useState(false);

  const { id } = useParams()

  const fetch = async () => {
    setLoading(true);
    const response = await getEventById(id)
    if (response.data.error === 1) {
      setLoading(false);
      return
    }
    setEventData(response.data[0])
    setLoading(false)

    console.log(eventData)
  }

  useEffect(() => {
    fetch()
    setStatus(false)
  }, [])

  const onStatus = (newStatus) => {
    setStatus(newStatus)
  }

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <EventDetailsInfo data={eventData} onStatus={onStatus} />;
      case 2:
        return <EventDetailsPatientInfo />;
      case 3:
        return <EventDetailsProfessionalInfo doctor={true} />;
      case 4:
        return <EventDetailsReminder doctor={true} />;
      default:
        return;
    }
  };

  return (
    loading ?
      <div className="flex absolute items-center justify-center w-full h-1/2">
        <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
      </div>
      :
      <Layout>
        <div className="flex items-center gap-4">
          <Link
            to="/schedule"
            className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
          >
            <IoArrowBackOutline />
          </Link>
          <h1 className="text-xl font-semibold">{eventData.serviceName}</h1>
        </div>
        <div className=" grid grid-cols-12 gap-6 my-8 items-start">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
          >

            <div className="gap-2 flex-colo">
              <h2 className="text-md font-semibold">{eventData.professionalFirstName} {eventData.professionalLastName}</h2>
              <h2 className="text-sm text-textGray">{eventData.patientFullName}</h2>
              <h2 className="text-md">{formatDate(eventData.startTime)} - {formatDateTime(eventData.startTime)}</h2>
            </div>
            {/* tabs */}
            <div className="flex-colo gap-3   w-full">
              {eventsTab.map((tab, index) => (
                <button
                  onClick={() => setActiveTab(tab.id)}
                  key={index}
                  className={`
                ${activeTab === tab.id
                      ? 'bg-text text-subMain'
                      : 'bg-dry text-main hover:bg-text hover:text-subMain'
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
            className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
          >
            {tabPanel()}
          </div>
        </div>
      </Layout>
  );
}

export default EventDetails;
