import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Button, Checkbox } from '../Form';
import { getPatientListBySpecialty, includePatientToWaitlist } from '../../api/specialtiesAPI';
import { BiLoaderCircle } from 'react-icons/bi';
import toast from 'react-hot-toast';

export default function IncludePatient2Waitlist({ onClose, datas, agreements, status, isEdit }) {
  const [data, setData] = useState({});

  //controllers
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const response = await getPatientListBySpecialty(datas.id)
    if (response.status !== 200) {
      setLoading(false);
      return
    }
    if (response.status === 200) {
      setData(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleSave = async () => {
    setLoading(true);
    const selectedPatients = [];
    data.forEach((patient) => {
      if (patient.checked === true) {
        selectedPatients.push(patient.id)
      }
    })
    const response = await includePatientToWaitlist(datas.id, selectedPatients)
    if (response.status !== 200) {
      toast.error('Erro ao incluir pacientes na lista de espera')
      setLoading(false);
      return
    }
    if (response.status === 200) {
      setLoading(false);
      toast.success('Pacientes incluídos com sucesso')
      onClose()
    }
  }

  const includePatient = (id) => {
    const newData = data.map((patient) => {
      if (patient.id === id && !patient.checked) {
        return {
          ...patient,
          checked: true
        }
      }
      if (patient.id === id && patient.checked) {
        return {
          ...patient,
          checked: false
        }
      }
      return patient;
    })
    setData(newData);
  }



  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
        <h1 className="text-md font-semibold">{"Incluir Pacientes"}</h1>
        <button
          onClick={onClose}
          className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
        <div>
          <p className='text-sm text-main'>Selecione os pacientes que deseja incluir na lista de espera de <span className='font-semibold'>
            {datas.name}
          </span>
            :
          </p>
        </div>
        {loading ?
          <div className="flex absolute items-center justify-center w-full h-full">
            <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
          </div> :
          <div className='flex flex-col border border-subMain rounded-lg p-2 gap-2 overflow-y-scroll'>
            {
              data.length > 0 ?
                data.map((patient, index) => (
                  <Checkbox
                    key={index}
                    label={patient.fullName}
                    name='patient'
                    value={patient.id}
                    className={`flex justify-between items-center  px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer `}
                    checked={patient.checked}
                    onChange={() => includePatient(patient.id)}
                  >

                  </Checkbox>
                ))
                :
                <div className='flex justify-center items-center h-20'>
                  <p className='text-sm text-main'>Nenhum paciente encontrado</p>
                </div>
            }
          </div>
        }


      </div >

      {/* Footer */}
      <div className="fixed flex inset-x-0 bottom-0 p-4 " >
        <div className='flex gap-4 items-end w-full'>
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
              label={'Salvar'}
              onClick={handleSave}
              loading={loading}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div >
  );
}