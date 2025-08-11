import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Input, Button, Toggle } from '../Form';
import { toast } from 'react-hot-toast';
import { addCompany, editCompany } from '../../api/ExternalServicesAPI';

export default function CompaniesForm({ onClose, data, status, isEdit }) {

  const [check, setCheck] = useState(data?.status || true);
  const [name, setName] = useState(data?.name || '');

  //controllers
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleSave = async () => {
    setLoading(true);
    if (name === '') {
      setLoading(false);
      return toast.error('Nome da Empresa é obrigatório');
    }
    const response = isEdit ? await editCompany(data.id, { name, status: check }) : await addCompany({ name, status: check });

    if (response.code) {
      setLoading(false);
      return toast.error(response.message);
    }
    setLoading(false);
    toast.success('Empresa adicionada com sucesso');
    status();
    onClose();
  };

  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
        <h1 className="text-md font-semibold">{isEdit ? "Editar Empresa parceira" : "Nova Empresa parceira"}</h1>
        <button
          onClick={onClose}
          className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
        <div className={`flex w-full flex-col gap-4`}>
          <Input
            label="Nome da Empresa"
            color={true}
            value={name}
            placeholder={'Digite o nome da Empresa'}
            onChange={(e) => {
              setName(e.target.value)
              setDisabled(false)
            }}
          />

          <div className="flex items-center gap-2 w-full">
            <Toggle
              label="Status"
              checked={check}
              onChange={() => {
                setCheck(!check)
                setDisabled(false)
              }}
            />
            <p className={`text-sm ${check ? 'text-subMain' : 'text-textGray'}`}>
              {check ? 'Ativado' : 'Desativado'}
            </p>
          </div>
        </div>

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
              label={isEdit ? "Salvar" : "Adicionar"}
              onClick={() => handleSave()}
              loading={loading}
              disabled={loading || disabled}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div >
  );
}