import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ closeModal, isOpen, width, height, children, title }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={` w-full ${width ? width : 'max-w-4xl'} h-full ${height ? height : 'max-h-screen'} overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div className="w-full flex-btn gap-2 mb-4">
                    <h1 className="text-md font-semibold">{title}</h1>
                    <button
                      onClick={closeModal}
                      className="w-14 h-12 bg-dry text-red-600 rounded-md flex-colo"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}