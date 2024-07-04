import { useState, useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { BiChevronLeft, BiChevronRight, BiPlus, BiTime, BiChevronDown, BiLoaderCircle } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineCalendarDays, HiOutlineBookOpen } from 'react-icons/hi2';
import { getProfessionalById, getProfessionals } from '../../api/ProfessionalsAPI';
import { eventTypes, eventStatus } from '../Datas';
import { FilterSelect } from '../Form';
import Drawer from 'react-modern-drawer';
import EventsForm from '../Forms/EventsForm';
import { getEventsFiltering, listEvents } from '../../api/EventsAPI';
import ViewAppointmentModal from '../Modals/ViewAppointmentModal';
import 'moment/locale/pt-br';
import { useParams } from 'react-router-dom';

// custom toolbar
const CustomToolbar = (toolbar) => {

  // go to back handler
  const goToBack = () => {
    if (toolbar.view === 'month') {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate('prev');
    } else if (toolbar.view === 'week') {
      toolbar.date.setDate(toolbar.date.getDate() - 7);
      toolbar.onNavigate('prev');
    } else if (toolbar.view === 'day') {
      toolbar.date.setDate(toolbar.date.getDate() - 1);
      toolbar.onNavigate('prev');
    } else if (toolbar.view === 'agenda') {
      toolbar.date.setDate(toolbar.date.getDate() - 7);
      toolbar.onNavigate('next');
    } else {
      toolbar.date.setDate(toolbar.date.getDate() - 1);
      toolbar.onNavigate('prev');
    }
  };

  // go to next handler
  const goToNext = () => {
    if (toolbar.view === 'month') {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate('next');
    } else if (toolbar.view === 'week') {
      toolbar.date.setDate(toolbar.date.getDate() + 7);
      toolbar.onNavigate('next');
    } else if (toolbar.view === 'day') {
      toolbar.date.setDate(toolbar.date.getDate() + 1);
      toolbar.onNavigate('next');
    } else if (toolbar.view === 'agenda') {
      toolbar.date.setDate(toolbar.date.getDate() + 7);
      toolbar.onNavigate('next');
    } else {
      toolbar.date.setDate(toolbar.date.getDate() + 1);
      toolbar.onNavigate('next');
    }
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

  const goToSchedule = () => {
    toolbar.onView('agenda');
  };

  // view button group
  const viewNamesGroup = [
    // { view: 'month', label: 'Mês' },
    { view: 'week', label: 'Semana' },
    // { view: 'day', label: 'Dia' },
    { view: 'agenda', label: 'Agenda' }
  ];

  return (
    <div className="flex flex-col gap-4 mb-8">

      <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4">
        <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
          <button
            onClick={goToCurrent}
            className="px-6 py-2 border border-subMain rounded-md text-subMain"
          >
            Hoje
          </button>
        </div>
        {/* label */}
        <div className="md:col-span-9 flex-rows gap-4">
          <button onClick={goToBack} className="text-2xl text-subMain">
            <BiChevronLeft />
          </button>
          <span className="text-xl font-semibold select-none hover:cursor-text">
            {/* {moment(toolbar.date).format('DD MMMM YYYY')}  */}
            {/* {toolbar.view === 'day' && moment(toolbar.date).format(`DD [de] MMMM, YYYY`)} */}
            {/* {toolbar.view === 'month' && ` ${moment(toolbar.date).startOf('month').format(`DD [de] MMMM, YYYY`)} - ${moment(toolbar.date).endOf('month').format(`DD [de] MMMM, YYYY`)}`} */}
            {toolbar.view === 'week' && ` ${moment(toolbar.date).startOf('week').format(`DD [de] MMMM, YYYY`)} - ${moment(toolbar.date).endOf('week').format(`DD [de] MMMM, YYYY`)}`}
            {toolbar.view === 'agenda' && ` ${moment(toolbar.date).startOf('week').format(`DD [de] MMMM, YYYY`)} - ${moment(toolbar.date).endOf('month').format(`DD [de] MMMM, YYYY`)}`}
            {/* {toolbar.view === 'agenda' && ` <-> ${moment(toolbar.date).format(`DD [de] MMMM, YYYY`)}`} */}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        {/* filter */}
        <div className="md:col-span-2 grid grid-cols-2 rounded-md  border border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={
                // item.view === 'month' ? goToMonth :
                item.view === 'week' ? goToWeek :
                  // item.view === 'day' ? goToDay :
                  goToSchedule === 'schedule' ? goToSchedule : goToSchedule
              }
              className={`border-l text-xl py-2 flex-colo border-subMain ${toolbar.view === item.view
                ? 'bg-subMain text-white'
                : 'text-subMain'
                }`}
            >
              {
                // item.view === 'month' ? <HiOutlineCalendarDays /> :
                item.view === 'week' ? <HiOutlineViewGrid /> :
                  // item.view === 'day' ? <BiTime /> :
                  item.view === 'schedule' ? <HiOutlineBookOpen /> : <HiOutlineBookOpen />
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function ScheduleUsed() {

  // config timezone
  moment.locale('pt-br');

  const [loading, setLoading] = useState(false);

  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [professionalsList, setProfessionalsList] = useState([]);
  const [professional, setProfessional] = useState({});

  // get professional on URL params
  const { id } = useParams();
  const professionalId = id;

  // get professional name


  //filter controllers
  const [filterTerm, setFilterTerm] = useState({ id: professionalId, name: 'Todos' });

  // const { id } = useParams()

  const fetchProfessionalsByID = async () => {
    await getProfessionalById(id).then(response => {
      setProfessional(response[0])
    })
  }

  useEffect(() => {
    fetchProfessionalsByID()
    setStatus(false)
  }, [id, status])


  const fetchProfessionals = async () => {
    setLoading(true);
    const response = await getProfessionals();
    if (response.length === 0) {
      setLoading(false);
      return;
    };

    var rebaseProfessionalsList = response.map((item) => {
      return {
        id: item.id,
        name: item.firstName + ' ' + item.lastName,
      }
    })

    setProfessionalsList(rebaseProfessionalsList);
    setLoading(false);
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const fetch = async () => {
    setLoading(true);
    if (filterTerm.id !== 0) {
      const response = await getEventsFiltering(filterTerm.id, 0);
      if (response.length === 0) {
        setStatus(false);
        setLoading(false);
        return;
      };
      let rebaseData = response.data.map((item) => {
        return {
          id: item.id,
          start: moment(item.startTime).toDate(),
          end: moment(item.endTime).toDate(),
          title: item.title,
          color: item.eventStatus === 1 ? eventStatus[0].color : eventStatus[1].color,
          ...item
        }
      })

      console.log(rebaseData)
      setEventsData(rebaseData)
      setStatus(false)
      setLoading(false);
      return
    }

    if (filterTerm.id === 0) {
      const response = await listEvents();
      if (response && response.length === 0) {
        setStatus(false);
        setLoading(false);
        return;
      };

      if (filterTerm.id === getProfessionalById.id) {
        const response = await getEventsFiltering(filterTerm.id, 0);
        if (response.length === 0) {
          setStatus(false);
          setLoading(false);
          return;
        }
      }


      let rebaseData = response.data.map((item) => {
        return {
          id: item.id,
          start: moment(item.startTime).toDate(),
          end: moment(item.endTime).toDate(),
          title: item.title,
          color: item.eventStatus === 1 ? eventStatus[0].color : eventStatus[1].color,
          ...item
        }
      })
      setEventsData(rebaseData)
      setStatus(false)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch()
  }, [status, filterTerm])

  // useEffect(() => {
  //   console.log(eventsData)
  // }, [data])


  // handle modal close
  const handleClose = () => {
    setOpen(!open);
    setData({});
  };


  // onClick event handler
  const handleEventClick = (event) => {
    setData(event);
    setView(!view);
  };

  const onStatus = (status) => {
    setStatus(status);
  }

  const DrawerBody = () => {
    return (
      <div style={{ padding: 20 }}>
        <h1 style={{ fontWeight: 'bold' }}>Hello World! 🚀🥳</h1>
      </div>
    )
  }

  return (

    <>
      {open && (
        <>
          <Drawer
            open={open}
            onClose={handleClose}
            direction='right'
            size={460}
            zIndex={50}
            enableOverlay={true}
          >
            <EventsForm onClose={handleClose} status={setStatus} />
          </Drawer>


          {/* <AddAppointmentModal
            datas={data}
            isOpen={open}
            status={onStatus}
            closeModal={() => {
              handleClose();
            }}

          /> */}
        </>
      )}
      {
        view && (
          <ViewAppointmentModal
            datas={data}
            isOpen={view}
            status={onStatus}
            closeModal={() => {
              setView(!view);
            }}
          />
        )
      }
      {/* calender */}
      {/* <button
        onClick={handleClose}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button> */}

      <div className='flex flex-col gap-6 mb-8'>

        <h1 key={''} className="items-start text-xl font-semibold">Agendamentos</h1>

        <div className="flex items-center justify-between">
          <div className='w-80'>
            {/* <FilterSelect
              selectedPerson={filterTerm}
              setSelectedPerson={setFilterTerm}
              datas={professionalsList}
            >
              <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                <p>{filterTerm.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </FilterSelect> */}
            <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
              <p className="">Agenda: <span className='text-subMain'>{professional.fullName}</span></p>
              {/* <BiChevronDown className="text-xl" /> */}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="text-xs font-semibold">Legenda:</h1>
            {
              eventStatus.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className='text-xs'>{item.name}</span>
                  {index === eventTypes.length - 1 ? '' : ' |'}
                </div>
              ))}
          </div>
        </div >
      </div>
      {loading ?
        <div className="flex relative w-full h-1/2 top-20 justify-center items-center"> {/* resolve style: generating scroll x = flex absolute items-center justify-center w-full h-1/2*/}
          <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
        </div>
        :

        <>
          <Calendar
            localizer={localizer}
            events={eventsData ? eventsData : {}}
            startAccessor="start"
            endAccessor="end"
            messages={{
              next: 'Próximo',
              previous: 'Anterior',
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
              agenda: 'Agenda',
              date: 'Data',
              time: 'Hora',
              noEventsInRange: `${eventsData.length === 0 ? 'Você não possui atendimentos atendimentos.' : `Só existem atendimentos cadastrados na seguinte faixa: ${moment(eventsData[0].start).format(`DD [de] MMMM, YYYY`)} - ${moment(eventsData[eventsData.length - 1].end).format(`DD [de] MMMM, YYYY`)}`}`,
              event: 'Paciente | Serviço | Profissional',
              allDay: 'Dia todo',
              showMore: (total) => `+ ${total} mais`,
            }}
            style={{
              // height fix screen
              height: '85vh',
              marginBottom: 20,
            }}
            onSelectEvent={(event) => handleEventClick(event)}
            defaultDate={new Date()}
            resizable
            timeslots={1}
            step={15}
            selectable={false}
            min={new Date(2024, 0, 1, 6, 0)}
            max={new Date(2040, 0, 1, 22, 0)}
            filterTime={date => (date.getHours() > 5 && date.getHours() < 11) || (date.getHours() > 13 && date.getHours() < 20)}
            // custom event style
            eventLayout="overlap"
            eventPropGetter={(event) => {
              const style = {
                backgroundColor: event.color, // color of event
                borderRadius: '4px',
                color: event.eventStatus === 1 ? 'black' : 'white',
                border: '1px solid',
                borderColor: 'white',
                shadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                padding: '5px 5px',
                
              };
              return {
                style,
              };
            }}
            // custom date style
            dayLayout="overlap"
            dayPropGetter={(date) => {
              const style = {
                backgroundColor: 'white',
              };
              return {
                style,
              };
            }}
            // custom toolbar
            toolbar={true}
            components={{ toolbar: CustomToolbar }}
            // custom view
            views={['month', 'day', 'week', 'agenda']}
            // default view
            defaultView="week"
          />
        </>
      }
    </>
  );
}

export default ScheduleUsed;
