import React from 'react'

export function UsedEventPatientInfo({ TitleInfo, Icon, DataInfo, Label }) {
  return (
    <>
      <div className=''>
        <p className='pl-0 mb-[-7px] text-xs font-normal text-black'>{TitleInfo}<span className='text-required'>{Label}</span></p>
        <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
          <p className='flex text-2xl font-light pr-1'>
            <Icon />
          </p>
          <p className='flex text-sm font-medium'>
            {DataInfo}
          </p>
        </div>
      </div>
    </>
  )
}