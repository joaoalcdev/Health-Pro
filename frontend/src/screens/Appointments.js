import { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { BiChevronLeft, BiChevronRight, BiPlus, BiTime } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import AddAppointmentModal from '../components/Modals/AddApointmentModal';
import { servicesData } from '../components/Datas';
import { listAppointments } from '../api/AppointmentsAPI';

// custom toolbar
const CustomToolbar = (toolbar) => {
  // today button handler
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  // next button handler
  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  // today button handler
  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  // month button handler
  const goToMonth = () => {
    toolbar.onView('month');
  };

  // week button handler
  const goToWeek = () => {
    toolbar.onView('week');
  };

  // day button handler
  const goToDay = () => {
    toolbar.onView('day');
  };

  // view button group
  const viewNamesGroup = [
    { view: 'month', label: 'Mês' },
    { view: 'week', label: 'Semana' },
    { view: 'day', label: 'Dia' },
  ];

  return (
    <div className="flex flex-col gap-8 mb-8">
      <h1 className="text-xl font-semibold">Atendimentos</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4">
        <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
          <button
            onClick={goToCurrent}
            className="px-6 py-2 border border-subMain rounded-md text-subMain"
          >
            Today
          </button>
        </div>
        {/* label */}
        <div className="md:col-span-9 flex-rows gap-4">
          <button onClick={goToBack} className="text-2xl text-subMain">
            <BiChevronLeft />
          </button>
          <span className="text-xl font-semibold">
            {moment(toolbar.date).format('MMMM YYYY')}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        {/* filter */}
        <div className="md:col-span-2 grid grid-cols-3 rounded-md  border border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={
                item.view === 'month'
                  ? goToMonth
                  : item.view === 'week'
                    ? goToWeek
                    : goToDay
              }
              className={`border-l text-xl py-2 flex-colo border-subMain ${toolbar.view === item.view
                ? 'bg-subMain text-white'
                : 'text-subMain'
                }`}
            >
              {item.view === 'month' ? (
                <HiOutlineViewGrid />
              ) : item.view === 'week' ? (
                <HiOutlineCalendarDays />
              ) : (
                <BiTime />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function Appointments() {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(true);
  const [eventsData, setEventsData] = useState([])

  const fetch = async () => {
    const response = await listAppointments()
    if (response.length === 0) {
      return
    }
    var rebaseData = response.data.map((item) => {
      return {
        id: item.id,
        start: moment(item.startTime).toDate(),
        end: moment(item.endTime).toDate(),
        title: item.title,
        color: '#66B5A3',
        // ...item
      }
    })
    setEventsData(rebaseData)
    console.log("eventsData", eventsData)
    setStatus(false)
  }

  useEffect(() => {
    fetch()
  }, [status])


  // handle modal close
  const handleClose = () => {
    setOpen(!open);
    setData({});
  };

  const events = [
    {
      id: 0,
      start: moment({ day: 28, hours: 9 }).toDate(),
      end: moment({ day: 28, hours: 10 }).toDate(),
      //color: '#FB923C',
      title: `Mateus Gondim | Fonoaudiologia | Mateus`,
      //message: 'He is not sure about the time',
      // service: servicesData[1],
      // shareData: {
      //   email: true,
      //   sms: true,
      //   whatsapp: false,
      // },
    },
    {
      id: 1,
      start: moment({ day: 31, hours: 13 }).toDate(),
      end: moment({ day: 31, hours: 14 }).toDate(),
      color: '#FC8181',
      title: `Taynara Gondim | Fonoaudiologia | Mateus`,
      message: 'She is coming for checkup',
      service: servicesData[2],
      shareData: {
        email: false,
        sms: true,
        whatsapp: false,
      },
    },

    {
      id: 2,
      start: moment({ hours: 14 }).toDate(),
      end: moment({ hours: 17 }).toDate(),
      color: '#FFC107',
      title: 'Irene P. Smith',
      message: 'She is coming for checkup. but she is not sure about the time',
      service: servicesData[3],
      shareData: {
        email: true,
        sms: true,
        whatsapp: true,
      },
    },
    {
      id: 3,
      start: moment({ day: 28, hours: 7, minutes: 30 }).toDate(),
      end: moment({ day: 28, hours: 9 }).toDate(),
      color: '#FFC107',
      title: 'Junior Gondim',
      message: 'He is not sure about the time',
      service: servicesData[1],
      shareData: {
        email: true,
        sms: true,
        whatsapp: false,
      },
    },
  ];

  console.log("events", events)
  // onClick event handler
  const handleEventClick = (event) => {
    setData(event);
    setOpen(!open);
  };

  return (
    <Layout>
      {open && (
        <AddAppointmentModal
          datas={data}
          isOpen={open}
          status={setStatus}
          closeModal={() => {
            handleClose();
          }}
        />
      )}
      {/* calender */}
      <button
        onClick={handleClose}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>

      <Calendar
        localizer={localizer}
        events={eventsData ? eventsData : events}
        startAccessor="start"
        endAccessor="end"
        style={{
          // height fix screen
          height: 900,
          marginBottom: 50,
        }}
        onSelectEvent={(event) => handleEventClick(event)}
        defaultDate={new Date()}
        timeslots={1}
        resizable
        step={30}
        selectable={true}
        // custom event style
        eventPropGetter={(event) => {
          const style = {
            backgroundColor: '#66B5A3',
            borderRadius: '10px',
            color: 'white',
            border: '1px solid',
            //borderColor: '#000000',
            //shadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.1)',
            fontSize: '12px',
            padding: '5px 5px',
          };
          return {
            style,
          };
        }}
        // custom date style
        dayPropGetter={(date) => {
          const backgroundColor = 'white';
          const style = {
            backgroundColor,
          };
          return {
            style,
          };
        }}
        // remove agenda view
        views={['month', 'day', 'week']}
        // toolbar={false}
        components={{ toolbar: CustomToolbar }}
      />
    </Layout>
  );
}

export default Appointments;
