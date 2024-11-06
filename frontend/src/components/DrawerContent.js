import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { SingleEventDisclosure } from './Disclosures';
import EditEventForm from './Forms/EditEventForm';

import 'moment/locale/pt-br';

export default function DrawerContent({ onClose, datas, agreementName, professionalName, onStatus }) {

  const hideOtherDisclosuresHandle = (_id) => {
    const buttons = document.querySelectorAll('button.drawer[data-headlessui-state="open"]');
    buttons.forEach(button => {
      if (button?.id !== _id) {
        //@ts-ignore: Unreachable code error
        button?.click();
      }
    });
  };

  return (
    <div className='relative h-full z-50 grid grid-cols-1'>
      {/* Header */}
      <div className="fixed w-full flex max-h-20 justify-between items-top inset-x-0 top-0 gap-2 px-4 py-4">
        <div className='flex flex-col gap-2'>
          <h1 className="text-xl font-semibold ">{professionalName}</h1>
          <h1 className="text-lg font-semibold text-gray-500">{datas.serviceName}</h1>
          <h1 className="text-md font-semibold">{agreementName}</h1>
        </div>
        <button
          onClick={onClose}
          className="w-14 h-8 bg-dry text-red-600 rounded-md flex-colo"
        >
          <FaTimes />
        </button>

      </div>

      {/* Body */}
      <div className={`fixed inset-x-0 top-28 grid grid-cols-1 gap-4 content-start p-4 h-calc overflow-auto `}>
        <div className='flex flex-col gap-4 w-full'>
          {datas.events.map((event, index) => {
            return (
              <SingleEventDisclosure
                key={index}
                data={event}
                index={index}
                //onEdit={handleSetFormDatas}
                className='drawer flex justify-between items-center border border-subMain rounded-lg gap-4 cursor-pointer'
                hideOtherDisclosuresHandle={hideOtherDisclosuresHandle}
              >
                <EditEventForm
                  event={event}
                  onStatus={onStatus}
                />
              </SingleEventDisclosure>
            )
          })
          }
        </div>

      </div >

      {/* Footer */}
      <div className="fixed flex inset-x-0 bottom-0 p-4 " >

      </div>
    </div >
  );

}