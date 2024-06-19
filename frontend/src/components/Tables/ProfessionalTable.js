import { FiEye } from 'react-icons/fi';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { specialties, councilDatas } from '../Datas';
import getAvatar from '../../utils/getAvatar';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export default function ProfessionalTable({ data, functions, professional, noData }) {

  return (noData ?
    <div className="text-center pb-10 text-lg text-main">Nenhum profissional encontrado.</div> :
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Profissional</th>
          <th className={thclass}>Especialidade</th>
          <th className={thclass}>Telefone</th>
          <th className={thclass}>Email</th>
          <th className={thclass}>Conselho</th>
          <th className={`text-center text-sm font-medium py-3 px-2 whitespace-nowrap`} >Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
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
                <h4 className="text-sm font-medium">{item.fullName}</h4>
              </div>
            </td>
            <td className={tdclass}>{item.specialty ? specialties.specialty[item.specialty - 1].name : "-"}</td>
            <td className={tdclass}>
              <p className="text-textGray">{formatPhoneNumber(item.phoneNumber)}</p>
            </td>
            <td className={tdclass}>{item.email}</td>
            <td className={tdclass}>{item.council ? councilDatas.council[item.council - 1].name : "-"} - {item.councilNumber}</td>

            <td className={tdclass}>
              <div className="flex gap-4 items-center justify-center">
                <button
                  onClick={() => functions.preview(item)}
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
  );
}