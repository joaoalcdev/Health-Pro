import React, { useState, useEffect } from 'react';
import { MenuSelect, Button } from '../Form';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { formatDate } from '../../utils/formatDate';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export default function SpecialtyTable({ data, onEdit }) {
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
          <th className={thclass}>#</th>
          <th className={thclass}>Especialidade</th>
          <th className={thclass}>Data de criação</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Ações</th>
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
              <h4 className="text-sm font-medium">{item?.name}</h4>
            </td>
            <td className={tdclass}>{formatDate(item?.createdAt)}</td>
            <td className={tdclass}>
              <span
                className={`text-xs font-medium ${item?.specialtyStatus === 2 ? 'text-red-600' : 'text-green-600'
                  }`}
              >
                {item?.specialtyStatus === 2 ? 'Disabled' : 'Enabled'}
              </span>
            </td>
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
