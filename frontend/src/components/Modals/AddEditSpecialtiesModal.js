import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Switchi, CurrencyInputMask } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { addSpecialties, updateSpecialties } from '../../api/specialtiesAPI';

function AddEditSpecialtiesModal({ closeModal, isOpen, datas, setStatus }) {
  const [check, setCheck] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (datas?.name) {
      setName(datas.name);
      setCheck(datas.deletedAt ? false : true);
      setPrice(datas.price);
    }
  }, [datas]);

  const handleSave = async () => {
    setLoading(true);
    if (name === '') {
      toast.error('Nome da especialidade é obrigatório.');
      setLoading(false);
      return
    }
    if (price === '') {
      toast.error('Valor da consulta é obrigatório.');
      setLoading(false);
      return
    }
    const response = await updateSpecialties(datas.id, { name, status: check, price });
    if (response.code) {
      if (response.response.data.code === "23505") {
        toast.error('Especialidade com esse nome já existe');
        setLoading(false);
        return
      }
      toast.error('Erro ao atualizar especialidade');
      setLoading(false);
      return
    }

    setStatus(true);
    toast.success('Especialidade atualizada com sucesso');
    closeModal();
    setLoading(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    if (name === '') {
      return toast.error('Especialidade é obrigatória');
    }
    const response = await addSpecialties({ name, status: check, price });
    if (response.code) {
      if (response.response.data.code === "23505") {
        toast.error('Especialidade já existe');
        setLoading(false);
        return
      }
      toast.error('Erro ao adicionar especialidade');
      setLoading(false);
      return
    }

    setStatus(true);
    toast.success('Especialidade adicionada com sucesso');
    closeModal();
    setLoading(false);
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Editar Especialidade' : 'Adicionar Especialidade'}
      width={'max-w-3xl'}
    >
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <Input
          label="Especialidade"
          required={true}
          color={true}
          value={name}
          placeholder={'Digite a especialidade'}
          onChange={(e) => setName(e.target.value)}
        />
        {/* switch */}
        <div className="flex items-center gap-2 w-full">
          <Switchi
            label="Status"
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <p className={`text-sm ${check ? 'text-subMain' : 'text-textGray'}`}>
            {check ? 'Ativado' : 'Desativado'}
          </p>
        </div>
        <CurrencyInputMask
          label={'Valor da Consulta'}
          color={true}
          inputStyle={{ color: 'black' }}
          unstyled={true}
          autoClear={false}
          placeholder={'R$ 220,00'}
          maxFractionDigits={2}
          maxLength={12}
          unmask={true}
          required={false}
          inputId={'currency-brazil'}
          value={price}
          onValueChange={(e) => setPrice(e.target.value)}
          mode={'currency'}
          currency={'BRL'}
          locale={'pt-BR'}
          allowEmpty={true}
          inputClassName={`transitions w-full bg-white text-sm p-4 border 'border-border font-light' 'border-white text-white'
        rounded-lg focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
        />
        <div></div>

        {/* buttones */}
        <button
          onClick={closeModal}
          className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
        >
          Cancelar
        </button>
        {datas?.name ?
          <Button
            label="Salvar"
            Icon={HiOutlineCheckCircle}
            loading={loading}
            disabled={loading}
            onClick={() => {
              handleSave();
            }}
          />
          :
          <Button
            label="Adicionar"
            Icon={HiOutlineCheckCircle}
            loading={loading}
            disabled={loading}
            onClick={() => {
              handleAdd();
            }}
          />
        }
      </div>
    </Modal >
  );
}

export default AddEditSpecialtiesModal;
