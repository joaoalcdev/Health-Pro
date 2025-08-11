import { FiEye } from 'react-icons/fi';
import { useState } from 'react';
import Pagination from '../Pagination';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export default function SpecialtyTable({ data, onEdit, noData }) {

  const [records, setRecords] = useState(data)
  const [currentPage, setCurrentPage] = useState(1); // current page
  const recordsPerPage = 5


  return (noData ?
    <div className="text-center pb-10 text-lg text-main">Nenhuma especialidade encontrada.</div>
    :
    <>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>Especialidade</th>
            <th className={thclass}>Valor da Consulta <span className="text-xs font-light">(R$)</span></th>
            <th className={thclass}>Status</th>
            <th className={`text-center text-sm font-medium py-3 px-2 whitespace-nowrap`}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{(currentPage * recordsPerPage) - recordsPerPage + index + 1}</td>
              <td className={tdclass}>
                <h4 className="text-sm font-medium">{item?.name}</h4>
              </td>
              <td className={tdclass}>{item?.price.toLocaleString('pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2
                })}
              </td>
              <td className={tdclass}>
                <span
                  className={`text-xs font-medium ${item?.deletedAt ? 'text-red-600' : 'text-green-600'
                    }`}
                >
                  {item?.deletedAt ? 'Desativado' : 'Ativado'}
                </span>
              </td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center justify-center">
                  <button
                    onClick={() => onEdit(item)}
                    key={index}
                    className={`flex gap-4 items-center hover:text-subMain`}
                  >
                    <FiEye className="text-md text-subMain" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        records={data}
        setRecords={setRecords}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        recordsPerPage={recordsPerPage}
      />
    </>
  );
}
