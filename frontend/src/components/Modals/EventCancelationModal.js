import { useEffect, useState } from 'react';
import Modal from './Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Button } from '../Form';
import { RadioGroup, Radio } from '@headlessui/react';


function EventCancelationModal({ title, closeModal, isOpen, onConfirm, question, user, loading, setCancelationType, eventType }) {
  const options = [
    { id: 1, label: 'Somente este agendamento', value: 'cancelOne' },
    { id: 2, label: 'Desmarcar TODOS', value: 'cancelAll' }
  ]

  const [selected, setSelected] = useState(1);

  useEffect(() => {
    setCancelationType(selected)
  }, [selected])

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={title}
      width={'max-w-xl'}
    >
      <div className="flex flex-col gap-6 ">
        <div className="flex">
          <div className="w-full">
            {question}
          </div>
        </div>
        {eventType < 4 && (
          <div className="w-full ">
            <RadioGroup
              value={selected}
              onChange={setSelected}
              className="space-y-2 mr-2"
            >
              {options.map((item, key) => {
                return (
                  <Radio
                    key={item.id}
                    value={item.id}
                    checked={selected === item.id}
                    className="group relative flex cursor-pointer rounded-lg bg-white py-4 px-5 text-black border border-border transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-subMain data-[checked]:text-white data-[checked]:shadow-none"
                  >
                    <>
                      <h1 className="text-sm">
                        {item.label}
                      </h1>

                    </>
                  </Radio>
                )
              })
              }
            </RadioGroup>
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 text-white text-sm p-4 rounded font-light"
          >
            Cancelar
          </button>
          <Button label={eventType < 4 ? "Continuar" : "Sim, Continuar"} disable={loading} loading={loading} Icon={RiDeleteBin6Line} onClick={onConfirm} />

        </div>
      </div>
    </Modal >
  );
}

export default EventCancelationModal;
