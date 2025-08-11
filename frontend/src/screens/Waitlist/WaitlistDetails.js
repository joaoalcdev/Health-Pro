import { useState } from 'react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { Checkbox } from '../../components/Form';
import { formatDate } from '../../utils/formatDate';
import { updateWaitlist, waitlist } from '../../api/specialtiesAPI';
import { SpecialtyDisclosure } from '../../components/Disclosures';
import { Button } from '../../components/Form';
import { BiLoaderCircle } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { TbHttpDelete } from 'react-icons/tb';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';

export function WaitlistDetail({ data, onStatus, hideOtherDisclosuresHandle, includePatient }) {

  const [loading, setLoading] = useState(false);

  const [patients, setPatients] = useState([{}]);

  const fetch = async () => {
    setLoading(true);
    const response = await waitlist(data.id)
    if (response.status !== 200) {
      setLoading(false)
      return
    }
    if (response.status === 200) {
      setPatients(response.data)
      setLoading(false)
    }
  }


  return (
    <>
      <SpecialtyDisclosure
        data={data}
        hideOtherDisclosuresHandle={hideOtherDisclosuresHandle}
        onStatus={onStatus}
        fetchData={fetch}
      >
        <div className='flex flex-col w-full gap-4'>
          {loading ?
            <div className="flex items-center justify-center w-full h-[100px]">
              <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
            </div> :
            <WaitlistDetailsContent specialtyId={data.id} data={patients} />
          }
          <div className='w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'>
            <div className='col-start-1 sm:col-start-3 lg:col-start-5'>
              <Button
                label="Incluir Pacientes"
                onClick={() => includePatient(data)}
              />
            </div>
          </div>
        </div>
      </SpecialtyDisclosure>
    </>
  );
}

export function WaitlistDetailsContent({ specialtyId, data }) {

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const [patients, setPatients] = useState(data);

  const handleSelectWaitingPatient = (id) => {
    const newPatients = patients.map((patient) => {
      if (patient.patientId === id) {
        return {
          ...patient,
          checked: !patient.checked
        }
      }
      return patient
    })
    const count = newPatients.filter((patient) => patient.checked).length
    setPatients(newPatients)
    setDisabled(count > 0 ? false : true)
  }

  const handleMovePatientsToActive = async () => {
    setLoading(true)
    setDisabled(true)
    const editedPatients = [];
    const selectedPatients = patients.map((patient) => {
      if (patient.checked && patient.listType === 1) {
        editedPatients.push({
          id: patient.id,
          listType: 2,
        })
        return {
          ...patient,
          listType: 2,
          checked: false
        }
      }
      if (patient.checked && patient.listType === 2) {
        editedPatients.push({
          id: patient.id,
          listType: 1,
        })
        return {
          ...patient,
          listType: 1,
          checked: false
        }
      }
      return patient
    })
    setPatients(selectedPatients)

    const response = await updateWaitlist(specialtyId, editedPatients)
    if (response.status !== 200) {
      toast.error('Erro ao mover pacientes')
      setLoading(false)
      return
    }
    if (response.status === 200) {
      toast.success('Pacientes movidos com sucesso')
      setLoading(false)
      setDisabled(false)
    }
  }

  const handleOpenConfirmationModal = () => {
    setOpenConfirmationModal(!openConfirmationModal)
  }


  const handleRemovePatients = async () => {
    setLoading(true)
    setDisabled(true)
    const editedPatients = [];
    const selectedPatients = [];

    patients.forEach((patient) => {

      if (patient.checked) {
        editedPatients.push({
          id: patient.id,
          listType: 1,
          deletedAt: new Date()
        })
        return
      }
      selectedPatients.push(patient)
    })
    setPatients(selectedPatients)

    const response = await updateWaitlist(specialtyId, editedPatients)
    if (response.status !== 200) {
      toast.error('Erro ao remover pacientes')
      setLoading(false)
      return
    }
    if (response.status === 200) {
      toast.success('Pacientes removidos com sucesso')
      setLoading(false)
      setDisabled(false)
    }
  }

  return (
    <>
      {<ConfirmationModal
        title={'Remover Pacientes'}
        closeModal={handleOpenConfirmationModal}
        isOpen={openConfirmationModal}
        loading={loading}
        question={"Você tem certeza que deseja remover os pacientes?"}
        onConfirm={handleRemovePatients}
        type='remove'
      />}
      <div className='grid md:grid-cols-11 gap-2 items-center '>
        <div className='flex flex-col h-full col-span-5 border border-subMain p-4 rounded-lg gap-2'>
          <p className='text-center text-subMain mb-2'>
            Pacientes Ativos
          </p>
          {patients.length > 0 ?
            patients.map((patient, index) => (patient.listType === 2 ?
              <Checkbox
                key={index}
                label={patient.patientFullName}
                name='patient'
                value={patient.patientId}
                className={`flex justify-between items-center px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer `}
                checked={patient.checked}
                disabled={disabled}
                onChange={() => handleSelectWaitingPatient(patient.patientId)}
              >
              </Checkbox>
              : ''
            )) :
            <p className='text-gray-400 text-md text-center'>
              Nenhum paciente ativo
            </p>
          }
        </div>
        <div className='flex flex-col gap-4 box-border col-start-2 col-end-5 md:col-start-6 md:col-end-6'>

          <button className={`col-span-1 justify-items-center hover:bg-subMain border px-6 border-subMain rounded-full items-center p-2 cursor-pointer text-2xl ${disabled ? 'opacity-30 hover:cursor-not-allowed hover:bg-white hover:text-subMain' : 'hover:opacity-80 hover:text-white'} text-subMain transition ease-in-out duration-250`}
            onClick={() => handleMovePatientsToActive()}
            disabled={disabled}
          >
            <HiSwitchHorizontal />
          </button>
          <button className={`col-span-1 justify-items-center  border border-red-500 px-6 rounded-full items-center p-2 cursor-pointer   text-2xl ${disabled ? 'opacity-30 hover:cursor-not-allowed hover:bg-white hover:text-red-500 ' : 'hover:opacity-80 hover:bg-red-500 hover:text-white'} text-red-500 transition ease-in-out duration-250`}
            onClick={() => handleOpenConfirmationModal()}
            disabled={disabled}
          >
            <TbHttpDelete />
          </button>
        </div>

        <div className='flex flex-col h-full col-span-5 border border-subMain p-4 rounded-lg gap-2'>
          <p className='text-center text-subMain mb-2'>
            Lista de Espera
          </p>
          {patients.length > 0 ?
            patients.map((patient, index) => (patient.listType === 1 ?
              <Checkbox
                key={index}
                label={patient.patientFullName + ' - ' + formatDate(patient.createdAt)}
                name='patient'
                value={patient.patientId}
                className={`flex justify-between items-center  px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer `}
                checked={patient.checked}
                disabled={disabled}
                onChange={() => handleSelectWaitingPatient(patient.patientId)}
              >
              </Checkbox>
              : ''
            ))
            :
            <p className='text-gray-400 text-md text-center'>
              Nenhum paciente na lista de espera
            </p>
          }
        </div>

      </div>
    </>

  )
}
