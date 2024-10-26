import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { Fragment } from 'react'

export function SpecialtyDisclosure({ data, subTitle, children, hideOtherDisclosuresHandle, key }) {
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <div>
          <DisclosureButton className={`w-full group grid grid-cols-2 gap-2 justify-start p-4 border border-subMain ${open ? 'bg-subMain text-white rounded-t-lg' : 'bg-white text-subMain rounded-lg hover:bg-greyed'}`}
            id={key}
            onClick={() => hideOtherDisclosuresHandle(key)}

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