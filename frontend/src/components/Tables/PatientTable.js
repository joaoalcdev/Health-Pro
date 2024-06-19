import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import getAvatar from '../../utils/getAvatar';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { calculateDate } from '../../utils/calculateDate';
import { formatDate } from '../../utils/formatDate';
import { brStateDatas } from '../Datas';
import AddPatientModal from '../Modals/AddPatientModal';
import { FiEye } from 'react-icons/fi';
import { BiUndo } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export function PatientsTable({ functions, used, noData, patientData }) {

  const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

  const [status, setStatus] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onStatus = () => {
    setStatus(true)
  }

  // paginate the table results
  const [currentPage, setCurrentPage] = useState(1); // current page
  const recordsPerPage = 4; // define results per page (change to 25)
  const lastIndex = currentPage * recordsPerPage; // last index
  const firstIndex = lastIndex - recordsPerPage; // first index
  const records = patientData.slice(firstIndex, lastIndex); // current records = array data 
  const npage = Math.ceil(patientData.length / recordsPerPage); // number of pages
  const numbers = [...Array(npage).keys()].map((i) => i + 1); // array of pages

  function prevPage() {
    setCurrentPage(currentPage - 1)
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    setCurrentPage(currentPage + 1)
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
          {records.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{index + 1}</td>

              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <span className="w-12">
                    <img src={getAvatar(item.gender)} alt='avatar_image' className="w-12 h-12 rounded-full object-cover border border-border" />
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
                    `select-none py-1 px-4 ${item.gender === 1 ? 'bg-subMain text-subMain hover:bg-subMain hover:text-white' : 'bg-orange-500 text-orange-500 hover:bg-orange-400 hover:text-white'} bg-opacity-10 text-xs rounded-xl duration-300`}
                >
                  {item.gender === 1 ? 'M' : item.gender === 2 ? 'F' : '-'}
                </span>
              </td>

              {!used && (
                <>
                  <td className={tdclass}>
                    {/* {item.bloodType} */}
                    {item.bloodType === 1 ? '-' : item.bloodType === 2 ? 'A+' : item.bloodType === 3 ? 'A-' : item.bloodType === 4 ? 'B+' : item.bloodType === 5 ? 'B-' : item.bloodType === 6 ? 'AB+' : item.bloodType === 7 ? 'AB-' : item.bloodType === 8 ? 'O+' : item.bloodType === 9 ? 'O-' : '-'}
                  </td>
                  <td className={tdclass}>{calculateDate(item.dateBirth)}</td>
                  <td className={tdclass}>{formatDate(new Date(item.dateBirth))}</td>
                </>
              )}

              <th className={thclass}>
                {/* if dont have address, dont show */}
                <div className="text-xs text-black">
                  <p>
                    {item.address === '' ? '-' : item.address}
                  </p>
                  <div className='flex'>
                    <p className='pr-1'>
                      {item.city === '' ? '-' : item.city}
                    </p>
                    <p className=''>
                      ({item.state ? brStateDatas.states[item.state - 1].UF : "-"})
                    </p>
                  </div>
                </div>
              </th>

              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => functions.preview(item.id)}
                    className={`flex gap-4 items-center hover:text-subMain`}
                  >
                    <FiEye className="text-md text-subMain" />
                  </button>
                  {item.deletedAt === null ?
                    <button
                      onClick={() => functions.deletePatient(item.id)}
                      className={`flex gap-4 items-center hover:text-subMain`}
                    >
                      <RiDeleteBin6Line className="text-xl text-red-600" />
                    </button>
                    :
                    <button
                      onClick={() => functions.restorePatient(item.id)}
                      className={`flex gap-4 items-center hover:text-subMain`}
                    >
                      <BiUndo className="text-xl text-subMain" />
                    </button>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className='flex flex-row w-full py-3 justify-center items-center text-center'>
        <nav>
          <ul className="flex flex-row justify-center items-center text-center">
            <li className="flex justify-center items-center text-center">
              <button
                className={`flex ml-1 text-xl font-bold ${currentPage === 1 ? 'text-gray-300 hover:cursor-not-allowed' : 'text-black'}`}
                onClick={prevPage}
                disabled={currentPage === 1 ? true : false}
              >
                <HiChevronLeft />
              </button>
            </li>
            {numbers.map((n, i) => (
              <li
                key={i}
                className={`flex justify-center items-center text-center bg-greyed transition-colors rounded-full h-10 w-10 mx-1 ${currentPage === n ? 'z-50 bg-subMain hover:bg-subMain/90 rounded-full text-white transition-colors' : ''}`}
              >
                <button className="select-none flex justify-center items-center py-2 px-4" onClick={() => changeCPage(n)}>
                  {n}
                </button>
              </li>
            ))}
            <li className="flex justify-center items-center text-center">
              <button
                className={`flex ml-1 text-xl font-bold ${currentPage === npage ? 'text-gray-300 hover:cursor-not-allowed' : 'text-black'}`}
                onClick={nextPage}
                disabled={currentPage === npage ? true : false}
              >
                <HiChevronRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}