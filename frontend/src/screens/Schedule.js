import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/Auth';
import Layout from '../Layout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { BiChevronLeft, BiChevronRight, BiPlus, BiTime, BiChevronDown, BiLoaderCircle } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineCalendarDays, HiOutlineBookOpen } from 'react-icons/hi2';
import { getProfessionals } from '../api/ProfessionalsAPI';
import { eventStatus } from '../components/Datas';
import { SelectListBox } from '../components/Form';
import Drawer from 'react-modern-drawer';
import EventsForm from '../components/Forms/EventsForm';
import { getEventsFiltering } from '../api/EventsAPI';
import ViewEventModal from '../components/Modals/ViewEventModal';
import 'moment/locale/pt-br';

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
    { view: 'month', label: 'Mês' },
    { view: 'week', label: 'Semana' },
    { view: 'day', label: 'Dia' },
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
          <span className="text-xl font-semibold text-center">
            {/* {moment(toolbar.date).format('DD MMMM YYYY')}  */}
            {toolbar.view === 'day' && moment(toolbar.date).format(`DD [de] MMMM, YYYY`)}
            {toolbar.view === 'month' && ` ${moment(toolbar.date).startOf('month').format(`DD [de] MMMM, YYYY`)} - ${moment(toolbar.date).endOf('month').format(`DD [de] MMMM, YYYY`)}`}
            {toolbar.view === 'week' && ` ${moment(toolbar.date).startOf('week').format(`DD [de] MMMM, YYYY`)} - ${moment(toolbar.date).endOf('week').format(`DD [de] MMMM, YYYY`)}`}
            {toolbar.view === 'agenda' && ` ${moment(toolbar.date).startOf('week').format(`DD [de] MMMM, YYYY`)} - ${moment(toolbar.date).endOf('month').format(`DD [de] MMMM, YYYY`)}`}
            {/* {toolbar.view === 'agenda' && ` <-> ${moment(toolbar.date).format(`DD [de] MMMM, YYYY`)}`} */}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        {/* filter */}
        <div className="md:col-span-2 grid grid-cols-4 rounded-md  border border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={
                item.view === 'month' ? goToMonth :
                  item.view === 'week' ? goToWeek :
                    item.view === 'day' ? goToDay :
                      goToSchedule === 'schedule' ? goToSchedule : goToSchedule
              }
              className={`border-l text-xl py-2 flex-colo border-subMain ${toolbar.view === item.view
                ? 'bg-subMain text-white'
                : 'text-subMain'
                }`}
            >
              {
                item.view === 'month' ? <HiOutlineCalendarDays /> :
                  item.view === 'week' ? <HiOutlineViewGrid /> :
                    item.view === 'day' ? <BiTime /> :
                      item.view === 'schedule' ? <HiOutlineBookOpen /> : <HiOutlineBookOpen />
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function Schedule() {

  const { user } = useAuth();

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

  const [currentRange, setCurrentRange] = useState(new Date());
  const [currentView, setCurrentView] = useState('week');
  const [start, setStart] = useState(moment().startOf('week').format('DD/MM/YYYY'));
  const [end, setEnd] = useState(moment().endOf('week').format('DD/MM/YYYY'));

  //filter controllers
  const [filterTerm, setFilterTerm] = useState(
    user.roleId === 3 ? { id: user.professionalId, name: user.firstName + ' ' + user.lastName } :
      { id: 0, name: "Todos" }
  );

  const fetchProfessionals = async () => {
    setLoading(true);
    const response = await getProfessionals();
    if (response.status !== 200) {
      setLoading(false);
      return;
    }
    if (response.status === 200) {
      const professionals = response.data;
      const rebaseProfessionalsList = professionals.map((item) => {
        return {
          id: item.id,
          name: item.fullName,
        }
      });
      setProfessionalsList([{ id: 0, name: "Todos" }, ...rebaseProfessionalsList]);

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])


  //customized event
  const WeekEvent = ({ event }) => (
    <div className=''>
      <div className='flex gap-2 items-center justify-between'>
        <p className='text-xs truncate'>{event.eventType <= 3 ? event.serviceName : event.eventType = 4 ? 'Consulta' : 'Retorno'}</p>
        {event.agreementId === 2 ? <div className='text-xs rounded-sm font-bold bg-white text-subMain px-1'>U</div>
          : event.agreementId === 1 ? <div className='text-xs rounded-sm font-bold bg-white text-black px-1'>P</div>
            : <div className='text-xs rounded-sm font-bold bg-white text-subMain px-1'>C</div>}
      </div>
      <div className='flex flex-col '>
        <div className='text-xs truncate font-bold'>{event.professionalFirstName}</div>
        <div className='text-xs truncate italic'>{event.patientFullName}</div>
      </div>
    </div>
  );

  const DayEvent = ({ event }) => (
    <div className=''>
      <div className='flex gap-2 items-center justify-between'>
        <p className='text-xs truncate'>{event.eventType <= 3 ? event.serviceName : event.eventType = 4 ? 'Consulta' : 'Retorno'}</p>
        {event.agreementId === 2 ? <div className='text-xs rounded-sm font-bold bg-white text-subMain px-1'>U</div>
          : event.agreementId === 1 ? <div className='text-xs rounded-sm font-bold bg-white text-black px-1'>P</div>
            : <div className='text-xs rounded-sm font-bold bg-white text-subMain px-1'>C</div>}
      </div>
      <div className='flex flex-col '>
        <div className='text-xs truncate font-bold'>{event.professionalFirstName}</div>
        <div className='text-xs truncate italic'>{event.patientFullName}</div>
      </div>
    </div>
  );



  const fetch = async () => {
    setLoading(true);
    const response = await getEventsFiltering(filterTerm.id, 0, start, end);

    if (response.length === 0) {
      setStatus(false);
      setLoading(false);
      return;
    };
    let rebaseData = response.data.map((item) => {
      return ({
        id: item.id,
        start: moment(item.startTime).toDate(),
        end: moment(item.endTime).toDate(),
        title: item.title,
        //title: `${item.patientName} | ${item.serviceName} | ${item.professionalName} ${}`,
        color: item.eventStatus === 1 ? eventStatus[0].color : eventStatus[1].color,
        ...item
      })
    });

    setEventsData(rebaseData);
    setLoading(false);
  }

  useEffect(() => {
    fetch()
  }, [status, filterTerm])

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

  const onNavigate = useCallback((newDate) => setCurrentRange(newDate), [setCurrentRange]);

  const handleRangeChange = (range, toolbar) => {
    //month view
    if (range.start && range.end) {
      setStart(moment(range.start).format('DD/MM/YYYY'));
      setEnd(moment(range.end).format('DD/MM/YYYY'));
      return;
    }
    //week view
    if (range[0] && range[6]) {
      setStart(moment(range[0]).format('DD/MM/YYYY'));
      setEnd(moment(range[6]).format('DD/MM/YYYY'));
      return
    } else {
      //day view
      setStart(moment(range[0]).format('DD/MM/YYYY'));
      setEnd(moment(range[0]).format('DD/MM/YYYY'));
    }
  }

  useEffect(() => {
    fetch()
  }, [onNavigate, start])

  return (
    <Layout>

      {open && (
        <>
          <Drawer
            open={open}
            onClose={handleClose}
            direction='right'
            size={480}
            zIndex={40}
            enableOverlay={true}
          >
            <EventsForm onClose={handleClose} status={setStatus} isEdit={false} />
          </Drawer>
        </>
      )}
      {
        view && (
          <ViewEventModal
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
      {user.roleId !== 3 &&
        <button
          onClick={handleClose}
          className="w-16 animate-bounce h-16 border border-border z-40 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
        >
          <BiPlus className="text-2xl" />
        </button>
      }

      <div className='flex flex-col gap-6 mb-8'>
        <h1 key={''} className="items-start text-xl font-semibold">Agendamentos</h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className='w-80'>
            <SelectListBox
              label={'Filtrar por Profissional'}
              color={true}
              selectedPerson={filterTerm}
              setSelectedPerson={setFilterTerm}
              disabled={user.roleId === 3}
              datas={professionalsList}
              iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
            />
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
                  {index === eventStatus.length - 1 ? '' : ' |'}
                </div>
              ))}
          </div>
        </div >
      </div>
      {loading ?
        <div className="flex absolute items-center justify-center w-full h-1/2">
          <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
        </div>
        :

        <Calendar
          localizer={localizer}
          events={eventsData}
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
            noEventsInRange: `${eventsData.length === 0 ? 'Não há atendimentos nesta faixa.' : `Só existem atendimentos cadastrados na seguinte faixa: ${moment(eventsData[0].start).format(`DD [de] MMMM, YYYY`)} - ${moment(eventsData[eventsData.length - 1].end).format(`DD [de] MMMM, YYYY`)}`}`,
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
          //defaultDate={new Date(currentRange)}
          date={currentRange}
          onNavigate={onNavigate}
          timeslots={1}
          resizable
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
          components={{
            toolbar: CustomToolbar,
            week: { event: WeekEvent },
            day: { event: DayEvent },
          }}
          onRangeChange={(range) => handleRangeChange(range)}
          // custom view
          views={['month', 'day', 'week', 'agenda']}
          onView={(view) => setCurrentView(view)}
          // default view
          defaultView={currentView}
        />
      }
    </Layout>
  );
}

export default Schedule;
