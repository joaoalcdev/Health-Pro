import React from 'react'

export function EventDetailsPatientDivider({ Label }) {
  return (
    <>
      <div className="flex w-full items-center rounded-full">
        <div className="flex-1 border-b border-gray-300"></div>
        <span className="text-gray-500 text-md font-medium leading-8 px-8 py-6">{Label}</span>
        <div className="flex-1 border-b border-gray-300"></div>
      </div>
    </>
  )
}