import React from 'react'

import { Menu, Switch, Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Label, Field, ComboboxButton, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'


function UsedView({ title, subTitle, color, icon, children, component1, component2, subTitle2, component3, subTitle3, data }) {
  return (
    <div className='flex flex-col h-full w-full'>
      <Field className={`flex flex-row w-full justify-start items-center`}>
        <Label
          className={`flex justify-center items-center ${color ? 'cursor-auto select-text text-black text-md font-medium pb-1' : 'text-white font-semibold'
            } `}
        >
          {icon}{title}
        </Label>
      </Field>
      {children}
      <div className="flex w-full">
        {subTitle}
        {component1}
      </div>
      <div className="flex w-full text-blue-600">
        {subTitle2}
        {component2}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        {/* Full Name */}
        <div className=''>
          <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>
            {subTitle}
            <span className='text-required'></span></p>
          <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
            <p className='flex text-2xl font-light pr-1'>
              {icon}
            </p>
            <p className='flex text-sm font-medium'>
              aaaaaaaaaaaa
            </p>
          </div>
        </div>
        {/* RG */}
        <div className=''>
          <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>RG<span className='text-required'></span></p>
          <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
            <p className='flex text-2xl font-light pr-1'>
              {icon}
            </p>
            <p className='flex text-sm font-medium'>
              bbbbbbbbbbbbb
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsedView