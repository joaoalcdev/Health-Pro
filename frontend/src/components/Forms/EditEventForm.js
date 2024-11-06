import { useEffect, useState } from "react";
import { CurrencyInputMask, Button, CurrencyInputField } from "../Form";
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
        <CurrencyInputField
          label={'Valor Bruto'}
          color={true}
          allowEmpty={true}
          autoFocus={false}
          selectAllOnFocus={false}
          prefix={'R$ '}
          suffix={''}
          decimalSeparator={','}
          thousandSeparator={'.'}
          value={grossValue}
          onChange={(e) => {
            setGrossValue(Number(e.target.value.split('R$ ').join('').split('.').join('').split(',').join('.')))
            setDisabled(false);
          }}
        />
        <CurrencyInputField
          label={'Profissional'}
          color={true}
          allowEmpty={true}
          autoFocus={false}
          selectAllOnFocus={false}
          prefix={'R$ '}
          suffix={''}
          decimalSeparator={','}
          thousandSeparator={'.'}
          value={professionalRate}
          onChange={(e) => {
            setProfessionalRate(Number(e.target.value.split('R$ ').join('').split('.').join('').split(',').join('.')))
            setDisabled(false);
          }}
        />
        <CurrencyInputField
          label={'Imposto'}
          color={true}
          allowEmpty={true}
          autoFocus={false}
          selectAllOnFocus={false}
          prefix={'R$ '}
          suffix={''}
          decimalSeparator={','}
          thousandSeparator={'.'}
          value={tax}
          onChange={(e) => {
            setTax(Number(e.target.value.split('R$ ').join('').split('.').join('').split(',').join('.')))
            setDisabled(false);
          }}
        />
        <CurrencyInputField
          label={'Clínica'}
          color={true}
          allowEmpty={true}
          autoFocus={false}
          selectAllOnFocus={false}
          prefix={'R$ '}
          suffix={''}
          decimalSeparator={','}
          thousandSeparator={'.'}
          value={profit}
          onChange={(e) => {
            console.log(e.target.value)
            setProfit(Number(e.target.value.split('R$ ').join('').split('.').join('').split(',').join('.')))
            setDisabled(false);
          }}
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