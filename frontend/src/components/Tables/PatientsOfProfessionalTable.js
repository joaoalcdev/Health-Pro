// utils
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

// icons
import { HiOutlineEye } from "react-icons/hi";

export function PatientsOfProfessionalTable({ functions, noData, patientData }) {

  // table classes styles
  const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';


  return (noData ?
    <>
      <div className='flex w-full py-8 justify-center items-center'>
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Nenhum paciente encontrado.
            </h5>
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
            <th className={thclass}>Contatos</th>
            <th className={thclass}>Próximo Evento</th>
            <th className={thclass}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((item, index) => (
            <tr
              key={item.id}
              className="group border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{(index + 1)}</td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <div className=''>
                    <h4 className="text-sm font-medium">{item.fullName}</h4>
                    <p className="text-xs mt-1 text-textGray">
                      {item.maternalFiliation ? (<>{item.maternalFiliation} <br /></>) : ''}
                      {item.paternalFiliation ?
                        item.paternalFiliation
                        : ''}
                    </p>
                  </div>
                </div>
              </td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <div className=''>
                    <h4 className="text-sm font-medium">{item.phoneNumber ? formatPhoneNumber(item.phoneNumber) : ''}</h4>
                    <p className="text-xs mt-1 text-textGray">
                      {item.maternalFiliationContact ? (<>{formatPhoneNumber(item.maternalFiliationContact)} <br /> </>) : ''}
                      {item.paternalFiliationContact ? formatPhoneNumber(item.paternalFiliationContact) : ''}
                    </p>
                  </div>
                </div>
              </td>

              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <div className=''>
                    <h4 className="text-sm font-medium">{item.nextEvent.serviceName}</h4>
                    <p className="text-xs mt-1 text-textGray">
                      {formatDate(item.nextEvent.startTime)} - {formatDateTime(item.nextEvent.startTime)}

                    </p>
                  </div>
                </div>
              </td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center justify-center">
                  <button
                    onClick={() => functions.preview(item.id)}
                    className={`flex gap-4 items-center group-hover:text-subMain`}
                  >
                    <HiOutlineEye className="text-xl text-subMain" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}