import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import SignatureCanvas from 'react-signature-canvas';
import {
  Button,
  ButtonNegative,
  Input,
} from '../Form';
import { TbReload } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import { eventCheckIn } from '../../api/EventsAPI';



function EventCheckInModal({ closeModal, isOpen, datas, status }) {

  //controllers
  const [confirmationResponse, setConfirmationResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  //data
  const [checkInName, setCheckInName] = useState("");
  const [finalSignature, setFinalSignature] = useState("");
  const [signature, setSignature] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const container = useRef(null);

  useEffect(() => {
    setWidth(container.current ? container.current.offsetWidth : 0);
    setHeight(container.current ? container.current.offsetHeight : 0);
  }, [container.current]);

  const clearPad = () => {
    signature.clear();
  }

  const handleCheckIn = async () => {
    setLoading(true);
    setDisabled(true);

    const response = await eventCheckIn({
      eventId: datas.id,
      eventType: datas.eventType,
      checkInName: checkInName,
      checkInSignature: finalSignature.split(';base64,')[1],
    }, datas.eventInstanceId);

    if (response.response && response.response.status >= 400) {
      toast.error('Check-In não realizado, tente novamente!');
      setLoading(false)
      setDisabled(false)
      return
    }
    status(true);
    toast.success('Check-In realizado com sucesso!');
    setLoading(false);
    setDisabled(true);
    closeModal();
  }

  const handleCloseSignatureModal = () => {
    console.log(signature.toDataURL());
    setIsSignatureModalOpen(false);
  }

  const handleSaveSignature = () => {
    setFinalSignature(signature.getTrimmedCanvas().toDataURL('image/png'));
    setIsSignatureModalOpen(false);
  }

  return (<>
    {isSignatureModalOpen && (
      <Modal
        closeModal={handleCloseSignatureModal}
        isOpen={isSignatureModalOpen}
        title={'Assinatura'}
        width={'max-w-[90vw]'}
        width={'max-w-[90vw]'}
      >
        <>
          <div ref={container} className='relative h-[40vh] sm:h-[60vh]  border border-subMain rounded-lg'>

            <SignatureCanvas
              ref={(ref) => setSignature(ref)}
              minWidth={1}
              maxWidth={1}
              clearOnResize={true}
              canvasProps={{ className: 'sigCanvas w-full h-full rounded-lg', width: width, height: height }}
            />

            <span className='absolute bottom-0 right-0 p-2 text-subMain cursor-pointer' onClick={clearPad}>
              <TbReload className='w-7 h-7' />
            </span>
          </div>
          <div className="w-full grid grid-cols-4 gap-4 mt-4 justify-end">
            <div className='col-start-3 col-end-4'>
              <ButtonNegative
                label={'Cancelar'}
                onClick={handleCloseSignatureModal}
              />
            </div>
            <div >
              <Button
                label={'Salvar'}
                onClick={handleSaveSignature}
              />
            </div>
          </div>
        </>
      </Modal>
    )
    }
    {isOpen && !isSignatureModalOpen &&

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
          <div className="flex flex-col gap-4 text-left">
            <Input
              label="Nome do responsável pelo check-in"
              value={checkInName}
              placeholder={'Maria da Silva'}
              color={true}
              type="text"
              onChange={(e) => {
                setCheckInName(e.target.value);
              }}
            />
            {finalSignature === "" ?

              <div>
                <Button
                  label={'Assinar'}
                  onClick={() => {
                    setIsSignatureModalOpen(true)
                  }}
                  disabled={checkInName === "" || loading || disabled}
                  className='w-full'
                />
              </div>
              :
              <div className='relative w-full flex justify-center items-center border border-subMain rounded-lg p-4'>
                <img src={finalSignature} alt="assinatura" className='w-full max-h-[40vh]' />
                <span className='absolute top-0 right-0 p-2 text-subMain cursor-pointer' onClick={() => setIsSignatureModalOpen(true)}>
                  <TbReload className='w-7 h-7' />
                </span>
              </div>
            }
            <div className='w-full flex justify-end items-end'>
              <div className="w-full grid grid-cols-2 gap-4 justify-end">
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
    }
  </>
  );
}

export default EventCheckInModal;
