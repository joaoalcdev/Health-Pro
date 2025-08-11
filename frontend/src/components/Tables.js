import { BiUndo } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { formatDate } from '../utils/formatDate';
import { roleOptions } from './Datas';
import getAvatar from '../utils/getAvatar';
import { moneyFormat2BR } from '../utils/moneyFormatBR';
import moment from 'moment';
import { MdOutlineDeleteForever } from 'react-icons/md';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export function ExternalCompaniesTable({ data, action, edit }) {

  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Empresa</th>
          <th className={thclass}>Status</th>

          <th className="text-center text-sm font-medium py-3 px-2 whitespace-nowrap">Ações</th>
          {action && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>{index + 1}</td>
            <td className={tdclass}>{item.name}</td>
            <td className={tdclass}>
              {item.status ? 'Ativado' : 'Desativado'}
            </td>
            <td className="justify-items-center text-sm font-medium py-3 px-2 ">
              <span className="flex text-md text-subMain cursor-pointer justify-center" onClick={() => edit(item)}>
                <FiEdit />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ExternalServicesTable({ data, action, remove }) {

  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Empresa</th>
          <th className={thclass}>Serviço</th>
          <th className={thclass}>Data do Serviço</th>
          <th className={thclass}>Valor</th>
          <th className="text-center text-sm font-medium py-3 px-2 whitespace-nowrap">Ações</th>
          {action && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions items-center"
          >
            <td className={tdclass}>{index + 1}</td>
            <td className={`flex flex-col text-start text-sm font-medium py-3 px-2 whitespace-nowrap `}>
              <span>
                {item.companyName}
              </span>
              <span className='text-xs text-gray-500'>
                {item.professionalName}
              </span>
            </td>
            <td className={tdclass}>{item.service}</td>
            <td className={tdclass}>{moment(item.date).format('DD/MM/YYYY - HH:mm')}</td>
            <td className={tdclass}>{moneyFormat2BR(item.value)}</td>

            <td className="text-sm font-medium justify-items-center ">
              <span className="flex text-lg text-red-500 cursor-pointer justify-center" onClick={() => remove(item.id)}>
                <MdOutlineDeleteForever />
              </span>
            </td>
          </tr>
        ))}
        {
          data.length === 0 &&
          <tr>
            <td colSpan="6" className="text-center py-8">Nenhum registro encontrado</td>
          </tr>

        }
      </tbody>
    </table>
  );
}

// users table
export function UsersTable({ data, functions, user, noData }) {

  return (noData ? <div className="text-center pb-10 text-lg text-main">Nenhum usuário encontrado</div> :
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Usuário</th>
          <th className={thclass}>Email</th>
          <th className={thclass}>Telefone</th>
          <th className={thclass}>Permissão</th>
          <th className={thclass}>Data de Criação</th>
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
                <h4 className="text-sm font-medium">{item.firstName} {item.lastName}</h4>
              </div>
            </td>
            <td className={tdclass}>{item.email}</td>
            <td className={tdclass}>
              <p className="text-textGray">{formatPhoneNumber(item.phoneNumber)}</p>
            </td>
            <td className={tdclass}>{item.roleId ? roleOptions.roles[item.roleId - 1].name : "-"}</td>
            <td className={tdclass}>{item.createdAt ? formatDate(new Date(item.createdAt)) : "-"}</td>

            <td className={tdclass}>
              <div className="flex gap-4 items-center justify-center">
                <button
                  onClick={() => functions.preview(item)}
                  className={`flex gap-4 items-center hover:text-subMain`}
                >
                  <FiEye className="text-md text-subMain" />
                </button>

                {item.deletedAt === null ?
                  <button
                    onClick={() => functions.deleteUser(item)}
                    className={`flex gap-4 items-center hover:text-subMain`}
                  >
                    <RiDeleteBin6Line className="text-xl text-red-600" />
                  </button>
                  :
                  <button
                    onClick={() => functions.restoreUser(item)}
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
    </table >
  );
}