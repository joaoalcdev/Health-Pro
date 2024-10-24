import React from 'react'

export const EventDetailPatientShimmer = ({ TitleInfo, Label, Icon }) => {
  return (
    <>
      <div className='is-loading'>
        <div className="content">
          <h2 className='pl-0 mb-[-7px] text-xs font-normal text-black text-transparent'>{TitleInfo}<span className='text-required'>{Label}</span></h2>
          <div className='flex flex-row w-full pt-4 pr-4 pb-4 justify-start text-center items-center'>
            <h5 className='flex text-2xl font-light pr-1'>
              <Icon />
            </h5>
            <h2 className='flex text-sm font-medium text-transparent'>
              asdasdasd
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}
