import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Switchi, CurrencyInputMask, SelectListBox } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getSpecialties } from '../../api/specialtiesAPI';
import { BiChevronDown } from 'react-icons/bi';
import { addServices, updateServices } from '../../api/ServicesAPI';

function AddEditServiceModal({ closeModal, isOpen, datas, setStatus }) {
  //controllers
  const [loading, setLoading] = useState(false);


  //select data
  const [specialties, setSpecialties] = useState([]);

  //variables
  const [name, setName] = useState('');
  const [check, setCheck] = useState(true);
  const [specialty, setSpecialty] = useState({ id: 0, name: 'Selecione uma especialidade' });
  const [initialPrice, setInitialPrice] = useState('');
  const [recurringPrice, setRecurrringPrice] = useState('');


  useEffect(() => {
    if (datas?.name) {
      setName(datas.name);
      setCheck(datas.deletedAt ? false : true);
      setSpecialty({ id: datas.specialtyId, name: datas.specialtyName });
      setInitialPrice(datas.initialPrice);
      setRecurrringPrice(datas.recurringPrice);
    }
  }, [datas]);

  const fetchSpecialties = async () => {
    try {
      const response = await getSpecialties();
      setSpecialties(response);
    } catch (error) {
      toast.error('Error fetching specialties');
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);


  const handleSave = async () => {
    setLoading(true);
    if (name === '') {
      toast.error('Nome do Serviço é obrigatória.');
      setLoading(false);
      return
    }
    if (specialty.id === 0 || initialPrice === 0 || recurringPrice === 0) {
      toast.error('Preencha todos os campos.');
      setLoading(false);
      return
    }
    const response = await updateServices(datas.id, {
      name,
      status: check,
      specialtyId: specialty.id,
      initialPrice,
      recurringPrice,
    });
    if (response.code) {
      toast.error('Erro ao atualizar serviço');
      setLoading(false);
      return
    }

    setStatus(true);
    toast.success('Serviço atualizado com sucesso');
    closeModal();
    setLoading(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    if (name === '') {
      toast.error('Nome do Serviço é obrigatória.');
      setLoading(false);
      return
    }
    if (specialty.id === 0 || initialPrice === '' || recurringPrice === '') {
      toast.error('Preencha todos os campos.')
      setLoading(false);
      return
    }
    const response = await addServices(
      {
        name,
        status: check,
        specialtyId: specialty.id,
        initialPrice,
        recurringPrice,
      });
    if (response.code) {
      toast.error('Erro ao adicionar serviço');
      setLoading(false);
      return
    }

    setStatus(true);
    toast.success('Serviço adicionado com sucesso');
    closeModal();
    setLoading(false);
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Editar Serviço' : 'Novo Serviço'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {/* <div className=''> */}
          <Input
            label="Nome do Serviço"
            placeholder={'Serviço...'}
            required={true}
            color={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center my-4 gap-2 w-full">
            <Switchi
              label="Status"
              checked={check}
              onChange={() => setCheck(!check)}
            />
            <p className={`text-sm ${check ? 'text-subMain' : 'text-textGray'}`}>
              {check ? 'Ativado' : 'Desativado'}
            </p>
          </div>
          {/* </div> */}
          <div className="flex w-full flex-col">
            <SelectListBox
              label={'Especialidade relacionada'}
              color={true}
              selectedPerson={specialty}
              setSelectedPerson={setSpecialty}
              datas={specialties}
              iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
            />
          </div>
          <div></div>
          <CurrencyInputMask
            label={"Preço do primeiro atendimento"}
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
            value={initialPrice}
            onValueChange={(e) => setInitialPrice(e.target.value)}
            mode={'currency'}
            currency={'BRL'}
            locale={'pt-BR'}
            allowEmpty={true}
            inputClassName={`transitions w-full bg-white text-sm p-4 border 'border-border font-light' 'border-white text-white'
        rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
          />
          <CurrencyInputMask
            label={"Preço dos atendimentos recorrentes"}
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
            value={recurringPrice}
            onValueChange={(e) => setRecurrringPrice(e.target.value)}
            mode={'currency'}
            currency={'BRL'}
            locale={'pt-BR'}
            allowEmpty={true}
            inputClassName={`transitions w-full bg-white text-sm p-4 border 'border-border font-light' 'border-white text-white'
        rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
          />
        </div>

        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
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
      </div>
    </Modal>
  );
}

export default AddEditServiceModal;
