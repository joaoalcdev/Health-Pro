import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Input, Button, SelectListBox, CurrencyInputField, DatePickerComp } from '../Form';
import { toast } from 'react-hot-toast';
import { addExternalService } from '../../api/ExternalServicesAPI';
import { BiChevronDown } from 'react-icons/bi';

export default function ExternalServiceForm({ onClose, data, status, companies }) {

  const [company, setCompany] = useState(data?.company || { id: 0, name: 'Selecionar Empresa' });
  const [professionalName, setProfessionalName] = useState(data?.professionalName || '');
  const [service, setService] = useState(data?.service || '');
  const [value, setValue] = useState(data?.value || '40');
  const [date, setDate] = useState(data?.date || '');

  //controllers
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleSave = async () => {
    setLoading(true);
    if (company.id === 0 || professionalName === '' || value === '' || date === '' || service === '') {
      setLoading(false);
      return toast.error('Todos os campos são obrigatórios');
    }

    const response = await addExternalService({
      companyId: company.id,
      professionalName,
      value: Number(value.replace('R$ ', '').replace(',', '.')),
      service,
      date: date.toISOString(),
    });

    if (response.code) {
      setLoading(false);
      return toast.error(response.message);
    }
    setLoading(false);
    toast.success('Registro adicionado com sucesso');
    status();
    onClose();
  };

  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
        <h1 className="text-md font-semibold">{"Registrar serviço"}</h1>
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
          <SelectListBox
            color={true}
            selectedPerson={company}
            setSelectedPerson={setCompany}
            datas={companies}
            loading={loading}
            iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
          />

          <div div className="flex w-full flex-col gap-1 ">
            <p className="text-black text-sm">Data de início</p>
            <DatePickerComp
              color={true}
              scrollableYearDropdown={true}
              closeOnScroll={true}
              popperPlacement="top-end"
              dateFormat="dd/MM/yyyy - HH:mm"
              placeholderText={'__/__/____'}
              locale="pt"
              startDate={date}
              showTimeSelect={true}
              onChange={(date) => {
                setDate(date)
                // setIsDisabled(false)
              }}
            />
          </div>

          <Input
            label="Nome Profissional"
            color={true}
            value={professionalName}
            placeholder={'Digite o nome do Profissional'}
            onChange={(e) => {
              setProfessionalName(e.target.value)
              setDisabled(false)
            }}
          />

          <Input
            label="Serviço"
            color={true}
            value={service}
            placeholder={'Digite o nome do Serviço'}
            onChange={(e) => {
              setService(e.target.value)
              setDisabled(false)
            }}
          />

          <CurrencyInputField
            label="Valor"
            color={true}
            value={value}
            placeholder={'Digite o valor'}
            onChange={(e) => {
              setValue(e.target.value)
              setDisabled(false)
            }}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'R$ '}
          />
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
              label={"Adicionar"}
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