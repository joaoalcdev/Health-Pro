import { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import {
  Button,
  ButtonNegative,
  Input,
} from '../Form';
import { TbReload } from "react-icons/tb";
import { BiCalendar } from 'react-icons/bi';
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { rescheduleAppointment, deleteAppointment } from '../../api/AppointmentsAPI';
import { weekDays } from '../Datas';


function EventCheckInModal({ closeModal, isOpen, datas, status }) {
  const navigate = useNavigate();

  //controllers
  const [open, setOpen] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [confirmationResponse, setConfirmationResponse] = useState(false);

  //data
  const [checkInName, setCheckInName] = useState("");
  const [signature, setSignature] = useState();
  const [startDate, setStartDate] = useState(datas.start);
  const [startTime, setStartTime] = useState(datas.start);

  const clearPad = () => {
    signature.clear();
  }

  const handleShowReschedule = () => {
    setShowReschedule(!showReschedule);
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
              />
              <Button
                label={'Check-In'}
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      )}

    </Modal >
  );
}

export default EventCheckInModal;
