import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import {
  Button,
  ButtonNegative,
  Input,
} from '../Form';
import { TbReload } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import { eventCheckIn, updateEvent } from '../../api/EventsAPI';



function EventCheckInModal({ closeModal, isOpen, datas, status }) {
  const navigate = useNavigate();

  //controllers
  const [confirmationResponse, setConfirmationResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //data
  const [checkInName, setCheckInName] = useState("");
  const [signature, setSignature] = useState();

  useEffect(() => {
    console.log(datas)
  }, [])

  const clearPad = () => {
    signature.clear();
  }

  const handleCheckIn = () => {
    setLoading(true);
    setDisabled(true);
    const data = {
      checkInName: checkInName,
      checkInSignature: signature.toDataURL('image/jpg'),
    };

    const response = eventCheckIn(data, datas.eventInstanceId);
    if (response.response && response.response.status >= 400) {
      toast.error('Check-In não realizado, tente novamente!');
      setLoading(false)
      setDisabled(false)
      return
    }

    toast.success('Check-In realizado com sucesso!');
    setLoading(false);
    setDisabled(true);
    status(true);
    closeModal();
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={'Check-In'}
      width={'max-w-xl'}
      height={'sm:h-[65%vh]'}
    >
      {!confirmationResponse && (
        <div className="pb-4 text-left">
          <p>
            Voce deseja realizar o check-in para esse agendamento?
          </p>
          <div className='w-full flex justify-end items-end'>

            <div className="w-[50%] grid grid-cols-2 gap-4 mt-8 justify-end">
              <ButtonNegative
                label={'Não'}
                onClick={closeModal}
              />
              <Button
                label={'Sim'}
                onClick={() => {
                  setConfirmationResponse(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {confirmationResponse && (
        <div className="pb-4 flex flex-col gap-4 text-left">
          <Input
            label="Nome do responsável pelo check-in"
            value={checkInName}
            color={true}
            type="text"
            onChange={(e) => {
              setCheckInName(e.target.value);
            }}
          />
          <div className='relative border border-subMain rounded-lg'>
            <SignatureCanvas
              ref={(ref) => setSignature(ref)}
              minWidth={2}
              maxWidth={2}
              backgroundColor={'#f5f5f5'}
              canvasProps={{ className: 'sigCanvas w-full h-auto rounded-lg ' }}
            />
            <span className='absolute bottom-0 right-0 p-2 text-subMain cursor-pointer' onClick={clearPad}>
              <TbReload className='w-7 h-7' />
            </span>
          </div>
          <div className='w-full flex justify-end items-end'>
            <div className="w-full grid grid-cols-2 gap-4 mt-4 justify-end">
              <ButtonNegative
                label={'Cancelar'}
                onClick={closeModal}
              />
              <Button
                label={'Check-In'}
                loading={loading}
                disabled={checkInName === "" || loading || disabled}
                onClick={handleCheckIn}
              />
            </div>
          </div>
        </div>
      )}

    </Modal >
  );
}

export default EventCheckInModal;
