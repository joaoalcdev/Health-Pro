import { useState, useEffect } from 'react';
import { HiChevronDoubleRight, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import PatientMedicineServiceModal from '../Modals/PatientMedicineServiceModal';
import { specialties, agreements, eventTypes } from '../Datas';
import { BiChevronDown } from 'react-icons/bi';
import { Select, SelectProfessional, Input, Button, MultiplesDatePickers, TimePickerComp, DatePickerComp, SelectListBox } from '../Form';
import { getPatients } from '../../api/PatientsAPI';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { getServices } from '../../api/ServicesAPI';
import { getSpecialties } from '../../api/specialtiesAPI';
import { createEvents, rescheduleEvents } from '../../api/EventsAPI';
import { toast } from 'react-hot-toast';
import { weekDays, timeOptions } from '../Datas';
import 'moment/locale/pt-br';
import { set } from 'rsuite/esm/internals/utils/date';

export default function EventsForm({ datas, onClose, status, isEdit }) {

  const today = new Date();
  today.setHours(6, 0, 0, 0);


  //controllers
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const validWeekDays = weekDays.slice(1, 6);


  //form steps
  const [step1, setStep1] = useState(isEdit ? false : true);
  const [step2, setStep2] = useState(isEdit ? true : false);

  //data
  const [patientsData, setPatientsData] = useState([]);
  const [professionalsData, setProfessionalsData] = useState([]);
  const [specialtiesData, setSpecialtiesData] = useState([]);
  const [professionalsData2, setProfessionalsData2] = useState([]);

  const [servicesData, setServicesData] = useState([]);

  //input data
  const [service, setService] = useState({ id: 0, name: 'Selecione um Serviço...' });
  const [startDate, setStartDate] = useState(isEdit ? new Date(datas.startTime) : today);
  const [arrayDates, setArrayDates] = useState([{ day: 1, time: today }]);
  const [arrayWeekDays, setArrayWeekDays] = useState([]);
  const [arrayTimes, setArrayTimes] = useState([]);
  const [patient, setPatient] = useState({ id: 0, fullName: 'Selecione um Paciente...' });
  const [professional, setProfessional] = useState({ id: 0, name: 'Selecione um Profissional...' });
  const [agreement, setAgreement] = useState({ id: 0, name: 'Selecione alguma opção...' });
  const [eventType, setEventType] = useState(isEdit ? eventTypes[datas.eventType - 1] : { id: 0, name: 'Selecione uma opção...' },
  );
  const [eventsQty, setEventsQty] = useState(isEdit ? datas.eventsQty : 1)
  const [eventsPerWeek, setEventsPerWeek] = useState(isEdit && datas.eventType <= 2 ? timeOptions[datas.timecodes.length - 1] : timeOptions[0]);



  //popuplate professionals and patients selectors
  const fetch = async () => {
    setLoading(true)
    const patientsResponse = await getPatients()
    const professionalsResponse = await getProfessionals()

    setPatientsData(patientsResponse)
    setProfessionalsData(professionalsResponse)
    setLoading(false)

  }
  useEffect(() => {
    fetch()
  }, [])

  const arrayProfessionals = professionalsData.map((professional) => {
    return { id: professional.id, name: professional.summary, specialtyId: professional.specialty }
  }
  )

  //Populate services selector based on professional specialty
  const fetchServicesBySpecialtyId = async (specialtyId) => {
    const servicesResponse = await getServices(true, specialtyId)
    setServicesData(servicesResponse)
  }
  useEffect(() => {
    fetchServicesBySpecialtyId(professional.specialtyId)
  }, [professional])

  //Save event
  const handleSave = async () => {
    setLoading(true);
    if (isEdit) {
      console.log("edit", arrayDates)
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

  //ensure eventsQty minimum must be eventsPerWeek
  useEffect(() => {
    if (eventsQty < eventsPerWeek.id) {
      setEventsQty(eventsPerWeek.id)
    }
  }, [eventsPerWeek])

  //Update number of events
  const handleNumEventsChange = () => {
    const num = parseInt(eventsPerWeek.id, 10);

    // Reseta o array de eventos ao mudar o número de eventos
    setArrayDates(Array(num).fill({ day: 1, time: today }));
    setArrayWeekDays(Array(num).fill(1));
    setArrayTimes(Array(num).fill(today));

    if (isEdit && datas.eventType <= 2) {
      updateArrays()
      return
    }
  };

  useEffect(() => {
    handleNumEventsChange();
  }, [eventsPerWeek])

  const updateArrays = () => {
    let newArrayWeekDays = [];
    let newArrayTimes = [];
    for (let index = 0; index < eventsPerWeek.id; index++) {
      newArrayWeekDays.push(datas.timecodes[index] ? datas.timecodes[index].day : 1);
      newArrayTimes.push(datas.timecodes[index] ? datas.timecodes[index].time : today);
    }
    setArrayWeekDays(newArrayWeekDays);
    setArrayTimes(newArrayTimes);
  }

  //update array of dates based on weekDays and times  
  useEffect(() => {
    let updatedDates = [...arrayDates];

    for (let i = 0; i < eventsPerWeek.id; i++) {
      updatedDates[i] = {
        day: arrayWeekDays[i],
        time: arrayTimes[i]
      }
    }
    setArrayDates(updatedDates)
  }, [arrayWeekDays, arrayTimes])

  const handleAddWeekDay = (weekDay, index) => {
    const newArray = [...arrayWeekDays];
    newArray[index] = weekDay.id;
    setArrayWeekDays(newArray);
  }

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
  const componentsArrayDatePickers = [];
  for (let i = 0; i < eventsPerWeek.id; i++) {
    componentsArrayDatePickers.push(
      <div className='flex flex-initial gap-3' key={i}>
        <div className="flex w-full flex-col gap-3 ">
          <Select
            selectedPerson={arrayWeekDays[i]}
            setSelectedPerson={
              (weekDay) => {
                console.log("weekDay", weekDay)
                handleAddWeekDay(weekDay, i)
              }
            }
            datas={validWeekDays}
          >
            <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {arrayWeekDays[i] ? weekDays[arrayWeekDays[i]].name : ""} <BiChevronDown className="text-xl" />
            </div>
          </Select>
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
                  {/* <p className="text-black text-sm">Profissional</p> */}
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

                    {/* <SelectProfessional
                        selectedPerson={professional}
                        setSelectedPerson={setProfessional}
                        datas={professionalsData}
                      >
                        <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                          {professional.firstName} {professional.lastName ? professional.lastName : ""} {professional.specialty ? `(${specialties.specialty[professional.specialty - 1].name})` : ""}
                          <BiChevronDown className="text-xl" />
                        </div>
                      </SelectProfessional> */}
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
                  <p className="text-black text-sm">Tipo de Agendamento</p>
                  <Select
                    selectedPerson={eventType}
                    setSelectedPerson={setEventType}
                    datas={eventTypes}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                      {eventType ? eventType.name : ""} <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>

                {/* Agreement */}
                <div className={`flex w-full flex-col gap-1 ${(eventType.id === 0 || eventType.id === 5) ? 'invisible' : ''}`}>
                  <p className="text-black text-sm">Convênio</p>
                  {professionalsData ?
                    <Select
                      selectedPerson={agreement}
                      setSelectedPerson={setAgreement}
                      datas={agreements.agreement}
                      maxHeigth='10'
                    >
                      <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                        {agreement.name}
                        <BiChevronDown className="text-xl" />
                      </div>
                    </Select>
                    : <p>Loading...</p>}
                </div>

                {/* Service */}
                <div className={`flex w-full flex-col gap-1 ${(professional.id === 0 || eventType.id === 0 || eventType.id === 4 || eventType.id === 5) ? 'invisible' : ''}`}>
                  <p className="text-black text-sm">Serviço</p>

                  <Select
                    selectedPerson={service}
                    setSelectedPerson={setService}
                    datas={servicesData ? servicesData : { id: 0, name: 'Teste' }}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                      {service.name}
                      <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
              </>
              :
              <>
                {/* Events Qty */}
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

                    <div div className="flex w-full flex-col gap-1 ">
                      <p className="text-black text-sm">Quantos Agendamentos por Semana?</p>
                      <Select
                        selectedPerson={eventsPerWeek}
                        setSelectedPerson={setEventsPerWeek}
                        datas={timeOptions}
                      >
                        <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                          {eventsPerWeek.name}
                          <BiChevronDown className="text-xl" />
                        </div>
                      </Select>
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