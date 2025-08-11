import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Input, Button, Toggle, CurrencyInputMask, SelectListBox } from '../Form';
import { toast } from 'react-hot-toast';
import 'moment/locale/pt-br';
import { addServices, updateServices } from '../../api/ServicesAPI';

export default function ServiceForm({ onClose, datas, agreements, specialties, specialtyId, status, isEdit }) {

  const [check, setCheck] = useState(true);
  const [hasCustomDuration, setHasCustomDuration] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(datas.customDuration ? datas.customDuration : 30);
  const [prices, setPrices] = useState([]);
  const [specialty, setSpecialty] = useState({});

  //datas

  //controllers
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setSpecialty(specialties[1])

    //If isAdd so pricesData is filled with default prices
    let pricesData = agreements.map((price) => {
      return {
        agreementId: price.id,
        name: price.name,
        price: price.defaultPrice,
        professionalPayment: price.professionalPaymentDefault
      }
    })

    //If isEdit so pricesData is filled with the prices from the datas.
    if (datas.name) {
      setName(datas.name);
      setCheck(datas.deletedAt ? false : true);
      setSpecialty(specialties.find((item) => item.id === datas.specialtyId))
      if (datas.customDuration) {
        setHasCustomDuration(true)
        setDuration(datas.customDuration)
      }
      agreements.forEach((agreement, index) => {
        datas.prices.forEach((price, index) => {
          if (agreement.id === price.agreementId) {
            pricesData[price.agreementId - 1].price = price.price
            pricesData[price.agreementId - 1].professionalPayment = price.professionalPayment ? price.professionalPayment : 0
          }
        })
      })
    }
    if (specialtyId) {
      setSpecialty(specialties.find((item) => item.id === specialtyId))
    }
    setPrices(pricesData)
  }, []);

  const handleSave = async () => {
    setLoading(true);
    if (name === '') {
      setLoading(false);
      return toast.error('Nome do Serviço é obrigatória');
    }
    const response = isEdit ? await updateServices(datas.id, { name, status: check, specialtyId: specialty.id, prices, duration: hasCustomDuration ? duration : null })
      : await addServices({ name, status: check, specialtyId: specialty.id, prices, duration: hasCustomDuration ? duration : null });
    if (response.code) {
      if (response.response.data.code === "23505") {
        toast.error('Especialidade já existe');
        setLoading(false);
        return
      }
      toast.error(`Erro ao ${isEdit ? 'editar' : 'adicionar'} serviço`);
      setLoading(false);
      return
    }
    status(true);
    toast.success(`Serviço ${isEdit ? 'atualizada' : 'adicionada'} com sucesso`);
    onClose();
    setLoading(false);
  };

  const CHANGE_PRICE = 1;
  const CHANGE_REPASSE = 2;

  const onPriceChange = (e, index, type) => {
    let newPrices = [...prices];
    if (type === CHANGE_PRICE)
      newPrices[index].price = e.target.value < 0 ? 0 : e.target.value;
    if (type === CHANGE_REPASSE)
      newPrices[index].professionalPayment = e.target.value < 0 ? 0 : e.target.value;
    setPrices(newPrices);
    setDisabled(false);
  }

  // useEffect(() => {
  //   if (!hasCustomDuration) {
  //     setDuration(30)
  //   }
  // }, [hasCustomDuration])

  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
        <h1 className="text-md font-semibold">{isEdit ? "Editar Serviço" : "Novo Serviço"}</h1>
        <button
          onClick={onClose}
          className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
        <div>
          <SelectListBox
            label="Especialidade"
            datas={specialties}
            selectedPerson={specialty}
            setSelectedPerson={setSpecialty}
            color={true}
            disabled={isEdit}
          />
        </div>
        {/* Service */}
        <div className={`flex w-full flex-col gap-4`}>
          <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2'>
              <Input
                label="Nome do Serviço"
                color={true}
                value={name}
                placeholder={'Digite o nome do Serviço'}
                onChange={(e) => {
                  setName(e.target.value)
                  setDisabled(false)
                }}
              />
            </div>

            <div className="flex flex-col gap-4 w-full items-center">
              <p className={`text-sm ${check ? 'text-subMain' : 'text-textGray'}`}>
                {check ? 'Ativado' : 'Desativado'}
              </p>
              <Toggle
                label="Status"
                checked={check}
                onChange={() => {
                  setCheck(!check)
                  setDisabled(false)
                }}
              />

            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className="flex flex-col gap-4 w-full items-start">
              <p className={`text-sm ${hasCustomDuration ? 'text-subMain' : 'text-textGray'}`}>
                Duração personalizada?
              </p>
              <Toggle
                label="Status"
                checked={hasCustomDuration}
                onChange={() => {
                  if (hasCustomDuration) {
                    setDuration(30)
                  }
                  setHasCustomDuration(!hasCustomDuration)
                  setDisabled(false)
                }}
              />
            </div>
            <div >
              <Input
                label="Duração (min)"
                color={true}
                value={duration}
                disabled={!hasCustomDuration}
                placeholder={'30 minutos'}
                onChange={(e) => {
                  setDuration(e.target.value)
                  setDisabled(false)
                }}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 border border-subMain p-4 rounded-lg'>
            <h1 className='text-subMain '>
              Defina os preços para Consultas/Avaliações:
            </h1>
            {prices.length > 0 && prices.map((item, index) => (
              <div key={index} className='grid grid-cols-2 gap-4'>
                <CurrencyInputMask
                  label={item?.name}
                  color={true}
                  inputStyle={{ color: 'black' }}
                  unstyled={true}
                  autoClear={false}
                  maxFractionDigits={2}
                  maxLength={12}
                  unmask={true}
                  required={true}
                  inputId={'currency-brazil'}
                  value={item.price}
                  onValueChange={(e) => { onPriceChange(e, index, CHANGE_PRICE) }}
                  mode={'currency'}
                  currency={'BRL'}
                  locale={'pt-BR'}
                  allowEmpty={true}
                  inputClassName={`w-full bg-white transitions text-sm p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
                />
                {item?.agreementId === 1 ?
                  <Input
                    label="p/ Clínica (%)"
                    type="number"
                    color={true}
                    value={item.professionalPayment}
                    placeholder="Digite o valor"
                    onChange={(e) => { onPriceChange(e, index, CHANGE_REPASSE) }}
                  />
                  :
                  <CurrencyInputMask
                    label={'p/ o Profissional'}
                    color={true}
                    inputStyle={{ color: 'black' }}
                    unstyled={true}
                    autoClear={false}
                    maxFractionDigits={2}
                    maxLength={12}
                    unmask={true}
                    required={false}
                    inputId={'currency-brazil'}
                    value={item.professionalPayment}
                    onValueChange={(e) => { onPriceChange(e, index, CHANGE_REPASSE) }}
                    mode={'currency'}
                    currency={'BRL'}
                    locale={'pt-BR'}
                    allowEmpty={true}
                    inputClassName={`w-full bg-white transitions text-sm p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
                  />
                }
              </div>
            ))}
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