import { useState, useEffect } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import { Input, Button, Toggle, CurrencyInputMask } from '../Form';
import { toast } from 'react-hot-toast';
import { addSpecialties, updateSpecialties } from '../../api/specialtiesAPI';
import 'moment/locale/pt-br';

export default function SpecialtyForm({ onClose, datas, agreements, status, isEdit }) {

  const [check, setCheck] = useState(true);
  const [name, setName] = useState('');
  const [prices, setPrices] = useState([]);

  //datas

  //controllers
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    //If isAdd so pricesData is filled with default prices
    let pricesData = agreements.map((price) => {
      return {
        agreementId: price.id,
        name: price.name,
        price: price.defaultPrice
      }
    })

    //If isEdit so pricesData is filled with the prices from the datas.
    if (datas.name) {
      setName(datas.name);
      setCheck(datas.deletedAt ? false : true);
      agreements.forEach((agreement, index) => {
        datas.regularPrices.forEach((price, index) => {
          if (agreement.id === price.agreementId) {
            pricesData[price.agreementId - 1].price = price.price
          }
        })
      })
    }
    setPrices(pricesData)
  }, []);

  const handleSave = async () => {
    setLoading(true);
    if (name === '') {
      return toast.error('Especialidade é obrigatória');
    }

    console.log('prices', prices)
    const response = isEdit ? await updateSpecialties(datas.id, { name, status: check, prices })
      : await addSpecialties({ name, status: check, prices });
    if (response.code) {
      if (response.response.data.code === "23505") {
        toast.error('Especialidade já existe');
        setLoading(false);
        return
      }
      toast.error(`Erro ao ${isEdit ? 'editar' : 'adicionar'} especialidade`);
      setLoading(false);
      return
    }
    status(true);
    toast.success(`Especialidade ${isEdit ? 'atualizada' : 'adicionada'} com sucesso`);
    onClose();
    setLoading(false);
  };

  const onPriceChange = (e, index) => {
    let newPrices = [...prices]
    newPrices[index].price = e.value
    setPrices(newPrices)
    setDisabled(false)
  }

  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
        <h1 className="text-md font-semibold">{isEdit ? "Editar Especialidade" : "Nova Especialidade"}</h1>
        <button
          onClick={onClose}
          className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
        {/* Specialty */}
        <div className={`flex w-full flex-col gap-4`}>
          <Input
            label="Nome da Especialidade"
            color={true}
            value={name}
            placeholder={'Digite o nome da Especialidade'}
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
          <div className='flex flex-col gap-2 border border-subMain p-4 rounded-lg'>
            <h1 className='text-subMain '>
              Defina os preços para Consultas/Avaliações:
            </h1>
            {prices.length > 0 && prices.map((item, index) => (
              <div key={index} className=''>
                <CurrencyInputMask
                  label={item?.name}
                  color={true}
                  inputStyle={{ color: 'black' }}
                  unstyled={true}
                  autoClear={false}
                  maxFractionDigits={2}
                  maxLength={12}
                  unmask={true}
                  required={false}
                  inputId={'currency-brazil'}
                  value={item.price}
                  onChange={(e) => { onPriceChange(e, index) }}
                  mode={'currency'}
                  currency={'BRL'}
                  locale={'pt-BR'}
                  allowEmpty={true}
                  inputClassName={`w-[50%] bg-white transitions text-sm p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
                />
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