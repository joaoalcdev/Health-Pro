import { useEffect, useState } from "react";
import { CurrencyInputMask, Button } from "../Form";
import { editPayroll } from "../../api/PaymentsAPI";
import toast from "react-hot-toast";

export default function EditEventForm({ event, onStatus }) {

  //controllers
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //variables
  const [grossValue, setGrossValue] = useState(event.grossValue);
  const [professionalRate, setProfessionalRate] = useState(event.professionalRate);
  const [tax, setTax] = useState(event.tax);
  const [profit, setProfit] = useState(event.profit);

  const handleSave = async () => {
    setLoading(true);
    setDisabled(true);
    console.log(event.eventInstanceId, grossValue, professionalRate, tax, profit);
    const response = await editPayroll(event.eventInstanceId, {
      grossValue,
      professionalRate,
      tax,
      profit
    });

    if (response.code === 400) {
      toast.error(response.message);
      setLoading(false);
      setDisabled(false);
    }

    if (response.code === 200) {
      toast.success('Evento atualizado com sucesso!');
      setLoading(false);
      setDisabled(false);
      onStatus();
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-4 gap-2'>
        <CurrencyInputMask
          label={'Valor'}
          color={true}
          type='number'
          maxFractionDigits={2}
          maxLength={12}
          value={grossValue}
          mode={'currency'}
          inputId={'currency-brazil'}
          currency={'BRL'}
          locale={'pt-BR'}
          allowEmpty={false}
          onChange={(e) => {
            setGrossValue(e.value)
            setDisabled(false);
          }}
          inputClassName={`w-full bg-white transitions text-lg p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
        />
        <CurrencyInputMask
          label={'Profissional'}
          color={true}
          type='number'
          maxFractionDigits={2}
          maxLength={12}
          value={professionalRate}
          mode={'currency'}
          inputId={'currency-brazil'}
          currency={'BRL'}
          locale={'pt-BR'}
          allowEmpty={false}
          onChange={(e) => {
            setProfessionalRate(e.value)
            setDisabled(false);
          }
          }
          inputClassName={`w-full bg-white transitions text-lg p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
        />
        <CurrencyInputMask
          label={'Imposto'}
          color={true}
          type='number'
          maxFractionDigits={2}
          maxLength={12}
          value={tax}
          mode={'currency'}
          inputId={'currency-brazil'}
          currency={'BRL'}
          locale={'pt-BR'}
          allowEmpty={false}
          onChange={(e) => {
            setTax(e.value)
            setDisabled(false);
          }}
          inputClassName={`w-full bg-white transitions text-lg p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
        />
        <CurrencyInputMask
          label={'Clínica'}
          color={true}
          type='number'
          maxFractionDigits={2}
          maxLength={12}
          value={profit}
          mode={'currency'}
          inputId={'currency-brazil'}
          currency={'BRL'}
          locale={'pt-BR'}
          allowEmpty={false}
          onChange={(e) => {
            setProfit(e.value)
            setDisabled(false);
          }}
          inputClassName={`w-full bg-white transitions text-lg p-4 border  'border-border font-light' 'border-white text-white' rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
        />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='col-start-2'>
          <Button
            label={'Salvar'}
            onClick={handleSave}
            loading={loading}
            disabled={disabled}
          />
        </div>
      </div>
    </div>

  )

}