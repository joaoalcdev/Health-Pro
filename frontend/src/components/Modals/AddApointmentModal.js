import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import {
  Button,
  Checkbox,
  DatePickerComp,
  Input,
  Select,
  SelectProfessional,
  Textarea,
  TimePickerComp,
} from '../Form';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { memberData, specialties, agreements } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { getPatients } from '../../api/PatientsAPI';
import { getProfessionals } from '../../api/ProfessionalsAPI';
import { createAppointment } from '../../api/AppointmentsAPI';


function AddAppointmentModal({ closeModal, isOpen, datas }) {
  const [services, setServices] = useState(specialties.specialty[0]);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [open, setOpen] = useState(false);
  const [patientsData, setPatientsData] = useState([]);
  const [professionalsData, setProfessionalsData] = useState([]);
  const [patient, setPatient] = useState({});
  const [professional, setProfessional] = useState({ firstName: 'Selecione um Profissional' });
  const [agreement, setAgreement] = useState(agreements.agreement[0]);


  const fetch = async () => {
    const patientsResponse = await getPatients()
    const professionalsResponse = await getProfessionals()

    setPatientsData(patientsResponse)
    setProfessionalsData(professionalsResponse)

    console.log(professional)
  }

  useEffect(() => {
    fetch()
  }, [])


  // set data
  // useEffect(() => {
  //   if (datas?.title) {
  //     setServices(datas?.service);
  //     setStartTime(datas?.start);
  //     setEndTime(datas?.end);
  //   }
  // }, [datas]);

  const handleSave = () => {
    if (!patient.fullName) {
      toast.error('Selecione um paciente');
      return;
    }
    if (!services) {
      toast.error('Selecione um serviço');
      return;
    }
    if (professional.firstName === 'Selecione um Profissional') {
      toast.error('Selecione um profissional');
      return;
    }

    const data = {
      patientId: patient.id,
      professionalId: professional.id,
      startTime: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes(),
      ),
      endTime: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes() + 30,
      ),
      service: services.id,
      agreement: agreement.id
    };

    console.log(data);

    const response = createAppointment(data);
    if (response) {
      toast.success('Consulta salva com sucesso');
      closeModal();
    }


  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? 'Atualizar Consulta' : 'Nova Consulta'}
      width={'max-w-3xl'}
      height={'sm:h-[65%vh]'}
    >
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(!isOpen)}
          isOpen={open}
          data={patientsData}
          setPatient={setPatient}
          patient={true}
        />
      )}
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Especialidade</p>
            <Select
              selectedPerson={services}
              setSelectedPerson={setServices}
              datas={specialties.specialty}
            >
              <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {services ? services.name : ""} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* date */}
          <div className="grid sm:grid-cols-2 z-[100] gap-4 w-full">
            <DatePickerComp
              label="Data da consulta"
              startDate={startDate}
              color={'subMain'}
              dateFormat={'dd/MM/yyyy'}
              placeholderText={"Selecionar data"}
              onChange={(date) => {
                setStartDate(date)
                console.log(date)
              }}
            />
            <TimePickerComp
              label="Horário"
              startDate={startTime}
              placeholderText={"Selecionar horário"}
              onChange={(date) => setStartTime(date)}
            />

          </div>

        </div>
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-10">
            <Input
              label="Paciente"
              color={true}
              value={patient ? patient.fullName : ''}
              placeholder={
                patient ? patient.fullName : 'Selecione o paciente clicando no botão incluir...'}
            />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-subMain flex-rows border border-dashed border-subMain text-sm py-3.5 sm:mt-8 sm:col-span-2 rounded"
          >
            <BiPlus /> Incluir
          </button>
        </div>

        {/* status && doctor */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
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
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Convênio</p>
            {professionalsData ?
              <Select
                selectedPerson={agreement}
                setSelectedPerson={setAgreement}
                datas={agreements.agreement}
              >
                <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {agreement.name}
                  <BiChevronDown className="text-xl" />
                </div>
              </Select>
              : <p>Loading...</p>}
          </div>


        </div>


        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.title ? 'Discard' : 'Cancel'}
          </button>
          <Button
            label="Salvar"
            Icon={HiOutlineCheckCircle}
            onClick={() => { handleSave() }}
          />
        </div>
      </div>
    </Modal >
  );
}

export default AddAppointmentModal;
