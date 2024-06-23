import { useState, useEffect } from 'react';
import moment from 'moment';
import { HiChevronDoubleRight, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import PatientMedicineServiceModal from '../Modals/PatientMedicineServiceModal';
import { specialties, agreements, eventTypes } from '../Datas';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { Select, SelectProfessional, Input, Button, DatePickerEvents, TimePickerComp } from '../Form';
import { getPatients } from '../../api/PatientsAPI';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { getServices } from '../../api/ServicesAPI';
import { createEvents } from '../../api/EventsAPI';
import { toast } from 'react-hot-toast';
import { dateWithoutTimezone } from '../../utils/dateWithoutTz';
import 'moment/locale/pt-br';


export default function EventsForm({ datas, onClose, status }) {

  //controllers
  const [openModal, setOpenModal] = useState(false);

  //form steps
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  //data
  const [patientsData, setPatientsData] = useState([]);
  const [professionalsData, setProfessionalsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  //input data
  const [service, setService] = useState({ id: 0, name: 'Selecione um Serviço' });
  const [startDate, setStartDate] = useState();
  const [patient, setPatient] = useState({});
  const [professional, setProfessional] = useState({ id: 0, firstName: 'Selecione um Profissional' });
  const [agreement, setAgreement] = useState({ id: 0, name: 'Selecione alguma opção...' });
  const [eventType, setEventType] = useState({ id: 0, name: 'Selecione uma opção...' },
  );


  const fetch = async () => {
    const patientsResponse = await getPatients()
    const professionalsResponse = await getProfessionals()

    setPatientsData(patientsResponse)
    setProfessionalsData(professionalsResponse)

  }

  useEffect(() => {
    fetch()
  }, [])

  const fetchServicesBySpecialtyId = async (specialtyIdId) => {
    const servicesResponse = await getServices(true, specialtyIdId)
    setServicesData(servicesResponse)
  }

  useEffect(() => {
    console.log(professional)
    fetchServicesBySpecialtyId(professional.specialty)
  }, [professional])

  const handleSave = async () => {
    console.log(startDate)

    const data = {
      patientId: patient.id,
      professionalId: professional.id,
      startDate: startDate,
      serviceId: (eventType === 4 || eventType === 5 || service.id === 0) ? null : service.id,
      agreementId: agreement.id,
      eventType: eventType.id,
    };

    const response = await createEvents(data);

    if (response.code) {
      toast.error('Erro ao criar agendamento');
      return
    }

    toast.success('Agendamento realizado com sucesso!');
    status(true);
    onClose();
  }


  const handleChangeStep = () => {
    if (step2) {
      setStep2(false);
      setStep1(true);
    } else {
      setStep1(false);
      setStep2(true);
    }
  }

  useEffect(() => {
    console.log(startDate)
  }, [startDate])



  return (
    <>
      {openModal && (
        <PatientMedicineServiceModal
          closeModal={() => setOpenModal(!openModal)}
          isOpen={openModal}
          data={patientsData}
          setPatient={setPatient}
          patient={true}
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
                <div className="flex w-full gap-4">
                  <Input
                    label="Paciente"
                    color={true}
                    disabled={true}
                    value={patient ? patient.fullName : ''}
                    cursor='default'
                    placeholder={
                      patient.lenght === 0 ? patient.fullName : 'Selecione o paciente...'}
                  />
                </div>
                <div className="mt-8">
                  <Button
                    label="Selecionar"
                    onClick={() => setOpenModal(!openModal)}

                  />
                </div>
              </div>

              {/* Event Type */}
              <div div className="flex w-full flex-col gap-3 ">
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
              {/* date */}
              <DatePickerEvents
                label="Data do Agendamento"
                startDate={startDate}
                showTimeSelect={true}
                minDate={new Date()}
                color={'red-600'}
                dateFormat={'dd/MM/yyyy       hh:mm aa'}
                placeholderText={"Selecionar data"}
                locale={'pt-BR'}
                onChange={(date) => {
                  setStartDate(date)

                }}
              />
            </>
          }
        </div >

        {/* Footer */}
        <div div className="fixed flex inset-x-0 bottom-0 p-4 " >
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
                  className="flex-1"
                />
              </div>}
          </div>
        </div>
      </div >
    </>
  );

}