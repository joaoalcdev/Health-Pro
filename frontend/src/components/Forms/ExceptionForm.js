import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Input, Button, Toggle, CurrencyInputMask, SelectListBox } from '../Form';
import { toast } from 'react-hot-toast';
import 'moment/locale/pt-br';
import { getAgreements } from '../../api/AgreementsAPI';
import { addPaymentException } from '../../api/ProfessionalsAPI';

export default function ExceptionForm({ onClose, datas, onStatus }) {


  //datas
  const [agreementsList, setAgreements] = useState([]);
  const [agreement, setAgreement] = useState({});
  const [value, setValue] = useState();



  //controllers
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  //get agreements List
  useEffect(() => {
    getAgreements().then(data => {
      setAgreements(data)
      setAgreement(data[0])
    })
    setLoading(false)
  }, [])

  //clear value input when agreement changes
  useEffect(() => {
    setValue()
    setDisabled(true)
  }, [agreement])

  const handleSave = async () => {
    setLoading(true);
    const response = await addPaymentException(datas.id, {
      agreementId: agreement.id,
      professionalPayment: value
    });
    if (response.status === 200) {
      toast.success('Excessão adicionada com sucesso');
      onClose();
      onStatus(true);
    } else {
      toast.error('Erro ao adicionar excessão');
    }
  };

  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-center inset-x-0 top-0 gap-2 px-4 py-4">
        <h1 className="text-lg font-semibold">Repasses</h1>
        <button
          onClick={onClose}
          className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className={`fixed inset-x-0 top-16 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
        <h1 className="text-md font-semibold">Adicionar Excessões </h1>
        {loading ? <p>Carregando...</p>
          :
          <div className="grid grid-cols-1 gap-4">
            <SelectListBox
              label="Convênio"
              color={true}
              selectedPerson={agreement}
              setSelectedPerson={setAgreement}
              datas={agreementsList}
            />
            <div className="flex flex-col gap-4">
              <Input
                label="Valor (%)"
                type="number"
                color={true}
                required={true}
                placeholder="Digite o valor"
                onChange={(e) => {
                  setValue(e.target.value)
                  setDisabled(false)
                }}
              />
              <p className="text-sm text-black font-light">
                ATENÇÃO: Informe o valor em porcentagem que será repassado para a clínica.
              </p>
            </div>
          </div>
        }
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
              label={"Salvar"}
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