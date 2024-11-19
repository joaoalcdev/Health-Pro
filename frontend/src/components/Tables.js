import React, { useState, useEffect } from 'react';
import { MenuSelect, Button } from './Form';
import { BiDotsHorizontalRounded, BiUndo } from 'react-icons/bi';
import { FiDelete, FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { formatDate } from '../utils/formatDate';
import { calculateDate } from '../utils/calculateDate';
import { brStateDatas, specialties, councilDatas, roleOptions } from './Datas';
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

export function Transactiontable({ data, action, functions }) {
  const DropDown1 = [
    {
      title: 'Edit',
      icon: FiEdit,
      onClick: (data) => {
        functions.edit(data.id);
      },
    },
    {
      title: 'View',
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data.id);
      },
    },
    {
      title: 'Delete',
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error('This feature is not available yet');
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Patient</th>
          <th className={thclass}>Date</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>
            Amout <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Method</th>
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
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img
                    src={item.user.image}
                    alt={item.user.title}
                    className="w-full h-12 rounded-full object-cover border border-border"
                  />
                </span>

                <div>
                  <h4 className="text-sm font-medium">{item.user.title}</h4>
                  <p className="text-xs mt-1 text-textGray">
                    {item.user.phone}
                  </p>
                </div>
              </div>
            </td>
            <td className={tdclass}>{item.date}</td>
            <td className={tdclass}>
              <span
                className={`py-1 px-4 ${item.status === 'Paid'
                  ? 'bg-subMain text-subMain'
                  : item.status === 'Pending'
                    ? 'bg-orange-500 text-orange-500'
                    : item.status === 'Cancel' && 'bg-red-600 text-red-600'
                  } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.status}
              </span>
            </td>
            <td className={`${tdclass} font-semibold`}>{item.amount}</td>
            <td className={tdclass}>{item.method}</td>
            {action && (
              <td className={tdclass}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice table
export function InvoiceTable({ data }) {
  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: 'Edit',
      icon: FiEdit,
      onClick: (item) => {
        navigate(`/invoices/edit/${item.id}`);
      },
    },
    {
      title: 'View',
      icon: FiEye,
      onClick: (item) => {
        navigate(`/invoices/preview/${item.id}`);
      },
    },
    {
      title: 'Delete',
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error('This feature is not available yet');
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Invoice ID</th>
          <th className={thclass}>Patient</th>
          <th className={thclass}>Created Date</th>
          <th className={thclass}>Due Date</th>
          <th className={thclass}>
            Amout <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>#{item?.id}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img
                    src={item?.to?.image}
                    alt={item?.to?.title}
                    className="w-full h-12 rounded-full object-cover border border-border"
                  />
                </span>
                <div>
                  <h4 className="text-sm font-medium">{item?.to?.title}</h4>
                  <p className="text-xs mt-1 text-textGray">
                    {item?.to?.email}
                  </p>
                </div>
              </div>
            </td>
            <td className={tdclass}>{item?.createdDate}</td>
            <td className={tdclass}>{item?.dueDate}</td>
            <td className={`${tdclass} font-semibold`}>{item?.total}</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// prescription table
export function MedicineTable({ data, onEdit }) {
  const DropDown1 = [
    {
      title: 'Edit',
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: 'Delete',
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error('This feature is not available yet');
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Name</th>
          <th className={thclass}>
            Price <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Status</th>
          <th className={thclass}>InStock</th>
          <th className={thclass}>Measure</th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <h4 className="text-sm font-medium">{item?.name}</h4>
            </td>
            <td className={`${tdclass} font-semibold`}>{item?.price}</td>
            <td className={tdclass}>
              <span
                className={`text-xs font-medium ${item?.status === 'Out of stock'
                  ? 'text-red-600'
                  : 'text-green-600'
                  }`}
              >
                {item?.status}
              </span>
            </td>
            <td className={tdclass}>{item?.stock}</td>
            <td className={tdclass}>{item?.measure}</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
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

// Professionals table
export function ProfessionalsTable({ data, functions, professional, noData }) {
  const DropDown1 = [
    {
      title: 'Ver',
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data);
      },
    },
    {
      title: 'Desativar',
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error('This feature is not available yet');
      },
    },
  ];
  return (noData ?
    <div className="text-center pb-10 text-lg text-main">Nenhum profissional encontrado</div> :
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

// doctor table
export function DoctorsTable({ data, functions, doctor }) {
  const DropDown1 = [
    {
      title: 'View',
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data);
      },
    },
    {
      title: 'Delete',
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error('This feature is not available yet');
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>{doctor ? 'Doctor' : 'Receptionist'}</th>
          <th className={thclass}>Created At</th>
          <th className={thclass}>Phone</th>
          <th className={thclass}>Title</th>
          <th className={thclass}>Email</th>
          <th className={thclass}>Actions</th>
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
                  <img
                    src={item.user.image}
                    alt={item.user.title}
                    className="w-full h-12 rounded-full object-cover border border-border"
                  />
                </span>
                <h4 className="text-sm font-medium">{item.user.title}</h4>
              </div>
            </td>
            <td className={tdclass}>12 May, 2021</td>
            <td className={tdclass}>
              <p className="text-textGray">{item.user.phone}</p>
            </td>
            <td className={tdclass}>{item.title}</td>
            <td className={tdclass}>{item.user.email}</td>

            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// appointment table
// get the data patient relative to the doctor appointment


export function AppointmentTable({ data, functions, doctor }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Data</th>
          <th className={thclass}>{doctor ? 'Paciente' : 'Doutor'}</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Hora</th>
          <th className={thclass}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <p className="text-xs">{item.date}</p>
            </td>
            <td className={tdclass}>
              <h4 className="text-xs font-medium">
                {doctor ? item.user.title : item.doctor.title}
              </h4>
              <p className="text-xs mt-1 text-textGray">
                {doctor ? item.user.phone : item.doctor.phone}
              </p>
            </td>
            <td className={tdclass}>
              <span
                className={`py-1  px-4 ${item.status === 'Approved'
                  ? 'bg-subMain text-subMain'
                  : item.status === 'Pending'
                    ? 'bg-orange-500 text-orange-500'
                    : item.status === 'Cancel' && 'bg-red-600 text-red-600'
                  } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.status}
              </span>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{`${item.from} - ${item.to}`}</p>
            </td>

            <td className={tdclass}>
              <button
                onClick={() => functions.preview(item)}
                className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
              >
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// payment table
export function PaymentTable({ data, functions, doctor }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Date</th>
          <th className={thclass}>{doctor ? 'Patient' : 'Doctor'}</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Amount</th>
          <th className={thclass}>Method</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <p className="text-xs">{item.date}</p>
            </td>
            <td className={tdclass}>
              <h4 className="text-xs font-medium">
                {doctor ? item.user.title : item.doctor.title}
              </h4>
              <p className="text-xs mt-1 text-textGray">
                {doctor ? item.user.phone : item.doctor.phone}
              </p>
            </td>
            <td className={tdclass}>
              <span
                className={`py-1  px-4 ${item.status === 'Paid'
                  ? 'bg-subMain text-subMain'
                  : item.status === 'Pending'
                    ? 'bg-orange-500 text-orange-500'
                    : item.status === 'Cancel' && 'bg-red-600 text-red-600'
                  } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.status}
              </span>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{`$${item.amount}`}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.method}</p>
            </td>

            <td className={tdclass}>
              <button
                onClick={() => functions.preview(item.id)}
                className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
              >
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice used table
export function InvoiceUsedTable({ data, functions }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Invoice ID</th>
          <th className={thclass}>Create Date</th>
          <th className={thclass}>Due Date</th>
          <th className={thclass}>Amount</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <p className="text-xs">#{item.id}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.createdDate}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.dueDate}</p>
            </td>

            <td className={tdclass}>
              <p className="text-xs font-semibold">{`$${item.total}`}</p>
            </td>

            <td className={tdclass}>
              <button
                onClick={() => functions.preview(item.id)}
                className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
              >
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice table
export function InvoiceProductsTable({ data, functions, button }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Item</th>
          <th className={thclass}>
            Item Price
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          <th className={thclass}>Quantity</th>
          <th className={thclass}>
            Amout
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          {button && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={`${tdclass}  font-medium`}>{item.name}</td>
            <td className={`${tdclass} text-xs`}>{item.price}</td>
            <td className={tdclass}>{item.id}</td>
            <td className={tdclass}>{item.price * item.id}</td>
            {button && (
              <td className={tdclass}>
                <button
                  onClick={() => functions.deleteItem(item.id)}
                  className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// medicine Dosage table

export function MedicineDosageTable({ data, functions, button }) {
  const thclass = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-xs py-4 px-2 whitespace-nowrap';
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Item</th>
          <th className={thclass}>
            Item Price
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          <th className={thclass}>Dosage</th>
          <th className={thclass}>Instraction</th>
          <th className={thclass}>Quantity</th>
          <th className={thclass}>
            Amout
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          {button && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>{item.name}</td>
            <td className={tdclass}>{item.price}</td>
            <td className={tdclass}>{item.id} - M/A/E</td>
            <td className={tdclass}>{item.instraction}</td>
            <td className={tdclass}>{item.id}</td>
            <td className={tdclass}>{item.price * item.id}</td>
            {button && (
              <td className={tdclass}>
                <button
                  onClick={() => functions.delete(item.id)}
                  className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
