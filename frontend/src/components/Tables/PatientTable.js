// dependencies - libraries
import { useState } from 'react';

// components 
import AddPatientModal from '../Modals/AddPatientModal';

// icons
import { HiOutlineEye, HiOutlineTrash, HiMiniArrowUturnLeft } from "react-icons/hi2";

// data
import { brStateDatas } from '../Datas';

// utils
import getAvatar from '../../utils/getAvatar';
import { formatDate } from '../../utils/formatDate';
import { calculateDate } from '../../utils/calculateDate';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

export function PatientsTable({ functions, used, noData, patientData, superIndex }) {

  // table classes styles
  const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

  // add patient modal states
  const [status, setStatus] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onStatus = () => {
    setStatus(true);
  }


  return (noData ?
    <>
      {
        // add patient modal
        isOpen && (
          <AddPatientModal
            closeModal={onCloseModal}
            isOpen={isOpen}
            patient={true}
            status={onStatus}
            datas={null}
          />
        )
      }
      <div className='flex w-full py-8 justify-center items-center'>
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Nenhum dado foi encontrado!
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Talvez você não tenha pacientes cadastrados.
              Adicione seu primeiro paciente no botão abaixo.
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              className="w-full select-none rounded-lg bg-subMain py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => setIsOpen(true)}
            >
              Novo Paciente
            </button>
          </div>
        </div>
      </div>
    </>
    :
    <>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>Paciente</th>
            <th className={thclass}>Gênero</th>

            {!used && (
              <>
                <th className={thclass}>Tipo Sanguíneo</th>
                <th className={thclass}>Idade</th>
                <th className={thclass}>Nascimento</th>
              </>
            )}

            <th className={thclass}>Endereço, Cidade (UF)</th>
            <th className={thclass}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((item, index) => (
            <tr
              key={item.id}
              className="group border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{(superIndex) + (index + 1)}</td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <span className="w-12">
                    <img
                      src={getAvatar(item.gender)}
                      alt='avatar_image'
                      className={`transition-all duration-300 ease-in-out w-12 h-12 rounded-full object-cover border border-border group-hover:ring-2 ${item.gender === 1 ? 'group-hover:ring group-hover:ring-subMain' : 'group-hover:ring group-hover:ring-orange-500'}`} />
                  </span>
                  <div className=''>
                    <h4 className="text-sm font-medium">{item.fullName}</h4>
                    <p className="text-xs mt-1 text-textGray">
                      {formatPhoneNumber(item.phoneNumber)}
                      <br />
                      {formatPhoneNumber(item.emergencyContact)}
                    </p>
                  </div>
                </div>
              </td>

              <td className={tdclass}>
                <span
                  className={
                    `select-none py-1 px-4 ${item.gender === 1 ? 'bg-subMain text-subMain group-hover:bg-subMain group-hover:text-white' : 'bg-orange-500 text-orange-500 group-hover:bg-orange-400 group-hover:text-white'} bg-opacity-10 text-xs rounded-xl duration-300`}
                >
                  {item.gender === 1 ? 'M' : item.gender === 2 ? 'F' : '-'}
                </span>
              </td>

              {!used && (
                <>
                  <td className={tdclass}>
                    {/* bloodType */}
                    {item.bloodType === 1 ? '-' : item.bloodType === 2 ? 'A+' : item.bloodType === 3 ? 'A-' : item.bloodType === 4 ? 'B+' : item.bloodType === 5 ? 'B-' : item.bloodType === 6 ? 'AB+' : item.bloodType === 7 ? 'AB-' : item.bloodType === 8 ? 'O+' : item.bloodType === 9 ? 'O-' : '-'}
                  </td>
                  <td className={tdclass}>
                    {/* age */}
                    {calculateDate(item.dateBirth) > 1 ? calculateDate(item.dateBirth) + ' anos' : calculateDate(item.dateBirth) + ' ano'}
                  </td>
                  <td className={tdclass}>
                    {/* dateBirth */}
                    {formatDate(new Date(item.dateBirth))}
                  </td>
                </>
              )}

              <th className={thclass}>
                <div className="text-xs text-black">
                  <p>
                    {item.address === '' ? '' : item.address}
                  </p>
                  <div className='flex'>
                    <p className='pr-1'>
                      {item.region === '' ? '' : item.region + ','}
                    </p>
                    <p className='pr-1'>
                      {item.city === '' ? '' : item.city}
                    </p>
                    <p className=''>
                      ({item.state ? brStateDatas.states[item.state - 1].UF : ""})
                    </p>
                  </div>
                </div>
              </th>

              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => functions.preview(item.id)}
                    className={`flex gap-4 items-center group-hover:text-subMain`}
                  >
                    <HiOutlineEye className="text-xl text-subMain" />
                  </button>
                  {item.deletedAt === null ?
                    <button
                      onClick={() => functions.deletePatient(item.id)}
                      className={`flex gap-4 items-center group-hover:text-subMain`}
                    >
                      <HiOutlineTrash className="text-xl text-red-600" />
                    </button>
                    :
                    <button
                      onClick={() => functions.restorePatient(item.id)}
                      className={`flex gap-4 items-center group-hover:text-subMain`}
                    >
                      <HiMiniArrowUturnLeft className="text-lg text-subMain" />
                    </button>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}