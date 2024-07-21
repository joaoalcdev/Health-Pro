import React from 'react'
import { returnPaginationRange } from './utils/appUtils'
import { HiChevronDoubleLeft, HiChevronLeft, HiChevronRight, HiChevronDoubleRight } from "react-icons/hi2";


function Pagination(props) {

  let array = returnPaginationRange(props.totalPage, props.page, props.limit, props.siblings)


  const disabledButton = `
    text-gray-300
    hover:cursor-not-allowed
   `

  const enabledButton = `
    text-black 
    hover:cursor-pointer
  `

  const buttonStylesDefault = `
    flex justify-center items-center text-center my-auto mx-auto
    text-lg size-10 rounded-full border
    bg-greyed hover:bg-greyed/35
  `

  return (
    <div className='flex flex-row justify-center items-center text-center py-3 select-none'>
      <nav>
        <ul className="pagination flex flex-row justify-center items-center text-center text-black space-x-1.5">
          <li className={`${props.page === 1 ? disabledButton : enabledButton} ${buttonStylesDefault}`}>
            <span onClick={() => props.onPageChange("&laquo;")} className=''>
              <HiChevronDoubleLeft />
            </span>
          </li>
          <li className={`${props.page === 1 ? disabledButton : enabledButton} ${buttonStylesDefault}`}>
            <span onClick={() => props.onPageChange("&lsaquo;")} className={``}>
              <HiChevronLeft />
            </span>
          </li>
          {array.map(value => {
            if (value === props.page) {
              return (
                <li key={value} className={`my-auto mx-auto hover:cursor-pointer flex flex-col justify-center items-center text-center border bg-subMain text-white active rounded-full`}>
                  <span onClick={() => props.onPageChange(value)} className='page-link flex justify-center items-center text-center text-xl size-10'>
                    {value}
                  </span>
                </li>
              )
            } else {
              return (
                <li key={value} className={`hover:bg-greyed/35 hover:cursor-pointer my-auto mx-auto flex flex-col justify-center items-center text-center bg-greyed rounded-full border`}>
                  <span onClick={() => props.onPageChange(value)} className='page-link flex justify-center items-center text-center text-xl size-10'>
                    {value}
                  </span>
                </li>
              )
            }
          })}
          <li className={`${props.page === props.totalPage ? disabledButton : enabledButton} ${buttonStylesDefault}`}>
            <span onClick={() => props.onPageChange("&rsaquo;")} className=''>
              <HiChevronRight />
            </span>
          </li>
          <li className={`${props.page === props.totalPage ? disabledButton : enabledButton} ${buttonStylesDefault}`}>
            <span onClick={() => props.onPageChange("&raquo;")} className=''>
              <HiChevronDoubleRight />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination 