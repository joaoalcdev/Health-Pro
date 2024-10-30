import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { Fragment } from 'react'
import { moneyFormat2BR } from '../utils/moneyFormatBR'
import { IoIosArrowForward } from "react-icons/io";
import Toast from './Notifications/Toast'
import toast from 'react-hot-toast'

export function SpecialtyDisclosure({ data, subTitle, children, hideOtherDisclosuresHandle, keyIndex }) {
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <div>
          <DisclosureButton className={`w-full group grid grid-cols-2 gap-2 justify-start p-4 border border-subMain ${open ? 'bg-subMain text-white rounded-t-lg' : 'bg-white text-subMain rounded-lg hover:bg-greyed'}`}
            id={keyIndex}
            onClick={() => hideOtherDisclosuresHandle(keyIndex)}

          >
            <div className='text-start'>
              {data.name}
            </div>
            <div className='flex justify-between items-center'>
              <div className=''>
                {subTitle}
              </div>
              <BiChevronDown className="w-5 group-data-[open]:rotate-180 text-xl" />
            </div>
          </DisclosureButton>
          <div className="overflow-hidden ">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={Fragment} className={"flex p-4 rounded-b-lg border border-subMain"}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    {children}
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Disclosure>
  )
}

export function ServiceDisclosure({ data, subTitle, children }) {
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <>
          <DisclosureButton className={`w-full group grid grid-cols-2 items-center gap-2  p-4 border border-subMain bg-white text-subMain ${open ? 'rounded-t-lg border-b-0' : ' rounded-lg hover:bg-greyed'}`}>
            <div className='text-start leading-[2.8rem]'>
              {data.name}
            </div>
            <div className='flex justify-between items-center'>
              <div className=''>
                {!open && subTitle}
              </div>
              <BiChevronDown className="w-5 group-data-[open]:rotate-180 text-xl" />
            </div>
          </DisclosureButton>
          <div className="overflow-hidden ">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={Fragment} className={"flex p-4 rounded-b-lg border border-t-0 border-subMain"}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    {children}
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export function ServiceDisclosureSubTitle({ data }) {
  return (
    data && data.length > 0 ? (
      <div className="flex items-center gap-20">
        {data.map((item, index) => {
          if (item.agreementId <= 2) {
            return (
              <div className="flex flex-col items-center" key={index}>
                <span className="text-sm text-subMain">{item.agreementName}</span>
                <span className="text-subMain">R$ {item.price}</span>
              </div>
            )
          } else { return '' }
        })}
      </div>) : ''
  )
}

export function ServiceDisclosureChildren({ data }) {
  return (
    data && data.length > 0 ? (
      <div className="flex felx-col gap-10">
        {data.map((item, index) => {
          return (
            <div className="flex flex-col p-2 items-center" key={index}>
              <span className="text-sm text-subMain">{item.agreementName}</span>
              <span className="text-subMain">R$ {item.price}</span>
            </div>
          )
        })}
      </div>) : ''
  )
}

export function PaymentsProfessionalsDisclosure({ data, subTitle, children, hideOtherDisclosuresHandle, keyIndex }) {
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <div>
          <DisclosureButton className={`w-full items-center group grid  gap-1 justify-start p-4 border border-subMain ${open ? 'bg-subMain text-white rounded-t-lg justify-center' : 'grid-cols-3 bg-white text-subMain rounded-lg hover:bg-greyed'}`}
            id={keyIndex}
            onClick={() => hideOtherDisclosuresHandle(keyIndex)}
          >
            <div className={`text-xl ${open ? 'text-center  font-semibold' : 'text-start'}`}>
              {data.professionalName}
            </div>
            {!open &&

              <div className='flex justify-between items-center col-span-2'>
                <div className=''>
                  {!open && subTitle}
                </div>
                <BiChevronDown className="w-5 group-data-[open]:rotate-180 text-xl" />
              </div>
            }
          </DisclosureButton>
          <div className="overflow-hidden ">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={Fragment} className={"flex rounded-b-lg border border-subMain"}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    {children}
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Disclosure>
  )
}

export function PaymentsProfessionalsDisclosureSubTitle({ data }) {
  return (
    data && (
      <div className="grid grid-cols-5 items-center gap-8">
        <div className="flex flex-col items-center" >
          <span className="text-md text-subMain">{data.qty}</span>
        </div>
        <div className="flex flex-col items-center" >
          <span className="text-md text-subMain">{moneyFormat2BR(data.professionalGrossValue)}</span>
          <span className="text-sm text-gray-600">Produção</span>
        </div>
        <div className="flex flex-col items-center" >
          <span className="text-md text-subMain">{moneyFormat2BR(data.professionalAmountDue)}</span>
          <span className="text-sm text-gray-600">Repasse</span>
        </div>
        <div className="flex flex-col items-center" >
          <span className="text-md text-subMain">{moneyFormat2BR(data.professionalTax)}</span>
          <span className="text-sm text-gray-600">Imposto</span>
        </div>
        <div className="flex flex-col items-center" >
          <span className="text-md text-subMain">{moneyFormat2BR(data.professionalProfit)}</span>
          <span className="text-sm text-gray-600">Saldo Clínica</span>
        </div>
      </div>
    )
  )
}

