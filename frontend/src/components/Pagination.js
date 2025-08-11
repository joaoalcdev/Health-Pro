import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";


export default function Pagination({ records, setRecords, recordsPerPage, currentPage, setCurrentPage }) {

  // paginate the table results
  const lastIndex = currentPage * recordsPerPage; // last index
  const firstIndex = lastIndex - recordsPerPage; // first index
  const datas = records.slice(firstIndex, lastIndex); // current records = array data 
  const npage = Math.ceil(records.length / recordsPerPage); // number of pages
  const numbers = [...Array(npage).keys()].map((i) => i + 1); // array of pages

  useEffect(() => {
    setRecords(datas)
  }, [records, currentPage])

  function prevPage() {
    setCurrentPage(currentPage - 1)
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    setCurrentPage(currentPage + 1)

  }

  return (
    <div className='flex flex-row w-full py-3 justify-center items-center text-center'>
      <nav>
        <ul className="flex flex-row justify-center items-center text-center">
          <li className="flex justify-center items-center text-center">
            <button
              className={`flex ml-1 text-xl font-bold ${currentPage === 1 ? 'text-gray-300 hover:cursor-not-allowed' : 'text-black'}`}
              onClick={prevPage}
              disabled={currentPage === 1 ? true : false}
            >
              <HiChevronLeft />
            </button>
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`flex justify-center items-center text-center bg-greyed transition-colors rounded-full h-10 w-10 mx-1 ${currentPage === n ? 'z-50 bg-subMain hover:bg-subMain/90 rounded-full text-white transition-colors' : ''}`}
            >
              <button className="select-none flex justify-center items-center py-2 px-4" onClick={() => changeCPage(n)}>
                {n}
              </button>
            </li>
          ))}
          <li className="flex justify-center items-center text-center">
            <button
              className={`flex ml-1 text-xl font-bold ${currentPage === npage ? 'text-gray-300 hover:cursor-not-allowed' : 'text-black'}`}
              onClick={nextPage}
              disabled={currentPage === npage ? true : false}
            >
              <HiChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}