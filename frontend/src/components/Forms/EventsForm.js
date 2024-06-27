import { useState, useEffect } from 'react';
import { HiChevronDoubleRight, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import PatientMedicineServiceModal from '../Modals/PatientMedicineServiceModal';
import { specialties, agreements, eventTypes } from '../Datas';
import { BiChevronDown } from 'react-icons/bi';
import { Select, SelectProfessional, Input, Button, MultiplesDatePickers } from '../Form';
import { getPatients } from '../../api/PatientsAPI';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { getServices } from '../../api/ServicesAPI';
import { createEvents } from '../../api/EventsAPI';
import { toast } from 'react-hot-toast';
import 'moment/locale/pt-br';

export default function EventsForm({ datas, onClose, status }) {

  //controllers
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //form steps
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  //data
  const [patientsData, setPatientsData] = useState([]);
  const [professionalsData, setProfessionalsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  //input data
  const [service, setService] = useState({ id: 0, name: 'Selecione um Serviço...' });
  const [startDate, setStartDate] = useState();
  const [arrayDates, setArrayDates] = useState(['']);
  const [patient, setPatient] = useState({ id: 0, fullName: 'Selecione um Paciente...' });
  const [professional, setProfessional] = useState({ id: 0, firstName: 'Selecione um Profissional...' });
  const [agreement, setAgreement] = useState({ id: 0, name: 'Selecione alguma opção...' });
  const [eventType, setEventType] = useState({ id: 0, name: 'Selecione uma opção...' },
  );
  const [eventsQty, setEventsQty] = useState(1)
  const [eventsPerWeek, setEventsPerWeek] = useState({ id: 1, name: '1x' })


  //popuplate professionals and patients selectors
  const fetch = async () => {
    const patientsResponse = await getPatients()
    const professionalsResponse = await getProfessionals()
    setPatientsData(patientsResponse)
    setProfessionalsData(professionalsResponse)
  }
  useEffect(() => {
    fetch()
  }, [])

  //Populate services selector based on professional specialty
  const fetchServicesBySpecialtyId = async (specialtyIdId) => {
    const servicesResponse = await getServices(true, specialtyIdId)
    setServicesData(servicesResponse)
  }
  useEffect(() => {
    fetchServicesBySpecialtyId(professional.specialty)
  }, [professional])

  //Save event
  const handleSave = async () => {
    setLoading(true);

    //ensure arrayDates has correct lenght
    setArrayDates(arrayDates.filter((date, index) => {
      if (index < eventsPerWeek.id) {
        return date
      }
    }))

    const data = {
      patientId: patient.id,
      professionalId: professional.id,
      startDate: arrayDates,
      //endTime: moment(startDate).add(30, 'minutes').toDate(),
      serviceId: (eventType === 4 || eventType === 5 || service.id === 0) ? null : service.id,
      agreementId: agreement.id,
      eventType: eventType.id,
      eventsPerWeek: eventsPerWeek.id,
      eventsQty: Number(eventsQty),
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

  //insert date in arrayDates
  const handleAddArrayDates = (date, index) => {
    setStartDate(date);
    const newDate = [...arrayDates];
    newDate[index] = date;
    setArrayDates(newDate);
  }

  //Enable save button when all dates are filled
  useEffect(() => {
    for (let i = 0; i < eventsPerWeek.id; i++) {
      if (arrayDates[i] === '' || arrayDates[i] === undefined) {
        setDisabled(true)
        return
      }
    }
    setDisabled(false)
  }, [arrayDates, eventsPerWeek])

  //ensure eventsQty minimum must be eventsPerWeek
  useEffect(() => {
    if (eventsQty < eventsPerWeek.id) {
      setEventsQty(eventsPerWeek.id)
    }
  }, [eventsPerWeek])


  //Create array of DatePickers based on eventsPerWeek
  const componentsArrayDatePickers = [];
  for (let i = 0; i < eventsPerWeek.id; i++) {
    componentsArrayDatePickers.push(
      <MultiplesDatePickers
        key={i}
        label={`Data do Agendamento ${i + 1}`}
        startDate={arrayDates[i]}
        showTimeSelect={true}
        minDate={new Date()}
        color={'red-600'}
        dateFormat={'dd/MM/yyyy    hh:mm aa'}
        placeholderText={"Selecionar data"}
        locale={'pt-BR'}
        onChange={(date) => {
          handleAddArrayDates(date, i)
        }}
      />);
  }

  return (
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
          <h1 className="text-md font-semibold">Novo Agendamento</h1>
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
              <div className={`flex w-full flex-col gap-3 `}>
                <p className="text-black text-sm">Profissional</p>
                {professionalsData ?
                  <SelectProfessional
                    selectedPerson={professional}
                    setSelectedPerson={setProfessional}
                    datas={professionalsData}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                      {professional.firstName} {professional.lastName ? professional.lastName : ""} {professional.specialty ? `(${specialties.specialty[professional.specialty - 1].name})` : ""}
                      <BiChevronDown className="text-xl" />
                    </div>
                  </SelectProfessional>
                  : <p>Loading...</p>}
              </div>

              {/* Patient */}
              <div className="flex gap-4">
                <div className='flex w-full flex-col gap-3 '>

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
              <div className="flex w-full flex-col gap-3 ">
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
              <div className={`flex w-full flex-col gap-3 ${(eventType.id === 0 || eventType.id === 5) ? 'invisible' : ''}`}>
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
              <div className={`flex w-full flex-col gap-3 ${(professional.id === 0 || eventType.id === 0 || eventType.id === 4 || eventType.id === 5) ? 'invisible' : ''}`}>
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
                <div div className="flex w-full flex-col gap-3 ">
                  <p className="text-black text-sm">Quantos Agendamentos por Semana?</p>
                  <Select
                    selectedPerson={eventsPerWeek}
                    setSelectedPerson={setEventsPerWeek}
                    datas={[{ id: 1, name: '1x' }, { id: 2, name: '2x' }, { id: 3, name: '3x' }, { id: 4, name: '4x' }, { id: 5, name: '5x' }]}
                  >
                    <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                      {eventsPerWeek.name}
                      <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
                </div>
              }
              {eventType.id === 2 &&
                <Input
                  label="Quantidade de Agendamentos Totais"
                  color={true}
                  type='number'
                  max='50'
                  value={eventsQty}
                  onChange={(e) => {
                    e.target.value > 50 ? setEventsQty(50) : setEventsQty(e.target.value);

                  }}
                />
              }
              {/* date */}
              {componentsArrayDatePickers}
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
                    {'Voltar'}
                  </>
                </button>

                <Button
                  label="Salvar"
                  Icon={HiOutlineCheckCircle}
                  onClick={() => handleSave()}
                  loading={loading}
                  disabled={disabled}
                  className="flex-1"
                />
              </div>}
          </div>
        </div>
      </div>
    </>
  );

}