export function PaymentsAgreementsDisclosure({ data, subTitle, children }) {
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <>
          <DisclosureButton className={`w-full group grid grid-cols-2 items-center gap-4 px-4 py-1 border-b  border-subMain  text-subMain ${open ? 'rounded-t-lg border-b-0  bg-greyed' : 'rounded-lg bg-white hover:bg-greyed'}`}>
            <div className='text-xl text-start leading-[2.8rem]'>
              {data.agreementName}
            </div>
            <div className='flex w-full justify-between items-center '>
              <div className=''>
                {!open && subTitle}
              </div>
              <BiChevronDown className="w-5 group-data-[open]:rotate-180 text-xl" />
            </div>
          </DisclosureButton>
          <div className="overflow-hidden ">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={Fragment} className={"flex rounded-b-lg border-b border-subMain bg-greyed"}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    {children}
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </>
      )
      }
    </Disclosure >
  )
}

export function PaymentsAgreementsDisclosureSubTitle({ data }) {
  return (
    <div className="w-full grid grid-cols-4 items-center gap-6 justify-between">
      <div className="flex flex-col items-center" >
        <span className="text-md text-subMain">{data.qty}</span>
      </div>
      <div className="flex flex-col items-center" >
        <span className="text-md text-subMain">{moneyFormat2BR(data.total)}</span>
        <span className="text-sm text-gray-600">Produção</span>
      </div>
      <div className="flex flex-col items-center" >
        <span className="text-md text-subMain">{moneyFormat2BR(data.amountDue)}</span>
        <span className="text-sm text-gray-600">Repasse</span>
      </div>
      <div className="flex flex-col items-center" >
        <span className="text-md text-subMain">{moneyFormat2BR(data.tax)}</span>
        <span className="text-sm text-gray-600">Imposto</span>
      </div>
      {/* <div className="flex flex-col items-center" >
        <span className="text-md text-subMain">{moneyFormat2BR(data.profit)}</span>
        <span className="text-sm text-gray-600">Saldo Clínica</span>
      </div> */}
    </div>
  )
}

export function PaymentsAgreementsDisclosureChildren({ data, handleClick }) {
  const services = data.events
  return (
    <div className="flex felx-col gap-4 p-4">
      <div className='grid grid-cols-3 w-full gap-10'>
        <div className="flex flex-col gap-2" >
          <div className='grid grid-cols-2 gap-2 justify-between border-b border-subMain'>
            <span className="text-black">Quantidade</span>
            <span className=" text-black font-semibold text-right">{data.qty}</span>
          </div>
          <div className='grid grid-cols-2 gap-2 justify-between border-b border-subMain'>
            <span className="text-black">Produção</span>
            <span className=" text-black font-semibold text-right">{moneyFormat2BR(data.total)}</span>
          </div>
          <div className='grid grid-cols-2 gap-2 justify-between border-b border-subMain'>
            <span className="text-black">Repasse</span>
            <span className=" text-black font-semibold text-right">{moneyFormat2BR(data.amountDue)}</span>
          </div>
          <div className='grid grid-cols-2 gap-2 justify-between border-b border-subMain'>
            <span className="text-black">Imposto</span>
            <span className=" text-black font-semibold text-right">{moneyFormat2BR(data.tax)}</span>
          </div>
          <div className='grid grid-cols-2 gap-2 justify-between border-b border-subMain'>
            <span className="text-black">Saldo Clínica</span>
            <span className=" text-black font-semibold text-right">{moneyFormat2BR(data.profit)}</span>
          </div>
        </div>
        <div className="col-span-2 flex flex-col p-2 items-center gap-2" >

          {services.map((item, index) => {
            return (
              <button className="flex w-full bg-white border border-subMain rounded-lg items-center cursor-pointer"
                key={index}
                onClick={() => { toast.success('Abrir drawer com a lista de shifts') }}
              >
                <div className='grid grid-cols-5 px-4  py-2 w-full gap-2 items-center'>

                  <div className="text-sm text-black col-span-2 text-left">{item.serviceName}</div>
                  <div className="text-sm text-black text-center">{item.qty}</div>
                  <div className="flex flex-col items-center" >
                    <span className="text-sm text-black">{moneyFormat2BR(item.total)}</span>
                    <span className="text-sm text-gray-400">Produção</span>
                  </div>
                  <div className="flex flex-col items-center" >
                    <span className="text-sm text-black">{moneyFormat2BR(item.amountDue)}</span>
                    <span className="text-sm text-gray-400">Repasse</span>
                  </div>
                </div>
                <div className=" items-center p-2" >
                  <span className="text-md text-subMain"><IoIosArrowForward /></span>
                </div>
              </button>
            )
          })}
        </div>
      </div >
    </div >
  )
}

export function PaymentsServicesDisclosure({ data, subTitle, children }) {
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <>
          <DisclosureButton className={`w-full group grid grid-cols-2 items-center gap-4  p-2 border-b rounded-lg border-subMain bg-white text-subMain ${open ? 'rounded-t-lg border-b-0' : ''}`}>
            <div className='text-start leading-[2.8rem]'>
              {data.serviceName}
            </div>
            <div className='flex justify-between items-center'>
              <div className=''>
                {subTitle}
              </div>
              <BiChevronDown className="w-5 group-data-[open]:rotate-180 text-xl" />
            </div>
          </DisclosureButton>
          <div className="overflow-hidden ">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={Fragment} className={"flex p-4 rounded-b-lg border-b border-subMain bg-white"}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    {children}
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </Disclosure>
  )
}