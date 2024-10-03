import { useState, useEffect } from 'react';
import { HiChevronDoubleRight, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import PatientMedicineServiceModal from '../Modals/PatientMedicineServiceModal';
import { agreements, eventTypes } from '../Datas';
import { BiChevronDown } from 'react-icons/bi';
import { Input, Button, MultiplesDatePickers, TimePickerComp, DatePickerComp, SelectListBox } from '../Form';
import { getPatients } from '../../api/PatientsAPI';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { getServices } from '../../api/ServicesAPI';
import { createEvents, rescheduleEvents } from '../../api/EventsAPI';
import { toast } from 'react-hot-toast';
import { weekDays, timeOptions } from '../Datas';
import 'moment/locale/pt-br';

export default function EventsForm({ datas, onClose, status, isEdit }) {

  const today = new Date();
  today.setHours(6, 0, 0, 0);


  //controllers
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const validWeekDays = weekDays.slice(1, 6);


  //form steps
  const [step1, setStep1] = useState(isEdit ? false : true);
  const [step2, setStep2] = useState(isEdit ? true : false);

  //data
  const [patientsData, setPatientsData] = useState([]);
  const [professionalsData, setProfessionalsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  //input data
  const [service, setService] = useState({ id: 0, name: 'Selecione um Serviço...' });
  const [startDate, setStartDate] = useState(isEdit ? new Date(datas.startTime) : today);
  const [arrayDates, setArrayDates] = useState([{ day: 1, time: today }]);
  const [arrayWeekDays, setArrayWeekDays] = useState([weekDays[1]]);
  const [arrayTimes, setArrayTimes] = useState([]);
  const [patient, setPatient] = useState({ id: 0, fullName: 'Selecione um Paciente...' });
  const [professional, setProfessional] = useState({ id: 0, name: 'Selecione um Profissional...' });
  const [agreement, setAgreement] = useState({ id: 0, name: 'Selecione alguma opção...' });
  const [eventType, setEventType] = useState(isEdit ? eventTypes[datas.eventType - 1] : { id: 0, name: 'Selecione uma opção...' },
  );
  const [eventsQty, setEventsQty] = useState(isEdit ? datas.eventsQty : 1)
  const [eventsPerWeek, setEventsPerWeek] = useState(isEdit && datas.eventType <= 2 ? timeOptions[datas.timecodes.length - 1] : timeOptions[0]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [componentsArrayDatePickers, setComponentsArrayDatePickers] = useState([]);


  //popuplate professionals and patients selectors
  const fetch = async () => {
    setLoading(true)
    const patientsResponse = await getPatients()
    const professionalsResponse = await getProfessionals()
    const servicesResponse = await getServices()

    setPatientsData(patientsResponse)
    setProfessionalsData(professionalsResponse)
    setServicesData(servicesResponse)
    setFilteredServices(servicesResponse)
    setLoading(false)

  }
  useEffect(() => {
    fetch()
  }, [])

  //rebuild array of professionals to be accepted by SelectListBox
  const arrayProfessionals = professionalsData.map((professional) => {
    return { id: professional.id, name: professional.summary, specialtyId: professional.specialty }
  })

  //updatge services dropdown based on selected professional
  useEffect(() => {
    if (professional.id !== 0) {
      const arrayServices = servicesData.filter(service => service.specialtyId === professional.specialtyId)
      setFilteredServices(arrayServices)
      setService({ id: 0, name: 'Selecione um Serviço...' })
    }
  }, [professional, servicesData])

  //Save event
  const handleSave = async () => {
    setLoading(true);
    if (isEdit) {
      const data = {
        eventInstanceId: datas.eventInstanceId,
        eventType: datas.eventType,
        startDate: startDate,
        agreementId: datas.agreementId,
        eventsPerWeek: eventsPerWeek.id,
        eventsQty: Number(eventsQty),
        timecodes: arrayDates
      };

      const response = await rescheduleEvents(data, datas.id);

      if (response.code) {
        toast.error('Erro ao criar agendamento');
        setLoading(false);
        return
      }

      toast.success('Agendamento realizado com sucesso!');
      status(true);
      setLoading(false);
      onClose();
      return
    }

    const data = {
      patientId: patient.id,
      professionalId: professional.id,
      startDate: startDate,
      serviceId: (eventType === 4 || eventType === 5 || service.id === 0) ? null : service.id,
      agreementId: agreement.id,
      eventType: eventType.id,
      eventsPerWeek: eventsPerWeek.id,
      eventsQty: Number(eventsQty),
      timecodes: arrayDates
    };

    const response = await createEvents(data);

    if (response.code) {
      toast.error('Erro ao criar agendamento');
      setLoading(false);
      return
    }

    toast.success('Agendamento realizado com sucesso!');
    status(true);
    setLoading(false);
    onClose();
  }

  //Change drawer step
  const handleChangeStep = () => {
    if (isEdit) {
      onClose()
      return
    }
    //Prevent default
    if (professional.id === 0 || patient.id === 0 || eventType.id === 0) {
      toast.error('Preencha todos os campos');
      return;
    } else {
      if (eventType.id < 4 && (agreement.id === 0 || service.id === 0)) {
        toast.error('Preencha todos os campos');
        return;
      }
    }

    if (step2) {
      setStep2(false);
      setStep1(true);
    } else {
      setStep1(false);
      setStep2(true);
    }
  }

  //Update number of events
  const handleNumEventsChange = () => {
    const num = parseInt(eventsPerWeek.id, 10);

    // Reseta o array de eventos ao mudar o número de eventos
    setArrayDates(Array(num).fill({ day: 1, time: today }));
    setArrayWeekDays(Array(num).fill(weekDays[1]));
    setArrayTimes(Array(num).fill(today));

    if (isEdit && datas.eventType <= 2) {
      updateArrays()
      return
    }
  };

  //Update number of events and reset arrays when changing eventsPerWeek
  useEffect(() => {
    handleNumEventsChange();

    //ensure eventsQty minimum must be eventsPerWeek
    if (eventsQty < eventsPerWeek.id) {
      setEventsQty(eventsPerWeek.id)
    }
  }, [eventsPerWeek])

  //Build Array of datepickers based on eventsPerWeek
  useEffect(() => {
    buildArray();
  }, [arrayWeekDays, arrayTimes])

  //if isEdit, update arrays based on datas
  const updateArrays = () => {
    let newArrayWeekDays = [];
    let newArrayTimes = [];
    for (let index = 0; index < eventsPerWeek.id; index++) {
      newArrayWeekDays.push(datas.timecodes[index] ? weekDays[datas.timecodes[index].day] : weekDays[1]);
      newArrayTimes.push(datas.timecodes[index] ? datas.timecodes[index].time : today);
    }
    setArrayWeekDays(newArrayWeekDays);
    setArrayTimes(newArrayTimes);
  }

  //update array of dates based on weekDays and times  
  useEffect(() => {
    let updatedDates = [...arrayDates];

    for (let i = 0; i < eventsPerWeek.id; i++) {
      if (!arrayWeekDays[i] || !arrayTimes[i]) {
        return
      }
      updatedDates[i] = {
        day: arrayWeekDays[i].id,
        time: arrayTimes[i]
      }
    }
    setArrayDates(updatedDates)
  }, [arrayWeekDays, arrayTimes])

  //Update array of weekDays
  const handleAddWeekDay = (weekDay, index) => {
    const newArray = [...arrayWeekDays];
    newArray[index] = weekDay;
    setArrayWeekDays(newArray);
  }

  //Update array of times
  const handleAddTime = (time, index) => {
    const newArray = [...arrayTimes];
    newArray[index] = time;
    setArrayTimes(newArray);
  }

  //Reset form step 2 when changing eventType
  useEffect(() => {
    if (!isEdit) {
      setEventsPerWeek({ id: 1, name: '1x' });
      setEventsQty(1);
      setStartDate(today);
    }
  }, [eventType])


  //Create array of DatePickers based on eventsPerWeek
  const buildArray = () => {
    let arrayDatePickers = [];
    for (let i = 0; i < eventsPerWeek.id; i++) {
      arrayDatePickers.push(
        <div className='flex flex-initial gap-3' key={i}>
          <div className="flex w-full flex-col gap-3 ">
            <SelectListBox
              color={true}
              selectedPerson={arrayWeekDays[i]}
              setSelectedPerson={
                (weekDay) => {
                  handleAddWeekDay(weekDay, i)
                }
              }
              datas={validWeekDays}
              loading={loading}
              iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
            />
          </div>
          <div className="flex w-[30%]">
            <TimePickerComp
              key={i}
              startDate={arrayTimes[i] ? new Date(arrayTimes[i]) : new Date(today)}
              showTimeSelect={true}
              minDate={new Date()}
              color={'red-600'}
              placeholderText={"Selecionar data"}
              locale={'pt-BR'}
              onChange={(time) => {
                handleAddTime(time, i)
              }}
              value={arrayTimes[i] ? arrayDates[i].time : ''}
            />
          </div>
        </div>
      );
    }
    setComponentsArrayDatePickers(arrayDatePickers);
  }

  return (
    loading ? <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-subMain"></div>
    </div> :
      <>
        {openModal && (
          <PatientMedicineServiceModal
            closeModal={() => setOpenModal(!openModal)}
            isOpen={openModal}
            data={patientsData}
            setPatient={setPatient}
            patient={patient}
          />
        )}
        <div className='relative h-full z-50 grid grid-cols-1'>

          {/* Header */}
          <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
            <h1 className="text-md font-semibold">{isEdit ? "Editar Agendamento" : "Novo Agendamento"}</h1>
            <button
              onClick={onClose}
              className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
            {step1 ?
              <>
                {/* Professional */}
                <div className={`flex w-full flex-col`}>
                  <>
                    <SelectListBox
                      label={'Profissional'}
                      color={true}
                      selectedPerson={professional}
                      setSelectedPerson={setProfessional}
                      datas={arrayProfessionals}
                      loading={loading}
                      iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                    />
                  </>
                </div>

                {/* Patient */}
                <div className="flex gap-4">
                  <div className='flex w-full flex-col gap-2 '>

                    <p className="text-black text-sm">Pacientes</p>
                    <div className='flex gap-4'>
                      <div className="flex w-full p-4 text-black text-sm border border-border font-light rounded-lg cursor-pointer" onClick={() => setOpenModal(!openModal)}>
                        {patient.fullName ? patient.fullName : 'Selecione o paciente...'}
                      </div>
                      <div >
                        <Button
                          label="Selecionar"
                          onClick={() => setOpenModal(!openModal)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Type */}
                <div className="flex w-full flex-col gap-1 ">
                  <SelectListBox
                    label={'Tipo de Agendamento'}
                    color={true}
                    selectedPerson={eventType}
                    setSelectedPerson={setEventType}
                    datas={eventTypes}
                    loading={loading}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>

                {/* Agreement */}
                <div className={`flex w-full flex-col gap-1 ${(eventType.id === 0 || eventType.id === 5) ? 'invisible' : ''}`}>

                  <SelectListBox
                    label={'Convênio'}
                    color={true}
                    selectedPerson={agreement}
                    setSelectedPerson={setAgreement}
                    datas={agreements.agreement}
                    loading={loading}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>

                {/* Service */}
                <div className={`flex w-full flex-col gap-1 ${(professional.id === 0 || eventType.id === 0 || eventType.id === 4 || eventType.id === 5) ? 'invisible' : ''}`}>
                  <SelectListBox
                    label={'Serviço'}
                    color={true}
                    selectedPerson={service}
                    setSelectedPerson={setService}
                    datas={filteredServices}
                    loading={loading}
                    iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                  />
                </div>
              </>
              :
              <>
                {eventType.id < 3 &&
                  <>
                    <div div className="flex w-full flex-col gap-1 ">
                      <p className="text-black text-sm">Data de início</p>
                      <DatePickerComp
                        color={true}
                        scrollableYearDropdown={true}
                        closeOnScroll={true}
                        popperPlacement="top-end"
                        dateFormat="dd/MM/yyyy"
                        placeholderText={'__/__/____'}
                        locale="pt"
                        startDate={startDate}
                        onChange={(date) => {
                          setStartDate(date)
                          // setIsDisabled(false)
                        }}
                      />
                    </div>

                    {/* Events Qty */}
                    <div div className="flex w-full flex-col gap-1 ">
                      <SelectListBox
                        label={'Quantos Agendamentos por Semana?'}
                        color={true}
                        selectedPerson={eventsPerWeek}
                        setSelectedPerson={setEventsPerWeek}
                        datas={timeOptions}
                        loading={loading}
                        iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
                      />
                    </div>
                  </>
                }
                {eventType.id === 2 &&
                  <Input
                    label="Quantidade de Agendamentos Totais"
                    color={true}
                    disabled={isEdit}
                    type='number'
                    max='50'
                    value={eventsQty}
                    onChange={(e) => {
                      e.target.value > 50 ? setEventsQty(50) : setEventsQty(e.target.value);
                    }}
                  />
                }
                {/* date */}
                {eventType.id < 3 && componentsArrayDatePickers}

                {
                  eventType.id >= 3 &&
                  <div className="flex w-full flex-col gap-1 ">
                    <p className="text-black text-sm">Data do agendamento</p>
                    <div className='flex  w-full    bg-white text-sm border items-center border-border font-light rounded-lg focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain'>
                      <div className='px-4'>
                        <MultiplesDatePickers
                          showTimeSelect={true}
                          minDate={today}
                          color={'red-600'}
                          dateFormat={'dd/MM/yyyy - hh:mm aa'}
                          placeholderText={"Selecionar data"}
                          locale={'pt-BR'}
                          startDate={startDate}
                          onChange={(date) => {
                            setStartDate(date)
                            // setIsDisabled(false)
                          }}
                        />
                      </div>
                      <div className='w-full h-full p-4 bg-gray-50 border-l cursor-default'>
                        <p className='text-md font-light capitalize text-gray-400 bg-gray-50 '>
                          {weekDays[startDate.getDay()].name}
                        </p>
                      </div>
                    </div>
                  </div>
                }
              </>
            }
          </div >

          {/* Footer */}
          <div className="fixed flex inset-x-0 bottom-0 p-4 " >
            <div className='flex gap-4 items-end w-full'>
              {step1 ?

                <div className="grid sm:grid-cols-2 gap-4 w-full">

                  <button
                    onClick={onClose}
                    className="flex-1  bg-red-600 bg-opacity-5 border-red-600 text-red-600 text-sm px-2 py-4 rounded font-light"
                  >
                    <>
                      {'Cancelar'}
                    </>
                  </button>
                  <Button
                    label="Proximo"
                    Icon={HiChevronDoubleRight}
                    onClick={() => handleChangeStep()}
                    className="flex-1"
                  />
                </div>
                :
                <div className="grid sm:grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => handleChangeStep()}
                    className="flex-1  bg-red-600 bg-opacity-5 border-red-600 text-red-600 text-sm px-2 py-4 rounded font-light"
                  >
                    <>
                      {isEdit ? 'Cancelar' : 'Voltar'}
                    </>
                  </button>

                  <Button
                    label={isEdit ? "Editar" : "Salvar"}
                    Icon={HiOutlineCheckCircle}
                    onClick={() => handleSave()}
                    loading={loading}
                    className="flex-1"
                  />
                </div>}
            </div>
          </div>
        </div >
      </>
  );

}