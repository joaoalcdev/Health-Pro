import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Switchi, Select } from '../Form';
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
  const [initialPrice, setInitialPrice] = useState(0);
  const [recurringPrice, setRecurrringPrice] = useState(0);


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
      return toast.error('Nome do Serviço é obrigatória.');
    }
    if (specialty.id === 0 || initialPrice === 0 || recurringPrice === 0) {
      return toast.error('Preencha todos os campos.')
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
      return toast.error('Nome do Serviço é obrigatória.');
    }
    if (specialty.id === 0 || initialPrice === 0 || recurringPrice === 0) {
      return toast.error('Preencha todos os campos.')
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

          <Input
            label="Nome do Serviço"
            color={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center pt-8 gap-2 w-full">
            <Switchi
              label="Status"
              checked={check}
              onChange={() => setCheck(!check)}
            />
            <p className={`text-sm ${check ? 'text-subMain' : 'text-textGray'}`}>
              {check ? 'Ativado' : 'Desativado'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Especialidade relacionada</p>
            <Select
              selectedPerson={specialty}
              setSelectedPerson={setSpecialty}
              datas={specialties}
            >
              <div className="w-full flex-btn text-black text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain overflow-auto">
                {specialty.name}  <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div></div>
          <Input
            label="Preço do primeiro atendimento"
            type="number"
            color={true}
            value={initialPrice}
            placeholder={datas?.price ? datas.price : 0}
            onChange={(e) => setInitialPrice(e.target.value)}
          />
          <Input
            label="Preço dos atendimentos recorrentes"
            type="number"
            color={true}
            value={recurringPrice}
            placeholder={datas?.price ? datas.price : 0}
            onChange={(e) => setRecurrringPrice(e.target.value)}
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
